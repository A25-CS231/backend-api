class ActivityController {
  constructor(activityService) {
    this.activityService = activityService;
  }

  async getActivities(req, res, next) {
    try {
      const { userId } = req.auth;
      const activities = await this.activityService.getRecentActivities(userId);

      res.json({
        status: 'success',
        data: activities,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ActivityController;
