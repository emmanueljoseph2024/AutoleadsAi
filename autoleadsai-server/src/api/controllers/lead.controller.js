import { Lead } from '../../models/index.js';
import { enqueueWorkflow } from '../../queues/index.js';

// GET /leads – paginated list with filters
export const getLeads = async (req, res, next) => {
  try {
    const { page = 1, limit = 50, status, qualification, sort = '-createdAt' } = req.query;
    const filter = { userId: req.user._id };
    if (status) filter.status = status;
    if (qualification) filter.qualification = qualification;

    const leads = await Lead.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Lead.countDocuments(filter);

    res.status(200).json({ leads, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

// GET /leads/:id
export const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, userId: req.user._id });
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.status(200).json({ lead });
  } catch (error) {
    next(error);
  }
};

// PUT /leads/:id – update lead fields
export const updateLead = async (req, res, next) => {
  try {
    const allowedUpdates = ['name', 'company', 'notes', 'status', 'qualification'];
    const updates = {};
    allowedUpdates.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updates,
      { new: true, runValidators: true }
    );
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.status(200).json({ lead });
  } catch (error) {
    next(error);
  }
};

// POST /leads/manual – manually add a lead
export const createLead = async (req, res, next) => {
  try {
    const { email, name, company, source = 'manual', sourceUrl } = req.body;
    const lead = await Lead.create({
      userId: req.user._id,
      email,
      name,
      company,
      source,
      sourceUrl,
    });
    // Trigger workflow for new lead if configured
    await enqueueWorkflow('new_lead', lead._id);

    res.status(201).json({ lead });
  } catch (error) {
    next(error);
  }
};

// DELETE /leads/:id
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.status(200).json({ message: 'Lead deleted' });
  } catch (error) {
    next(error);
  }
};