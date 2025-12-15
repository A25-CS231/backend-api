const bcrypt = require("bcrypt");
const NotFoundError = require("../errors/NotFoundError");
const ValidationError = require("../errors/ValidationError");
const AuthenticationError = require("../errors/AuthenticationError");

class UserRepository {
  constructor(pool) {
    this.pool = pool;
  }

  //   async createUser(id, username, password, fullname) {
  //     await this.verifyNewUsername(username);

  //     const hashedPassword = await bcrypt.hash(password, 10);

  //     await this.pool.query('INSERT INTO users VALUES ($1, $2, $3, $4)',
  //       [id, username, hashedPassword, fullname]
  //     );

  //     return id;
  //   }

  async verifyUserCredential(email, password) {
    const result = await this.pool.query(
      "SELECT id, email, password, user_role FROM users WHERE email = $1",
      [email]
    );

    if (!result.rowCount) {
      throw new AuthenticationError("Kredensial yang anda berikan salah.");
    }

    const {
      id,
      email: verifiedEmail,
      password: hashedPassword,
      user_role,
    } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError("Kredensial yang anda berikan salah.");
    }

    return { userId: id, email: verifiedEmail, user_role: user_role };
  }

  async getUserById(id) {
    const result = await this.pool.query(
      "SELECT id, display_name, name, email, user_role, image_path FROM users WHERE id = $1",
      [id]
    );

    if (!result.rowCount) {
      throw new NotFoundError("User tidak ditemukan.");
    }

    return result.rows[0];
  }

  async getUserRole(id) {
    const result = await this.pool.query(
      "SELECT user_role FROM users WHERE id = $1",
      [id]
    );

    if (!result.rowCount) {
      throw new NotFoundError("User tidak ditemukan.");
    }

    return result.rows[0].user_role;
  }

  async updateUserPassword(userId, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await this.pool.query(
      "UPDATE users SET password = $1, updated_at = current_timestamp WHERE id = $2 RETURNING id",
      [hashedPassword, userId]
    );

    if (!result.rowCount) {
      throw new NotFoundError("User tidak ditemukan.");
    }

    return result.rows[0];
  }
}

module.exports = UserRepository;
