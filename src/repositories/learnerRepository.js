const NotFoundError = require("../errors/NotFoundError");

class LearnerRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async getAllLearnerFeatures() {
    const result = await this.pool.query(
      `SELECT 
        u.id as developer_id,
        u.email as developer_email,
        lf.total_journeys_started as total_journey_started,
        lf.total_journeys_completed as total_journey_completed,
        lf.completion_rate,
        lf.study_duration_ratio,
        lf.avg_completion_time_per_tutorial,
        lf.active_days_percentage,
        lf.learning_frequency_per_week,
        lf.avg_enrolling_times,
        lf.total_study_days,
        lf.revisit_rate,
        lf.revision_rate,
        lf.avg_submission_rating,
        lf.quiz_retake_rate,
        lf.avg_exam_score,
        lf.exam_pass_rate,
        lf.total_submissions,
        lf.predicted_learner_type,
        lf.prediction_confidence,
        lf.predicted_at
      FROM learner_features lf
      JOIN users u ON lf.user_id = u.id`
    );

    return result.rows;
  }

  async getLearnerFeatures(userId) {
    const result = await this.pool.query(
      `SELECT 
        lf.total_journeys_started,
        lf.total_journeys_completed,
        lf.completion_rate,
        lf.study_duration_ratio,
        lf.avg_completion_time_per_tutorial,
        lf.active_days_percentage,
        lf.learning_frequency_per_week,
        lf.avg_enrolling_times,
        lf.total_study_days,
        lf.revisit_rate,
        lf.revision_rate,
        lf.avg_submission_rating,
        lf.quiz_retake_rate,
        lf.avg_exam_score,
        lf.exam_pass_rate,
        lf.total_submissions,
        lf.predicted_learner_type,
        lf.prediction_confidence,
        lf.predicted_at,
        slf.total_journey_started as setting_total_journey_started,
        slf.total_journey_completed as setting_total_journey_completed,
        slf.completion_rate as setting_completion_rate,
        slf.study_duration_ratio as setting_study_duration_ratio,
        slf.avg_completion_time_per_tutorial as setting_avg_completion_time_per_tutorial,
        slf.active_days_percentage as setting_active_days_percentage,
        slf.learning_frequency_per_week as setting_learning_frequency_per_week,
        slf.avg_enrolling_times as setting_avg_enrolling_times,
        slf.total_study_days as setting_total_study_days,
        slf.revisit_rate as setting_revisit_rate,
        slf.revision_rate as setting_revision_rate,
        slf.avg_submission_rating as setting_avg_submission_rating,
        slf.quiz_retake_rate as setting_quiz_retake_rate,
        slf.avg_exam_score as setting_avg_exam_score,
        slf.exam_pass_rate as setting_exam_pass_rate,
        slf.total_submissions as setting_total_submissions
      FROM learner_features lf
      CROSS JOIN setting_learner_features slf
      WHERE lf.user_id = $1`,
      [userId]
    );

    if (!result.rowCount) {
      throw new NotFoundError("Learner features tidak ditemukan.");
    }

    const rawData = result.rows[0];
    const filteredData = {
      predicted_learner_type: rawData.predicted_learner_type,
      prediction_confidence: rawData.prediction_confidence,
      predicted_at: rawData.predicted_at,
    };

    if (rawData.setting_total_journey_started) {
      filteredData.total_journey_started = rawData.total_journeys_started;
    }
    if (rawData.setting_total_journey_completed) {
      filteredData.total_journey_completed = rawData.total_journeys_completed;
    }
    if (rawData.setting_completion_rate) {
      filteredData.completion_rate = rawData.completion_rate;
    }
    if (rawData.setting_study_duration_ratio) {
      filteredData.study_duration_ratio = rawData.study_duration_ratio;
    }
    if (rawData.setting_avg_completion_time_per_tutorial) {
      filteredData.avg_completion_time_per_tutorial =
        rawData.avg_completion_time_per_tutorial;
    }
    if (rawData.setting_active_days_percentage) {
      filteredData.active_days_percentage = rawData.active_days_percentage;
    }
    if (rawData.setting_learning_frequency_per_week) {
      filteredData.learning_frequency_per_week =
        rawData.learning_frequency_per_week;
    }
    if (rawData.setting_avg_enrolling_times) {
      filteredData.avg_enrolling_times = rawData.avg_enrolling_times;
    }
    if (rawData.setting_total_study_days) {
      filteredData.total_study_days = rawData.total_study_days;
    }
    if (rawData.setting_revisit_rate) {
      filteredData.revisit_rate = rawData.revisit_rate;
    }
    if (rawData.setting_revision_rate) {
      filteredData.revision_rate = rawData.revision_rate;
    }
    if (rawData.setting_avg_submission_rating) {
      filteredData.avg_submission_rating = rawData.avg_submission_rating;
    }
    if (rawData.setting_quiz_retake_rate) {
      filteredData.quiz_retake_rate = rawData.quiz_retake_rate;
    }
    if (rawData.setting_avg_exam_score) {
      filteredData.avg_exam_score = rawData.avg_exam_score;
    }
    if (rawData.setting_exam_pass_rate) {
      filteredData.exam_pass_rate = rawData.exam_pass_rate;
    }
    if (rawData.setting_total_submissions) {
      filteredData.total_submissions = rawData.total_submissions;
    }

    return filteredData;
  }

  async getLearnerFeaturesSettings() {
    const result = await this.pool.query(
      `SELECT 
        total_journey_started,
        total_journey_completed,
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
        total_submissions
      FROM setting_learner_features
      LIMIT 1`
    );

    if (!result.rowCount) {
      throw new NotFoundError("Learner features settings tidak ditemukan.");
    }

    return result.rows[0];
  }

  async updateLearnerFeaturesSettings(settings) {
    const query = `UPDATE setting_learner_features 
      SET 
        total_journey_started = $1,
        total_journey_completed = $2,
        completion_rate = $3,
        study_duration_ratio = $4,
        avg_completion_time_per_tutorial = $5,
        active_days_percentage = $6,
        learning_frequency_per_week = $7,
        avg_enrolling_times = $8,
        total_study_days = $9,
        revisit_rate = $10,
        revision_rate = $11,
        avg_submission_rating = $12,
        quiz_retake_rate = $13,
        avg_exam_score = $14,
        exam_pass_rate = $15,
        total_submissions = $16,
        updated_at = current_timestamp
      WHERE id = 1`;

    const values = [
      settings.total_journey_started ?? true,
      settings.total_journey_completed ?? true,
      settings.completion_rate ?? true,
      settings.study_duration_ratio ?? true,
      settings.avg_completion_time_per_tutorial ?? true,
      settings.active_days_percentage ?? true,
      settings.learning_frequency_per_week ?? true,
      settings.avg_enrolling_times ?? true,
      settings.total_study_days ?? true,
      settings.revisit_rate ?? true,
      settings.revision_rate ?? true,
      settings.avg_submission_rating ?? true,
      settings.quiz_retake_rate ?? true,
      settings.avg_exam_score ?? true,
      settings.exam_pass_rate ?? true,
      settings.total_submissions ?? true,
    ];

    await this.pool.query(query, values);
  }

  async getAllLearnerNarratives() {
    const result = await this.pool.query(
      `SELECT id, learner_type, title, description
      FROM learner_narratives
      ORDER BY learner_type ASC`
    );

    return result.rows;
  }

  async createLearnerNarratives(learnerType, title, description) {
    const result = await this.pool.query(
      `INSERT INTO learner_narratives (learner_type, title, description)
      VALUES ($1, $2, $3)
      RETURNING id`,
      [learnerType, title, description]
    );

    return result.rows[0];
  }

  async getLearnerNarrativesById(id) {
    const result = await this.pool.query(
      `SELECT id, learner_type, title, description
      FROM learner_narratives
      WHERE id = $1`,
      [id]
    );

    if (!result.rowCount) {
      throw new NotFoundError("Learner naratif tidak ditemukan.");
    }

    return result.rows[0];
  }

  async getAllLearnerNarrativesByLearnerType(learnerType) {
    const result = await this.pool.query(
      `SELECT id, title, description
      FROM learner_narratives
      WHERE learner_type = $1`,
      [learnerType]
    );

    if (!result.rowCount) {
      throw new NotFoundError("Learner naratif tidak ditemukan.");
    }

    return result.rows;
  }

  async updateLearnerNarratives(id, learnerType, title, description) {
    await this.pool.query(
      `UPDATE learner_narratives
      SET learner_type = $1, title = $2, description = $3, updated_at = current_timestamp
      WHERE id = $4`,
      [learnerType, title, description, id]
    );
  }

  async deleteLearnerNarratives(id) {
    await this.pool.query(`DELETE FROM learner_narratives WHERE id = $1`, [id]);
  }
}

module.exports = LearnerRepository;
