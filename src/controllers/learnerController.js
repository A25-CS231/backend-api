class LearnerController {
  constructor(learnerService) {
    this.learnerService = learnerService;
  }

  async getLearnerFeatures(req, res, next) {
    try {
      const { userId } = req.auth;
      const features = await this.learnerService.getLearnerFeatures(userId);

      res.json({
        status: 'success',
        data: features,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LearnerController;
