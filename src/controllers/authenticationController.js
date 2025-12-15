class authenticationController {
  constructor(authenticationService) {
    this.authenticationService = authenticationService;
  }

  async postAuthentication(req, res, next) {
    try {
      const { accessToken } =
        await this.authenticationService.createAuthentication(req.body);

      res.status(200).json({
        status: "success",
        accessToken,
      });
    } catch (err) {
      next(err);
    }
  }

  async patchAuthentication(req, res, next) {
    try {
      const { userId } = req.auth;
      const { password } = req.body;

      await this.authenticationService.updateUserPassword(userId, password);

      res.json({
        status: "success",
      });
    } catch (err) {
      next(err);
    }
  }

  async putAuthentication(req, res, next) {
    try {
      const accessToken =
        await this.authenticationService.refreshAuthentication(
          req.body.refreshToken
        );

      res.json({
        status: "success",
        data: { accessToken },
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteAuthentication(req, res, next) {
    try {
      await this.authenticationService.deleteAuthentication(
        req.body.refreshToken
      );
      res.json({
        status: "success",
        message: "Refresh token berhasil dihapus",
      });
    } catch (err) {
      next(err);
    }
  }

  async getMe(req, res, next) {
    try {
      const { userId } = req.auth;
      const user = await this.authenticationService.getMe(userId);

      res.json({
        status: "success",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = authenticationController;
