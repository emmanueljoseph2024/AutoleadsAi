import { Router } from 'express';
import {
  getLeads,
  getLeadById,
  updateLead,
  createLead,
  deleteLead,
} from '../controllers/lead.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { leadValidation } from '../middlewares/validator.middleware.js';

const leadRouter = Router();

leadRouter.use(protect);

leadRouter.get('/', getLeads);
leadRouter.post('/', leadValidation, createLead);
leadRouter.get('/:id', getLeadById);
leadRouter.put('/:id', updateLead);
leadRouter.delete('/:id', deleteLead);

export default leadRouter;