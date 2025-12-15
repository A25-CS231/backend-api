/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable("learner_features", {
    id: { type: "serial", primaryKey: true },
    user_id: {
      type: "integer",
      notNull: true,
      unique: true,
      references: "users",
      onDelete: "CASCADE",
    },

    // ===== METADATA =====
    last_updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    total_journeys_started: { type: "integer", notNull: true, default: 0 },
    total_journeys_completed: { type: "integer", notNull: true, default: 0 },

    // ===== KATEGORI 1: KECEPATAN BELAJAR (4 fitur) =====
    completion_rate: {
      type: "decimal(5,4)",
      notNull: false,
      comment: "Persentase journey diselesaikan (0-1)",
    },
    study_duration_ratio: {
      type: "decimal(5,2)",
      notNull: false,
      comment: "Rasio waktu belajar aktual vs estimasi",
    },
    avg_completion_time_per_tutorial: {
      type: "decimal(10,2)",
      notNull: false,
      comment: "Rata-rata jam untuk menyelesaikan 1 tutorial",
    },
    active_days_percentage: {
      type: "decimal(5,4)",
      notNull: false,
      comment: "Persentase hari aktif dari total periode (0-1)",
    },

    // ===== KATEGORI 2: KONSISTENSI (3 fitur) =====
    learning_frequency_per_week: {
      type: "decimal(5,2)",
      notNull: false,
      comment: "Rata-rata hari belajar per minggu",
    },
    avg_enrolling_times: {
      type: "decimal(5,2)",
      notNull: false,
      comment: "Rata-rata berapa kali mengulang journey yang sama",
    },
    total_study_days: {
      type: "integer",
      notNull: false,
      comment: "Total hari unik belajar",
    },

    // ===== KATEGORI 3: REVIEW & PERFEKSIONISME (4 fitur) =====
    revisit_rate: {
      type: "decimal(5,4)",
      notNull: false,
      comment: "Persentase tutorial yang dibuka lagi setelah selesai (0-1)",
    },
    revision_rate: {
      type: "decimal(5,4)",
      notNull: false,
      comment: "Persentase submission yang direvisi >1x (0-1)",
    },
    avg_submission_rating: {
      type: "decimal(3,2)",
      notNull: false,
      comment: "Rata-rata rating submission (1-5)",
    },
    quiz_retake_rate: {
      type: "decimal(5,4)",
      notNull: false,
      comment: "Persentase kuis yang diulang (0-1+)",
    },

    // ===== KATEGORI 4: PERFORMA (3 fitur) =====
    avg_exam_score: {
      type: "decimal(5,2)",
      notNull: false,
      comment: "Rata-rata skor ujian (0-100)",
    },
    exam_pass_rate: {
      type: "decimal(5,4)",
      notNull: false,
      comment: "Persentase ujian yang lulus (0-1)",
    },
    total_submissions: {
      type: "integer",
      notNull: false,
      comment: "Total submission yang pernah dikumpulkan",
    },

    // ===== ML PREDICTION =====
    predicted_learner_type: {
      type: "varchar(20)",
      notNull: false,
    },
    prediction_confidence: {
      type: "decimal(5,4)",
      notNull: false,
      comment: "Confidence score (0-1)",
    },
    predicted_at: { type: "timestamp", notNull: false },

    // ===== QUALITY METRICS =====
    computation_duration_ms: { type: "integer", notNull: false },
    features_filled_count: {
      type: "integer",
      notNull: false,
      comment: "Berapa fitur yang terisi (dari 14)",
    },
    has_sufficient_data: { type: "boolean", notNull: false, default: false },
  });

  // Indexes for learner_features table
  pgm.createIndex("learner_features", "user_id");
  pgm.createIndex("learner_features", "predicted_learner_type");
  pgm.createIndex("learner_features", "has_sufficient_data");
  pgm.createIndex("learner_features", "last_updated_at");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable("learner_features");
};
