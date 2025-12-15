const express = require("express");
const authenticate = require("../middlewares/authenticate");
const authorizeAdmin = require("../middlewares/authorizeAdmin");

const createLearnerRoutes = (learnerController) => {
  const router = express.Router();

  // GET /learner/features/data - Get all learner features data (Admin only)
  router.get(
    "/learner/features/data",
    authenticate,
    authorizeAdmin,
    (req, res, next) => {
      learnerController.getAllLearnerFeaturesData(req, res, next);
    }
  );

  router.get("/learner/features", authenticate, (req, res, next) => {
    learnerController.getLearnerFeatures(req, res, next);
  });

  router.get(
    "/learner/features/settings",
    authenticate,
    authorizeAdmin,
    (req, res, next) => {
      learnerController.getLearnerFeaturesSettings(req, res, next);
    }
  );

  router.patch(
    "/learner/features/settings",
    authenticate,
    authorizeAdmin,
    (req, res, next) => {
      learnerController.updateLearnerFeaturesSettings(req, res, next);
    }
  );

  router.get(
    "/learner/features/narratives",
    authenticate,
    authorizeAdmin,
    (req, res, next) => {
      learnerController.getAllLearnerNarratives(req, res, next);
    }
  );

  router.post(
    "/learner/features/narratives",
    authenticate,
    authorizeAdmin,
    (req, res, next) => {
      learnerController.createLearnerNarratives(req, res, next);
    }
  );

  router.get(
    "/learner/features/narratives/:learner_type",
    authenticate,
    (req, res, next) => {
      learnerController.getAllLearnerNarrativesByLearnerType(req, res, next);
    }
  );

  router.patch(
    "/learner/features/narratives/:id",
    authenticate,
    authorizeAdmin,
    (req, res, next) => {
      learnerController.updateLearnerNarratives(req, res, next);
    }
  );

  router.delete(
    "/learner/features/narratives/:id",
    authenticate,
    authorizeAdmin,
    (req, res, next) => {
      learnerController.deleteLearnerNarratives(req, res, next);
    }
  );

  return router;
};

module.exports = createLearnerRoutes;
