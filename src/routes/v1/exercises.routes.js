const express = require('express');
const exercisesController = require('../../controllers/exercises.controller');

const router = express.Router();

router.get('/', exercisesController.getAllExercises);
router.get('/:id', exercisesController.getExerciseById);
router.post('/', exercisesController.createExercise);
router.put('/:id', exercisesController.updateExercise);
router.patch('/:id', exercisesController.updateExercise);
router.delete('/:id', exercisesController.deleteExercise);

module.exports = router;