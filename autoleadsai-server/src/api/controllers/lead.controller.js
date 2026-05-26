import { Lead } from '../../models/index.js';
import { enqueueWorkflow } from '../../queues/index.js';
import { invalidateLeadCache } from '../../services/cache/cache.service.js';

// ─── Source metadata helper ─────────────────────────

const SOURCE_META = {
  linkedin: {
    label: 'LinkedIn',
    icon: 'linkedin',
    color: '#0A66C2',
    canChat: true,
  },
  facebook: {
    label: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
    canChat: true,
  },
  reddit: {
    label: 'Reddit',
    icon: 'reddit',
    color: '#FF4500',
    canChat: true,
  },
  twitter: {
    label: 'X (Twitter)',
    icon: 'twitter',
    color: '#000000',
    canChat: true,
  },
  instagram: {
    label: 'Instagram',
    icon: 'instagram',
    color: '#E4405F',
    canChat: true,
  },
  website: {
    label: 'Website',
    icon: 'globe',
    color: '#4CAF50',
    canChat: false,
  },
  google_maps: {
    label: 'Google Maps',
    icon: 'map-pin',
    color: '#EA4335',
    canChat: false,
  },
  news: {
    label: 'News Article',
    icon: 'newspaper',
    color: '#FF9800',
    canChat: false,
  },
  manual: {
    label: 'Manual Entry',
    icon: 'user-plus',
    color: '#9E9E9E',
    canChat: false,
  },
  api: {
    label: 'API Import',
    icon: 'code',
    color: '#607D8B',
    canChat: false,
  },
  other: {
    label: 'Other',
    icon: 'ellipsis',
    color: '#9E9E9E',
    canChat: false,
  },
};

const attachSourceMeta = (lead) => {
  const meta = SOURCE_META[lead.source] || SOURCE_META.other;
  return {
    ...lead,
    sourceMeta: {
      ...meta,
      chatUrl: meta.canChat ? lead.sourceUrl : null,
    },
  };
};

// ─── GET /leads – paginated list with filters ──────

export const getLeads = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 50,
      status,
      qualification,
      source,
      search,
      sort = '-createdAt',
    } = req.query;

    const filter = { userId: req.user._id };

    if (status) filter.status = status;
    if (qualification) filter.qualification = qualification;
    if (source) filter.source = source;

    // Full‑text search across name, email, company
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    const leads = await Lead.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const total = await Lead.countDocuments(filter);

    res.status(200).json({
      leads: leads.map(attachSourceMeta),
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET /leads/:id ─────────────────────────────────

export const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).lean();

    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    res.status(200).json({ lead: attachSourceMeta(lead) });
  } catch (error) {
    next(error);
  }
};

// ─── PUT /leads/:id – update lead fields ────────────

export const updateLead = async (req, res, next) => {
  try {
    const allowedUpdates = [
      'name',
      'company',
      'notes',
      'status',
      'qualification',
      'source',
      'sourceUrl',
    ];
    const updates = {};
    allowedUpdates.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updates,
      { new: true, runValidators: true }
    ).lean();

    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    // Invalidate lead cache for this user
    await invalidateLeadCache(req.user._id);

    res.status(200).json({ lead: attachSourceMeta(lead) });
  } catch (error) {
    next(error);
  }
};

// ─── POST /leads – manually add a lead ─────────────

export const createLead = async (req, res, next) => {
  try {
    const { email, name, company, source = 'manual', sourceUrl, notes } = req.body;

    const lead = await Lead.create({
      userId: req.user._id,
      email,
      name,
      company,
      source,
      sourceUrl,
      notes,
    });

    await enqueueWorkflow('new_lead', lead._id);

    // Invalidate lead cache for this user
    await invalidateLeadCache(req.user._id);

    res.status(201).json({ lead: attachSourceMeta(lead.toObject()) });
  } catch (error) {
    next(error);
  }
};

// ─── POST /leads/bulk – bulk import ─────────────────

export const bulkCreateLeads = async (req, res, next) => {
  try {
    const { leads } = req.body;

    if (!Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ error: 'At least one lead is required' });
    }

    if (leads.length > 500) {
      return res.status(400).json({ error: 'Bulk import limited to 500 leads per request' });
    }

    const enrichedLeads = leads.map((lead) => ({
      userId: req.user._id,
      email: lead.email,
      name: lead.name || '',
      company: lead.company || '',
      source: lead.source || 'api',
      sourceUrl: lead.sourceUrl || '',
      notes: lead.notes || '',
    }));

    const created = await Lead.insertMany(enrichedLeads, { ordered: false });

    // Enqueue scoring for all new leads
    const { enqueueBatchLeadProcessing } = await import('../../queues/index.js');
    await enqueueBatchLeadProcessing(created.map((l) => l._id));

    // Invalidate lead cache for this user
    await invalidateLeadCache(req.user._id);

    res.status(201).json({
      message: `${created.length} leads imported successfully`,
      count: created.length,
    });
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /leads/:id ─────────────────────────────

export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    // Invalidate lead cache for this user
    await invalidateLeadCache(req.user._id);

    res.status(200).json({ message: 'Lead deleted' });
  } catch (error) {
    next(error);
  }
};

// ─── DELETE /leads/bulk – bulk delete ───────────────

export const bulkDeleteLeads = async (req, res, next) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'At least one lead ID is required' });
    }

    const { deletedCount } = await Lead.deleteMany({
      _id: { $in: ids },
      userId: req.user._id,
    });

    // Invalidate lead cache for this user
    await invalidateLeadCache(req.user._id);

    res.status(200).json({
      message: `${deletedCount} leads deleted`,
      count: deletedCount,
    });
  } catch (error) {
    next(error);
  }
};