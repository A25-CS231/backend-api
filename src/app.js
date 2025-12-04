require('dotenv').config();
const express = require('express');

// Utils
const pool = require('./utils/database');
const tokenManager = require('./utils/tokenManager');
const idGenerator = require('./utils/idGenerator');

// Repositories
const UserRepository = require('./repositories/userRepository');
const AuthenticationRepository = require('./repositories/authenticationRepository');

// Services
const UserService = require('./services/userService');
const AuthenticationService = require('./services/authenticationService');

// Controllers
// const UserController = require('./controllers/userController');
const AuthenticationController = require('./controllers/authenticationController');

// Routes
// const createUserRoutes = require('./routes/userRoutes');
const createAuthenticationRoutes = require('./routes/authenticationRoutes');

// Middlewares
const errorHandler = require('./middlewares/errorHandler');

// Repository
const userRepository = new UserRepository(pool);
const authenticationRepository = new AuthenticationRepository(pool);

// Service
const userService = new UserService(userRepository, idGenerator);
const authenticationService = new AuthenticationService(
  authenticationRepository,
  userService,
  tokenManager
);

// Controller
// const userController = new UserController(userService);
const authenticationController = new AuthenticationController(authenticationService);

const app = express();
app.use(express.json());

// Routes
// app.use(createUserRoutes(userController));
app.use(createAuthenticationRoutes(authenticationController));

app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Resource tidak ditemukan',
  });
});

app.use(errorHandler);

module.exports = app;