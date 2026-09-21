import express from 'express';
import * as workoutsController from '../../controllers/workouts.controller.js';

const router = express.Router();

router.get('/', workoutsController.getAllWorkouts);
router.get('/:id', workoutsController.getWorkoutById);
router.post('/', workoutsController.createWorkout);
router.put('/:id', workoutsController.updateWorkout);
router.patch('/:id', workoutsController.updateWorkout);
router.delete('/:id', workoutsController.deleteWorkout);

export default router;