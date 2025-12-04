const bcrypt = require('bcrypt');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const AuthenticationError = require('../errors/AuthenticationError');

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
    const result = await this.pool.query('SELECT id, email, password FROM users WHERE email = $1',
      [email]
    );

    if (!result.rowCount) {
      throw new AuthenticationError('Kredensial yang anda berikan salah.');
    }

    const { id, email: verifiedEmail, password: hashedPassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang anda berikan salah.');
    }

    return { userId: id, email: verifiedEmail };
  }

  async getUserById(id) {
    const result = await this.pool.query('SELECT id, username, fullname FROM users WHERE id = $1',
      [id]
    );

    if (!result.rowCount) {
      throw new NotFoundError('User tidak ditemukan.');
    }

    return result.rows[0];
  }
}

module.exports = UserRepository;