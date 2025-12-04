class JourneyController {
  constructor(journeyService) {
    this.journeyService = journeyService;
  }

  async getJourneys(req, res, next) {
    try {
      const { userId } = req.auth;
      const journeys = await this.journeyService.getJourneys(userId);

      res.json({
        status: 'success',
        data: journeys,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = JourneyController;
