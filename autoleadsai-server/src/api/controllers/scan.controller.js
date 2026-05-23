import { Scan, ScanJob } from '../../models/index.js';
import { enqueueScan } from '../../queues/index.js'; // queue helper to push a scan job

// POST /scans/trigger – start a new scan
export const triggerScan = async (req, res, next) => {
  try {
    const { sources } = req.body; // e.g., ['linkedin', 'website']
    // tier guard middleware already ensured user is within limits

    // Create scan record
    const scan = await Scan.create({
      userId: req.user._id,
      sources,
      status: 'pending',
    });

    // Create scan jobs for each source (or a single orchestrator job)
    for (const source of sources) {
      await ScanJob.create({
        userId: req.user._id,
        scanId: scan._id,
        source,
        status: 'queued',
      });
    }

    // Push main orchestrator job to queue
    await enqueueScan(scan._id, req.user._id);

    res.status(202).json({ message: 'Scan queued', scan });
  } catch (error) {
    next(error);
  }
};

// GET /scans – list scan history
export const getScanHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const scans = await Scan.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Scan.countDocuments({ userId: req.user._id });

    res.status(200).json({ scans, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

// GET /scans/:id – detail of a specific scan
export const getScanById = async (req, res, next) => {
  try {
    const scan = await Scan.findOne({ _id: req.params.id, userId: req.user._id });
    if (!scan) return res.status(404).json({ error: 'Scan not found' });

    // Also fetch child jobs
    const jobs = await ScanJob.find({ scanId: scan._id });
    res.status(200).json({ scan, jobs });
  } catch (error) {
    next(error);
  }
};

// POST /scans/:id/cancel – cancel a running scan
export const cancelScan = async (req, res, next) => {
  try {
    const scan = await Scan.findOne({ _id: req.params.id, userId: req.user._id });
    if (!scan) return res.status(404).json({ error: 'Scan not found' });
    if (scan.status !== 'running') {
      return res.status(400).json({ error: 'Only running scans can be cancelled' });
    }

    scan.status = 'cancelled';
    await scan.save();

    // Cancel all pending/queued jobs for this scan
    await ScanJob.updateMany({ scanId: scan._id, status: { $in: ['queued', 'processing'] } }, { status: 'cancelled' });

    res.status(200).json({ message: 'Scan cancelled' });
  } catch (error) {
    next(error);
  }
};