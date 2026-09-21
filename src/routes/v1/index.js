const express = require('express');
const usersRoutes = require('./users.routes');
const workoutsRoutes = require('./workouts.routes');

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/workouts', workoutsRoutes);

module.exports = router;