const NotFoundError = require('../errors/NotFoundError');

class LearnerRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async getLearnerFeatures(userId) {
    const result = await this.pool.query(
      `SELECT 
        last_updated_at,
        total_journeys_started as total_journey_started,
        total_journeys_completed as total_journey_completed,
        completion_rate,
        study_duration_ratio,
        avg_completion_time_per_tutorial,
        active_days_percentage,
        learning_frequency_per_week,
        avg_enrolling_times,
        total_study_days,
        revisit_rate,
        revision_rate,
        avg_submission_rating,
        quiz_retake_rate,
        avg_exam_score,
        exam_pass_rate,
        total_submissions,
        predicted_learner_type,
        prediction_confidence,
        predicted_at
      FROM learner_features
      WHERE user_id = $1`,
      [userId]
    );

    if (!result.rowCount) {
      throw new NotFoundError('Learner features tidak ditemukan.');
    }

    return result.rows[0];
  }
}

module.exports = LearnerRepository;
