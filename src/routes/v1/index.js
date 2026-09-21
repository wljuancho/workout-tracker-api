import express from 'express';
import usersRoutes from './users.routes.js';
import workoutsRoutes from './workouts.routes.js';
import exercisesRoutes from './exercises.routes.js';

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/workouts', workoutsRoutes);
router.use('/exercises', exercisesRoutes);

export default router;