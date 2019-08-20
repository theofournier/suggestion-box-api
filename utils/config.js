// eslint-disable-next-line
import dotenvconfig from 'dotenv/config'; // I know eslint is not happy, but it's needed for dotenv.

import moment from 'moment-timezone';


// set default timezone for moment
// (so that parsed time strings will be considered in JP timezone by default)
moment.tz.setDefault('Asia/Tokyo');

const appConfig = {
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

export default appConfig;
