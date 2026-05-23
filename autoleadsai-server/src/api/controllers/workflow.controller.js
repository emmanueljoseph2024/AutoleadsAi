import { Workflow } from '../../models/index.js';

// POST /workflows
export const createWorkflow = async (req, res, next) => {
  try {
    const { name, description, trigger, steps } = req.body;
    const workflow = await Workflow.create({
      userId: req.user._id,
      name,
      description,
      trigger,
      steps,
    });

    res.status(201).json({ workflow });
  } catch (error) {
    next(error);
  }
};

// GET /workflows
export const getWorkflows = async (req, res, next) => {
  try {
    const workflows = await Workflow.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ workflows });
  } catch (error) {
    next(error);
  }
};

// GET /workflows/:id
export const getWorkflowById = async (req, res, next) => {
  try {
    const workflow = await Workflow.findOne({ _id: req.params.id, userId: req.user._id });
    if (!workflow) return res.status(404).json({ error: 'Workflow not found' });
    res.status(200).json({ workflow });
  } catch (error) {
    next(error);
  }
};

// PUT /workflows/:id
export const updateWorkflow = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'description', 'trigger', 'steps', 'isActive'];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const workflow = await Workflow.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updates,
      { new: true, runValidators: true }
    );
    if (!workflow) return res.status(404).json({ error: 'Workflow not found' });
    res.status(200).json({ workflow });
  } catch (error) {
    next(error);
  }
};

// DELETE /workflows/:id
export const deleteWorkflow = async (req, res, next) => {
  try {
    const workflow = await Workflow.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!workflow) return res.status(404).json({ error: 'Workflow not found' });
    res.status(200).json({ message: 'Workflow deleted' });
  } catch (error) {
    next(error);
  }
};

// PATCH /workflows/:id/toggle – toggle isActive
export const toggleWorkflow = async (req, res, next) => {
  try {
    const workflow = await Workflow.findOne({ _id: req.params.id, userId: req.user._id });
    if (!workflow) return res.status(404).json({ error: 'Workflow not found' });
    workflow.isActive = !workflow.isActive;
    await workflow.save();
    res.status(200).json({ workflow });
  } catch (error) {
    next(error);
  }
};