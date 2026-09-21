const express = require('express');
const progressController = require('../../controllers/progress.controller');

const router = express.Router();

router.get('/', progressController.getAllProgress);
router.get('/:id', progressController.getProgressById);
router.post('/', progressController.createProgress);
router.put('/:id', progressController.updateProgress);
router.patch('/:id', progressController.updateProgress);
router.delete('/:id', progressController.deleteProgress);

module.exports = router;