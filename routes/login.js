import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validateLoginInput from '../utils/validation/login';
import db from '../utils/db';

const router = express.Router();

router.post('/', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  db.query('SELECT * FROM login WHERE login = ?', [req.body.login], (err, results) => {
    if (err) {
      return res.status(400).send('An error occured');
    }
    // eslint-disable-next-line no-lonely-if
    if (results.length > 0) {
      bcrypt.compare(req.body.password, results[0].password).then((isMatch) => {
        if (isMatch) {
          // User Matched
          const payload = { id: results[0].id, login: results[0].login }; // Create JWT Payload
          // Sign Token
          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: 86400 },
            (error, token) => {
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            },
          );
        } else {
          return res.status(404).json('Login/Password incorrect');
        }
        return 0;
      });
    } else {
      return res.status(404).send('Login/Password incorrect');
    }
    return 0;
  });
  return 0;
});

export default router;
