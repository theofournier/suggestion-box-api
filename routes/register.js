import express from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import validateLoginInput from '../utils/validation/login';
import db from '../utils/db';

const router = express.Router();


router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  if (req.headers.authorization !== process.env.REGISTER_KEY) {
    return res.status(401).send('Unauthorized');
  }

  db.query('SELECT * FROM login WHERE login = ?', [req.body.login], (err, results) => {
    if (err) {
      return res.status(400).send('An error occured');
    }
    if (results.length > 0) {
      return res.status(403).send('Login already exists');
    }
    bcrypt.genSalt(10, (error, salt) => {
      // eslint-disable-next-line no-shadow
      bcrypt.hash(req.body.password, salt, (error, hash) => {
        if (error) throw error;
        const insert = 'INSERT INTO `login` (`login`, `password`) VALUES (?, ?);';
        db.query(insert, [req.body.login, hash], (err2) => {
          if (err2) {
            return res.status(400).send('An error occured');
          }
          return res.status(200).send('Success');
        });
      });
    });
    return 0;
  });
  return 0;
});

export default router;
