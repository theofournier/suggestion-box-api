import passportJwt from 'passport-jwt';
import db from '../db';

const JwtStrategy = passportJwt.Strategy;
// eslint-disable-next-line prefer-destructuring
const ExtractJwt = passportJwt.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};


function passportConfig(passport) {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, res) => {
      db.query('SELECT * FROM login WHERE ID = ?', [jwtPayload.id], (err, results) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log('error ocurred', err);
        }
        // eslint-disable-next-line no-lonely-if
        if (results.length > 0) {
          return res(null, results[0]);
        }
        return res(null, false);
      });
    }),
  );
}

export default passportConfig;
