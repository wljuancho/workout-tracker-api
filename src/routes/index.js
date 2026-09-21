import express from 'express';
import v1Routes from './v1/index.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Workout Tracker API',
    versions: ['v1'],
    endpoints: {
      v1: '/api/v1'
    }
  });
});

router.use('/v1', v1Routes);

export default router;