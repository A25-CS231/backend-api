const express = require('express');
const authenticate = require('../middlewares/authenticate');

const createActivityRoutes = (activityController) => {
  const router = express.Router();

  router.get('/activities', authenticate, (req, res, next) => {
    activityController.getActivities(req, res, next);
  });

  return router;
};

module.exports = createActivityRoutes;
