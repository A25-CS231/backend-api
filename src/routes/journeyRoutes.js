const express = require('express');
const authenticate = require('../middlewares/authenticate');

const createJourneyRoutes = (journeyController) => {
  const router = express.Router();

  router.get('/journeys', authenticate, (req, res, next) => {
    journeyController.getJourneys(req, res, next);
  });

  return router;
};

module.exports = createJourneyRoutes;
