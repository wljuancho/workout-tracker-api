import express from 'express';
import * as exercisesController from '../../controllers/exercises.controller.js';

const router = express.Router();

router.get('/', exercisesController.getAllExercises);
router.get('/:id', exercisesController.getExerciseById);
router.post('/', exercisesController.createExercise);
router.put('/:id', exercisesController.updateExercise);
router.patch('/:id', exercisesController.updateExercise);
router.delete('/:id', exercisesController.deleteExercise);

export default router;