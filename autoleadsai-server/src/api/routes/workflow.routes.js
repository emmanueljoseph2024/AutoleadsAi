import { Router } from 'express';
import {
  createWorkflow,
  getWorkflows,
  getWorkflowById,
  updateWorkflow,
  deleteWorkflow,
  toggleWorkflow,
} from '../controllers/workflow.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { workflowValidation } from '../middlewares/validator.middleware.js';

const workflowRouter = Router();

workflowRouter.use(protect);

workflowRouter.post('/', workflowValidation, createWorkflow);
workflowRouter.get('/', getWorkflows);
workflowRouter.get('/:id', getWorkflowById);
workflowRouter.put('/:id', updateWorkflow);
workflowRouter.delete('/:id', deleteWorkflow);
workflowRouter.patch('/:id/toggle', toggleWorkflow);

export default workflowRouter;