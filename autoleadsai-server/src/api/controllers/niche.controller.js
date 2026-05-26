import Niche from '../../models/Niche.model.js';
import { invalidateDashboardCache } from '../../services/cache/cache.service.js';

// POST /niches
export const createNiche = async (req, res, next) => {
  try {
    const { name, keywords, location, sources } = req.body;
    const niche = await Niche.create({
      userId: req.user._id,
      name,
      keywords,
      location,
      sources,
    });

    // Invalidate dashboard cache for this user
    await invalidateDashboardCache(req.user._id);

    res.status(201).json({ niche });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'A niche with this name already exists' });
    }
    next(error);
  }
};

// GET /niches
export const getNiches = async (req, res, next) => {
  try {
    const niches = await Niche.find({ userId: req.user._id, isActive: true })
      .sort({ updatedAt: -1 })
      .select('name keywords location sources totalScans totalLeads lastScanAt createdAt');
    res.status(200).json({ niches });
  } catch (error) {
    next(error);
  }
};

// GET /niches/:id
export const getNicheById = async (req, res, next) => {
  try {
    const niche = await Niche.findOne({ _id: req.params.id, userId: req.user._id });
    if (!niche) return res.status(404).json({ error: 'Niche not found' });
    res.status(200).json({ niche });
  } catch (error) {
    next(error);
  }
};

// PUT /niches/:id
export const updateNiche = async (req, res, next) => {
  try {
    const { name, keywords, location, sources, isActive } = req.body;
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (keywords !== undefined) updates.keywords = keywords;
    if (location !== undefined) updates.location = location;
    if (sources !== undefined) updates.sources = sources;
    if (isActive !== undefined) updates.isActive = isActive;

    const niche = await Niche.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updates,
      { new: true, runValidators: true }
    );
    if (!niche) return res.status(404).json({ error: 'Niche not found' });

    // Invalidate dashboard cache for this user
    await invalidateDashboardCache(req.user._id);

    res.status(200).json({ niche });
  } catch (error) {
    next(error);
  }
};

// DELETE /niches/:id
export const deleteNiche = async (req, res, next) => {
  try {
    const niche = await Niche.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!niche) return res.status(404).json({ error: 'Niche not found' });

    // Invalidate dashboard cache for this user
    await invalidateDashboardCache(req.user._id);

    res.status(200).json({ message: 'Niche deleted' });
  } catch (error) {
    next(error);
  }
};