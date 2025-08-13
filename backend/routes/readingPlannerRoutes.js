const express = require('express');
const router = express.Router();
const readingPlannerController = require('../controllers/readingPlannerController');
const verifyToken = require('../middlewares/verifyToken');

// All routes require authentication
router.use(verifyToken);

// Add a new reading plan
router.post('/', readingPlannerController.addReadingPlan);
// Get all reading plans
router.get('/', readingPlannerController.getReadingPlans);
// Update progress
router.patch('/:planId/progress', readingPlannerController.updateProgress);
// Delete a reading plan
router.delete('/:planId', readingPlannerController.deleteReadingPlan);

module.exports = router;
