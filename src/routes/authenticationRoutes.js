const express = require("express");
const AuthenticationValidator = require("../validators/authenticationValidator");
const authenticate = require("../middlewares/authenticate");
const authorizeAdmin = require("../middlewares/authorizeAdmin");

const createAuthenticationRoutes = (authenticationController) => {
  const router = express.Router();

  router.post("/auths", (req, res, next) => {
    try {
      AuthenticationValidator.validatePostPayload(req.body);
      authenticationController.postAuthentication(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  router.patch("/auths", authenticate, authorizeAdmin, (req, res, next) => {
    try {
      authenticationController.patchAuthentication(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  router.put("/auths", (req, res, next) => {
    try {
      AuthenticationValidator.validatePutPayload(req.body);
      authenticationController.putAuthentication(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/auths", (req, res, next) => {
    try {
      AuthenticationValidator.validateDeletePayload(req.body);
      authenticationController.deleteAuthentication(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  router.get("/me", authenticate, (req, res, next) => {
    try {
      authenticationController.getMe(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = createAuthenticationRoutes;
