class UserService {
  constructor(userRepository, idGenerator) {
    this.userRepository = userRepository;
    this.idGenerator = idGenerator;
  }

  //   async createUser({ username, password, fullname }) {
  //     const userId = this.idGenerator.generateUserId();
  //     await this.userRepository.createUser(userId, username, password, fullname);
  //     return userId;
  //   }

  async getUserById(id) {
    return this.userRepository.getUserById(id);
  }

  async getUserRole(id) {
    return this.userRepository.getUserRole(id);
  }

  async verifyUserCredential(email, password) {
    return this.userRepository.verifyUserCredential(email, password);
  }

  async updateUserPassword(userId, newPassword) {
    return this.userRepository.updateUserPassword(userId, newPassword);
  }
}

module.exports = UserService;
