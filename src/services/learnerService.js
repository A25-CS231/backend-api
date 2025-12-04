class LearnerService {
  constructor(learnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async getLearnerFeatures(userId) {
    return this.learnerRepository.getLearnerFeatures(userId);
  }
}

module.exports = LearnerService;
