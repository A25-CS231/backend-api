class authenticationService {
  constructor(authenticationRepository, userService, tokenManager) {
    this.authenticationRepository = authenticationRepository;
    this.userService = userService;
    this.tokenManager = tokenManager;
  }

  async createAuthentication({ email, password }) {
    const {
      userId,
      email: verifiedEmail,
      user_role,
    } = await this.userService.verifyUserCredential(email, password);

    const accessToken = this.tokenManager.generateAccessToken({
      userId,
      email: verifiedEmail,
      user_role,
    });

    return { accessToken };
  }

  async refreshAuthentication(refreshToken) {
    await this.authenticationRepository.verifyRefreshToken(refreshToken);
    const { userId } = this.tokenManager.verifyRefreshToken(refreshToken);

    const user = await this.userService.getUserById(userId);
    const user_role = await this.userService.getUserRole(userId);

    const accessToken = this.tokenManager.generateAccessToken({
      userId,
      email: user.email,
      user_role,
    });
    return accessToken;
  }

  async deleteAuthentication(refreshToken) {
    await this.authenticationRepository.verifyRefreshToken(refreshToken);
    await this.authenticationRepository.deleteRefreshToken(refreshToken);
  }

  async updateUserPassword(userId, newPassword) {
    return this.userService.updateUserPassword(userId, newPassword);
  }

  async getMe(userId) {
    return this.userService.getUserById(userId);
  }
}

module.exports = authenticationService;
