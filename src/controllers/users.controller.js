const { randomUUID } = require('node:crypto');

const users = [
  {
    id: 'b42f53fa-7b30-4b91-8d36-dc1c6ef27611',
    name: 'Carlos Navia',
    email: 'carlos@example.com',
    role: 'user',
    createdAt: '2025-09-12T12:00:00Z'
  }
];

function getAllUsers(req, res) {
  const { role, search } = req.query;
  const normalizedSearch = typeof search === 'string' ? search.trim().toLowerCase() : '';
  const filteredUsers = users.filter((user) => {
    const matchesRole = !role || user.role === role;
    const matchesSearch = !normalizedSearch || user.name.toLowerCase().includes(normalizedSearch);
    return matchesRole && matchesSearch;
  });

  res.set('X-Resource-Count', String(filteredUsers.length));
  return res.status(200).json(filteredUsers);
}

function getUserById(req, res) {
  const { id } = req.params;
  const user = users.find((currentUser) => currentUser.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  return res.status(200).json(user);
}

function createUser(req, res) {
  const { name, email, role = 'user' } = req.body || {};

  if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Formato de email invalido' });
  }

  const newUser = {
    id: randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  return res.status(201).json(newUser);
}

function replaceUser(req, res) {
  const index = users.findIndex((user) => user.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const { name, email, role } = req.body || {};
  if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Formato de email invalido' });
  }

  users[index] = {
    ...users[index],
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: role || 'user'
  };

  return res.status(200).json(users[index]);
}

function updateUser(req, res) {
  const index = users.findIndex((user) => user.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const { name, email, role } = req.body || {};
  if (name === undefined && email === undefined && role === undefined) {
    return res.status(400).json({ error: 'Debe proporcionar al menos un campo valido' });
  }

  if (email !== undefined && (typeof email !== 'string' || !isValidEmail(email))) {
    return res.status(400).json({ error: 'Formato de email invalido' });
  }

  users[index] = {
    ...users[index],
    ...(name !== undefined ? { name: String(name).trim() } : {}),
    ...(email !== undefined ? { email: email.trim().toLowerCase() } : {}),
    ...(role !== undefined ? { role } : {})
  };

  return res.status(200).json(users[index]);
}

function deleteUser(req, res) {
  const index = users.findIndex((user) => user.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  users.splice(index, 1);
  return res.status(204).send();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  replaceUser,
  updateUser,
  deleteUser
};