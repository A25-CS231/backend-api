class JourneyRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async getJourneys(userId) {
    const result = await this.pool.query(
      `SELECT 
        dj.id as journey_id,
        dj.name,
        CASE 
          WHEN djc.journey_id IS NOT NULL THEN true 
          ELSE false 
        END as is_finished
      FROM developer_journeys dj
      LEFT JOIN developer_journey_completions djc 
        ON dj.id = djc.journey_id AND djc.user_id = $1
      ORDER BY dj.id`,
      [userId]
    );

    return result.rows;
  }
}

module.exports = JourneyRepository;
