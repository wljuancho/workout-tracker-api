import { randomUUID } from 'node:crypto';

const progressRecords = [
  {
    id: 'progress-001',
    userId: 'b42f53fa-7b30-4b91-8d36-dc1c6ef27611',
    workoutId: 'workout-001',
    date: '2026-09-20',
    weight: 70,
    repetitions: 10,
    notes: 'Sesión completada'
  }
];

function getAllProgress(req, res) {
  const { userId, workoutId } = req.query;
  const result = progressRecords.filter((record) => (
    (!userId || record.userId === userId)
    && (!workoutId || record.workoutId === workoutId)
  ));

  return res.status(200).json(result);
}

function getProgressById(req, res) {
  const record = progressRecords.find((currentRecord) => currentRecord.id === req.params.id);
  if (!record) {
    return res.status(404).json({ error: 'Registro de progreso no encontrado' });
  }

  return res.status(200).json(record);
}

function createProgress(req, res) {
  const { userId, workoutId, date, weight, repetitions, notes = '' } = req.body || {};
  if (!userId || !workoutId || !date || typeof weight !== 'number' || typeof repetitions !== 'number') {
    return res.status(400).json({ error: 'userId, workoutId, date, weight y repetitions son requeridos' });
  }

  const record = {
    id: randomUUID(),
    userId,
    workoutId,
    date,
    weight,
    repetitions,
    notes
  };

  progressRecords.push(record);
  return res.status(201).json(record);
}

function updateProgress(req, res) {
  const index = progressRecords.findIndex((record) => record.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Registro de progreso no encontrado' });
  }

  const allowedFields = ['date', 'weight', 'repetitions', 'notes'];
  const changes = Object.fromEntries(
    Object.entries(req.body || {}).filter(([key]) => allowedFields.includes(key))
  );
  if (Object.keys(changes).length === 0) {
    return res.status(400).json({ error: 'No se proporcionaron campos validos' });
  }

  progressRecords[index] = { ...progressRecords[index], ...changes };
  return res.status(200).json(progressRecords[index]);
}

function deleteProgress(req, res) {
  const index = progressRecords.findIndex((record) => record.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Registro de progreso no encontrado' });
  }

  progressRecords.splice(index, 1);
  return res.status(204).send();
}

export {
  getAllProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress
};