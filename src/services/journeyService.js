class JourneyService {
  constructor(journeyRepository) {
    this.journeyRepository = journeyRepository;
  }

  async getJourneys(userId) {
    return this.journeyRepository.getJourneys(userId);
  }
}

module.exports = JourneyService;
