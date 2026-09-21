const { randomUUID } = require('node:crypto');

const workouts = [
  {
    id: 'workout-001',
    userId: 'b42f53fa-7b30-4b91-8d36-dc1c6ef27611',
    name: 'Rutina de fuerza',
    status: 'active',
    scheduledAt: '2026-09-21T07:00:00.000Z',
    exercises: [],
    createdAt: '2026-09-12T12:00:00.000Z'
  }
];

function getAllWorkouts(req, res) {
  const { status, limit = '10' } = req.query;
  const parsedLimit = Number.parseInt(limit, 10);

  if (!Number.isInteger(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
    return res.status(400).json({ error: 'limit debe estar entre 1 y 100' });
  }

  const result = workouts
    .filter((workout) => !status || workout.status === status)
    .sort((first, second) => new Date(first.scheduledAt) - new Date(second.scheduledAt))
    .slice(0, parsedLimit);

  res.set('X-Resource-Count', String(result.length));
  return res.status(200).json(result);
}

function getWorkoutById(req, res) {
  const workout = workouts.find((currentWorkout) => currentWorkout.id === req.params.id);
  if (!workout) {
    return res.status(404).json({ error: 'Entrenamiento no encontrado' });
  }

  return res.status(200).json(workout);
}

function createWorkout(req, res) {
  const { userId, name, status = 'active', scheduledAt, exercises = [] } = req.body || {};
  if (!userId || typeof name !== 'string' || !name.trim() || !scheduledAt || !Array.isArray(exercises)) {
    return res.status(400).json({ error: 'userId, name, scheduledAt y exercises son requeridos' });
  }

  const workout = {
    id: randomUUID(),
    userId,
    name: name.trim(),
    status,
    scheduledAt,
    exercises,
    createdAt: new Date().toISOString()
  };

  workouts.push(workout);
  return res.status(201).json(workout);
}

function updateWorkout(req, res) {
  const index = workouts.findIndex((workout) => workout.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Entrenamiento no encontrado' });
  }

  const { name, status, scheduledAt, exercises } = req.body || {};
  if (name === undefined && status === undefined && scheduledAt === undefined && exercises === undefined) {
    return res.status(400).json({ error: 'Debe proporcionar al menos un campo valido' });
  }

  workouts[index] = {
    ...workouts[index],
    ...(name !== undefined ? { name: String(name).trim() } : {}),
    ...(status !== undefined ? { status } : {}),
    ...(scheduledAt !== undefined ? { scheduledAt } : {}),
    ...(exercises !== undefined ? { exercises } : {})
  };

  return res.status(200).json(workouts[index]);
}

function deleteWorkout(req, res) {
  const index = workouts.findIndex((workout) => workout.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Entrenamiento no encontrado' });
  }

  workouts.splice(index, 1);
  return res.status(204).send();
}

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
};