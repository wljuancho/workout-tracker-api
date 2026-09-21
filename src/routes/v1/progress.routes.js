import express from 'express';
import * as progressController from '../../controllers/progress.controller.js';

const router = express.Router();

router.get('/', progressController.getAllProgress);
router.get('/:id', progressController.getProgressById);
router.post('/', progressController.createProgress);
router.put('/:id', progressController.updateProgress);
router.patch('/:id', progressController.updateProgress);
router.delete('/:id', progressController.deleteProgress);

export default router;