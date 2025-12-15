/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("authentications", {
    token: {
      type: "text",
      notNull: true,
      unique: true,
    },
  });

  // 1. Table: setting_learner_features
  // Stores visibility settings for each learner feature field
  pgm.createTable("setting_learner_features", {
    id: { type: "serial", primaryKey: true },
    total_journey_started: { type: "boolean", notNull: true, default: true },
    total_journey_completed: { type: "boolean", notNull: true, default: true },
    completion_rate: { type: "boolean", notNull: true, default: true },
    study_duration_ratio: { type: "boolean", notNull: true, default: true },
    avg_completion_time_per_tutorial: {
      type: "boolean",
      notNull: true,
      default: true,
    },
    active_days_percentage: { type: "boolean", notNull: true, default: true },
    learning_frequency_per_week: {
      type: "boolean",
      notNull: true,
      default: true,
    },
    avg_enrolling_times: { type: "boolean", notNull: true, default: true },
    total_study_days: { type: "boolean", notNull: true, default: true },
    revisit_rate: { type: "boolean", notNull: true, default: true },
    revision_rate: { type: "boolean", notNull: true, default: true },
    avg_submission_rating: { type: "boolean", notNull: true, default: true },
    quiz_retake_rate: { type: "boolean", notNull: true, default: true },
    avg_exam_score: { type: "boolean", notNull: true, default: true },
    exam_pass_rate: { type: "boolean", notNull: true, default: true },
    total_submissions: { type: "boolean", notNull: true, default: true },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  // Insert default row with all settings set to true
  pgm.sql(`
    INSERT INTO setting_learner_features (
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
    ) VALUES (
      true, true, true, true, true, true, true, true, 
      true, true, true, true, true, true, true, true
    );
  `);

  // 2. Table: learner_narratives
  // Stores narratives for learner types (fast, consistent, reflective)
  pgm.createTable("learner_narratives", {
    id: { type: "serial", primaryKey: true },
    learner_type: { type: "varchar(20)", notNull: true }, // 1: fast, 2: consistent, 3: reflective
    title: { type: "varchar(255)", notNull: true },
    description: { type: "text", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  // Create indexes
  pgm.createIndex("learner_narratives", "learner_type");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("authentications");
  pgm.dropTable("learner_narratives");
  pgm.dropTable("setting_learner_features");
};
