class ActivityService {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async getRecentActivities(developerId) {
    return this.activityRepository.getRecentActivities(developerId);
  }
}

module.exports = ActivityService;
