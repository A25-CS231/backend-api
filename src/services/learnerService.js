class LearnerService {
  constructor(learnerRepository) {
    this.learnerRepository = learnerRepository;
  }

  async getAllLearnerFeatures() {
    return this.learnerRepository.getAllLearnerFeatures();
  }

  async getLearnerFeatures(userId) {
    return this.learnerRepository.getLearnerFeatures(userId);
  }

  async getLearnerFeaturesSettings() {
    return this.learnerRepository.getLearnerFeaturesSettings();
  }

  async updateLearnerFeaturesSettings(settings) {
    return this.learnerRepository.updateLearnerFeaturesSettings(settings);
  }

  async getAllLearnerNarratives() {
    return this.learnerRepository.getAllLearnerNarratives();
  }

  async createLearnerNarratives(learnerType, title, description) {
    return this.learnerRepository.createLearnerNarratives(
      learnerType,
      title,
      description
    );
  }

  async getLearnerNarrativesById(id) {
    return this.learnerRepository.getLearnerNarrativesById(id);
  }

  async getAllLearnerNarrativesByLearnerType(learnerType) {
    return this.learnerRepository.getAllLearnerNarrativesByLearnerType(
      learnerType
    );
  }

  async updateLearnerNarratives(id, learnerType, title, description) {
    return this.learnerRepository.updateLearnerNarratives(
      id,
      learnerType,
      title,
      description
    );
  }

  async deleteLearnerNarratives(id) {
    return this.learnerRepository.deleteLearnerNarratives(id);
  }
}

module.exports = LearnerService;
