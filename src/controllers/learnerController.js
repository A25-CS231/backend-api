class LearnerController {
  constructor(learnerService) {
    this.learnerService = learnerService;
  }

  async getAllLearnerFeaturesData(req, res, next) {
    try {
      const data = await this.learnerService.getAllLearnerFeatures();

      res.json({
        status: "success",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async getLearnerFeatures(req, res, next) {
    try {
      const { userId } = req.auth;
      const features = await this.learnerService.getLearnerFeatures(userId);

      res.json({
        status: "success",
        data: features,
      });
    } catch (err) {
      next(err);
    }
  }

  async getLearnerFeaturesSettings(req, res, next) {
    try {
      const settings = await this.learnerService.getLearnerFeaturesSettings();

      res.json({
        status: "success",
        data: settings,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateLearnerFeaturesSettings(req, res, next) {
    try {
      await this.learnerService.updateLearnerFeaturesSettings(req.body);

      res.json({
        status: "success",
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllLearnerNarratives(req, res, next) {
    try {
      const data = await this.learnerService.getAllLearnerNarratives();

      res.json({
        status: "success",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllLearnerNarrativesByLearnerType(req, res, next) {
    try {
      const { learner_type } = req.params;
      const data = await this.learnerService.getAllLearnerNarrativesByLearnerType(learner_type);

      res.json({
        status: "success",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  async createLearnerNarratives(req, res, next) {
    try {
      const { learner_type, title, description } = req.body;
      await this.learnerService.createLearnerNarratives(
        learner_type,
        title,
        description
      );

      res.status(201).json({
        status: "success",
      });
    } catch (err) {
      next(err);
    }
  }

  async updateLearnerNarratives(req, res, next) {
    try {
      const { id } = req.params;
      const { learner_type, title, description } = req.body;
      await this.learnerService.updateLearnerNarratives(
        id,
        learner_type,
        title,
        description
      );

      res.json({
        status: "success",
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteLearnerNarratives(req, res, next) {
    try {
      const { id } = req.params;
      await this.learnerService.deleteLearnerNarratives(id);

      res.json({
        status: "success",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LearnerController;
