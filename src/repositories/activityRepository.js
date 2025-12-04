class ActivityRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async getRecentActivities(developerId) {
    const result = await this.pool.query(
      `SELECT 
        djt.journey_id,
        dj.name,
        djt.last_viewed
      FROM developer_journey_trackings djt
      JOIN developer_journeys dj ON djt.journey_id = dj.id
      WHERE djt.developer_id = $1
      ORDER BY djt.last_viewed DESC`,
      [developerId]
    );

    return result.rows;
  }
}

module.exports = ActivityRepository;
