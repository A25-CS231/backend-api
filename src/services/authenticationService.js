class authenticationService {
  constructor(authenticationRepository, userService, tokenManager) {
    this.authenticationRepository = authenticationRepository;
    this.userService = userService;
    this.tokenManager = tokenManager;
  }

  async createAuthentication({ email, password }) {
    const { userId, email: verifiedEmail } = await this.userService.verifyUserCredential(email, password);

    const accessToken = this.tokenManager.generateAccessToken({ 
      userId, 
      email: verifiedEmail 
    });

    return { accessToken };
  }

  async refreshAuthentication(refreshToken) {
    await this.authenticationRepository.verifyRefreshToken(refreshToken);
    const { userId } = this.tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this.tokenManager.generateAccessToken({ userId });
    return accessToken;
  }

  async deleteAuthentication(refreshToken) {
    await this.authenticationRepository.verifyRefreshToken(refreshToken);
    await this.authenticationRepository.deleteRefreshToken(refreshToken);
  }
}

module.exports = authenticationService;