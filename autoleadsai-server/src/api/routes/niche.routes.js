import { Router } from 'express';
import {
  createNiche,
  getNiches,
  getNicheById,
  updateNiche,
  deleteNiche,
} from '../controllers/niche.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const nicheRouter = Router();

nicheRouter.use(protect);

nicheRouter.post('/', createNiche);
nicheRouter.get('/', getNiches);
nicheRouter.get('/:id', getNicheById);
nicheRouter.put('/:id', updateNiche);
nicheRouter.delete('/:id', deleteNiche);

export default nicheRouter;