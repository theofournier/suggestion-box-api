import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import passport from 'passport';
import logger, { accessLogger, errorLogger } from './utils/logger';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import loginRouter from './routes/login';
import registerRouter from './routes/register';
import suggestionRouter from './routes/suggestions';
import historyRouter from './routes/history';
import passportConfig from './utils/auth/passport';

const swaggerDocument = yaml.load('./swagger.yaml');
const app = express();


// Passport middleware
app.use(passport.initialize());

// Passport Config
passportConfig(passport);

// request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(cookieParser());

// log all requests received by server
app.use(accessLogger);

// routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/suggestion', suggestionRouter);
app.use('/history', historyRouter);

app.get('/lifecheck', (req, res) => {
  res.status(200);
  res.send('OK');
});

// unhandled error logging
app.use(errorLogger);

// unhandled error handling
app.use((err, req, res, next) => {
  // cf. https://expressjs.com/en/guide/error-handling.html
  if (res.headersSent) {
    return next(err);
  }

  logger.error('uncaught exception', err);

  res.status(500);
  return res.send({});
});

module.exports = app;
