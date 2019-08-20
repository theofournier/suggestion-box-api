// @flow
import moment from 'moment-timezone';
import winston, { format } from 'winston';
import expressWinston from 'express-winston';
import appConfig from './config';

const logLevel = appConfig.log.level;
const isDev = process.env.NODE_ENV === 'development';
const addTimestamp = format((logObject) => {
  return {
    ...logObject,
    timestamp: moment().tz('Asia/Tokyo').locale('ja').format('YYYY-MM-DD HH:mm:ss.SSS'),
  };
});

let logFormat;
if (isDev) {
  logFormat = format.combine(
    format.colorize(),
    format.simple(),
  );
} else {
  logFormat = format.combine(
    addTimestamp(),
    format.json(),
  );
}

const consoleLogTransport = new winston.transports.Console({
  format: logFormat,
});

const winstonInstance = winston.createLogger({
  level: logLevel,
  transports: [consoleLogTransport],
  exceptionHandlers: [consoleLogTransport],
});

export const accessLogger = expressWinston.logger({
  winstonInstance,
  msg: '{{res.statusCode}} {{req.method}} {{req.url}} ({{res.responseTime}}ms)',
  meta: !isDev,
  statusLevels: false,
  level: (req, res) => {
    if (req.path === '/admin/health-check') { return 'debug'; }
    if (res.statusCode >= 400) { return 'warn'; }
    if (res.statusCode >= 500) { return 'error'; }
    return 'info';
  },
});

export const errorLogger = expressWinston.errorLogger({
  winstonInstance,
});

function log(level, ...args) {
  let loggedString = '';
  args.forEach((arg) => {
    if (typeof (arg) === 'object') {
      if (arg.stack) {
        loggedString += `${arg.stack}`;
      } else {
        loggedString += `${JSON.stringify(arg)} `;
      }
    } else {
      loggedString += `${arg} `;
    }
  });
  winstonInstance.log(level, loggedString.trimRight());
}

const logger = {
  error(...args) { return log('error', ...args); },
  warn(...args) { return log('warn', ...args); },
  info(...args) { return log('info', ...args); },
  verbose(...args) { return log('verbose', ...args); },
  debug(...args) { return log('debug', ...args); },
  silly(...args) { return log('silly', ...args); },
};

export default logger;
