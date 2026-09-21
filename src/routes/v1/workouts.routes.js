const express = require('express');
const workoutsController = require('../../controllers/workouts.controller');

const router = express.Router();

router.get('/', workoutsController.getAllWorkouts);
router.get('/:id', workoutsController.getWorkoutById);
router.post('/', workoutsController.createWorkout);
router.put('/:id', workoutsController.updateWorkout);
router.patch('/:id', workoutsController.updateWorkout);
router.delete('/:id', workoutsController.deleteWorkout);

module.exports = router;