const express = require('express');
const authenticate = require('../middlewares/authenticate');

const createLearnerRoutes = (learnerController) => {
  const router = express.Router();

  router.get('/learner/features', authenticate, (req, res, next) => {
    learnerController.getLearnerFeatures(req, res, next);
  });

  return router;
};

module.exports = createLearnerRoutes;
