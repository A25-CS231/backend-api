require('dotenv').config();
const express = require('express');

// Utils
const pool = require('./utils/database');
const tokenManager = require('./utils/tokenManager');
const idGenerator = require('./utils/idGenerator');

// Repositories
const UserRepository = require('./repositories/userRepository');
const AuthenticationRepository = require('./repositories/authenticationRepository');
const ActivityRepository = require('./repositories/activityRepository');
const JourneyRepository = require('./repositories/journeyRepository');
const LearnerRepository = require('./repositories/learnerRepository');

// Services
const UserService = require('./services/userService');
const AuthenticationService = require('./services/authenticationService');
const ActivityService = require('./services/activityService');
const JourneyService = require('./services/journeyService');
const LearnerService = require('./services/learnerService');

// Controllers
// const UserController = require('./controllers/userController');
const AuthenticationController = require('./controllers/authenticationController');
const ActivityController = require('./controllers/activityController');
const JourneyController = require('./controllers/journeyController');
const LearnerController = require('./controllers/learnerController');

// Routes
// const createUserRoutes = require('./routes/userRoutes');
const createAuthenticationRoutes = require('./routes/authenticationRoutes');
const createActivityRoutes = require('./routes/activityRoutes');
const createJourneyRoutes = require('./routes/journeyRoutes');
const createLearnerRoutes = require('./routes/learnerRoutes');

// Middlewares
const errorHandler = require('./middlewares/errorHandler');

// Repository
const userRepository = new UserRepository(pool);
const authenticationRepository = new AuthenticationRepository(pool);
const activityRepository = new ActivityRepository(pool);
const journeyRepository = new JourneyRepository(pool);
const learnerRepository = new LearnerRepository(pool);

// Service
const userService = new UserService(userRepository, idGenerator);
const authenticationService = new AuthenticationService(
  authenticationRepository,
  userService,
  tokenManager
);
const activityService = new ActivityService(activityRepository);
const journeyService = new JourneyService(journeyRepository);
const learnerService = new LearnerService(learnerRepository);

// Controller
// const userController = new UserController(userService);
const authenticationController = new AuthenticationController(authenticationService);
const activityController = new ActivityController(activityService);
const journeyController = new JourneyController(journeyService);
const learnerController = new LearnerController(learnerService);

const app = express();
app.use(express.json());

// Routes
// app.use(createUserRoutes(userController));
app.use(createAuthenticationRoutes(authenticationController));
app.use(createActivityRoutes(activityController));
app.use(createJourneyRoutes(journeyController));
app.use(createLearnerRoutes(learnerController));

app.use((req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Resource tidak ditemukan',
  });
});

app.use(errorHandler);

module.exports = app;