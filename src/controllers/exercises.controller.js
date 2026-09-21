const { randomUUID } = require('node:crypto');

const exercises = [
  {
    id: 'exercise-001',
    name: 'Press de banca',
    description: 'Ejercicio de fuerza para el tren superior.',
    category: 'fuerza',
    muscleGroup: 'pecho'
  },
  {
    id: 'exercise-002',
    name: 'Correr',
    description: 'Actividad cardiovascular de resistencia.',
    category: 'cardio',
    muscleGroup: 'piernas'
  }
];

function getAllExercises(req, res) {
  const { category, muscleGroup } = req.query;
  const result = exercises.filter((exercise) => (
    (!category || exercise.category === category)
    && (!muscleGroup || exercise.muscleGroup === muscleGroup)
  ));

  return res.status(200).json(result);
}

function getExerciseById(req, res) {
  const exercise = exercises.find((currentExercise) => currentExercise.id === req.params.id);
  if (!exercise) {
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }

  return res.status(200).json(exercise);
}

function createExercise(req, res) {
  const { name, description, category, muscleGroup } = req.body || {};
  if (![name, description, category, muscleGroup].every((value) => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'name, description, category y muscleGroup son requeridos' });
  }

  const exercise = {
    id: randomUUID(),
    name: name.trim(),
    description: description.trim(),
    category: category.trim().toLowerCase(),
    muscleGroup: muscleGroup.trim().toLowerCase()
  };

  exercises.push(exercise);
  return res.status(201).json(exercise);
}

function updateExercise(req, res) {
  const index = exercises.findIndex((exercise) => exercise.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }

  const allowedFields = ['name', 'description', 'category', 'muscleGroup'];
  const changes = Object.fromEntries(
    Object.entries(req.body || {}).filter(([key]) => allowedFields.includes(key))
  );
  if (Object.keys(changes).length === 0) {
    return res.status(400).json({ error: 'No se proporcionaron campos validos' });
  }

  exercises[index] = { ...exercises[index], ...changes };
  return res.status(200).json(exercises[index]);
}

function deleteExercise(req, res) {
  const index = exercises.findIndex((exercise) => exercise.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }

  exercises.splice(index, 1);
  return res.status(204).send();
}

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
};