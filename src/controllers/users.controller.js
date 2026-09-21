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
  res.status(200).json(users);
}

function getUserById(req, res) {
  const { id } = req.params;
  const user = users.find((currentUser) => currentUser.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  return res.status(200).json(user);
}

module.exports = {
  getAllUsers,
  getUserById
};