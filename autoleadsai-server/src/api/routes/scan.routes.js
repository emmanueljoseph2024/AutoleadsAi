import { Router } from 'express';
import {
  triggerScan,
  getScanHistory,
  getScanById,
  cancelScan,
} from '../controllers/scan.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { tierGuard } from '../middlewares/tierGuard.middleware.js';
import { scanValidation } from '../middlewares/validator.middleware.js';

const scanRouter = Router();

scanRouter.use(protect);

scanRouter.post('/trigger', tierGuard('scansPerMonth'), scanValidation, triggerScan);
scanRouter.get('/', getScanHistory);
scanRouter.get('/:id', getScanById);
scanRouter.post('/:id/cancel', cancelScan);

export default scanRouter;