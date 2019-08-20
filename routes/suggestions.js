/* eslint-disable no-console */
/* eslint-disable max-len */
import moment from 'moment-timezone';
import express from 'express';
import isEmpty from 'is-empty';
import passport from 'passport';
import validateSuggestionInput from '../utils/validation/suggestion';
import sendEmailConfirmation from '../utils/email';
import detectionSuggestion from '../utils/detection';
import db from '../utils/db';

const router = express.Router();

// Get all the suggestions
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const query = 'Select * from `suggestion`';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(400).send('No suggestion');
    }
    return res.send(result);
  });
});

// Get only one suggestion by id
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const query = `Select * from \`suggestion\` where id = ${req.params.id}`;
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(400).send('Suggestion does not exist');
    }
    return res.send(result);
  });
});

// Post a suggestion
router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).send('No suggestion received');
  }
  const { errors, isValid } = validateSuggestionInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const date = moment().tz('Asia/Tokyo').locale('ja').format('YYYY-MM-DD HH:mm:ss.SSS');
  const query = 'INSERT INTO `suggestion` (date, contributorName, contributorEmail, contributorTeam, category, targetedSystem, description, personDayCurrent, personDayFuture, cost, gatewayStatus, approvalStatus, remark, title) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, \'submitted\', \'toReview\', ?, ?)';
  db.query(query, [date, req.body.contributorName, req.body.contributorEmail, req.body.contributorTeam, req.body.category, req.body.targetedSystem, req.body.description, req.body.personDayCurrent, req.body.personDayFuture, req.body.cost, req.body.remark, req.body.title], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (req.query.email === '1') {
      sendEmailConfirmation(req.body.id, 'post');
      return res.status(200).send('Suggestion received with email');
    }
    return res.status(200).send('Suggestion received without email');
  });
  return 0;
});

// Edit a suggestion
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (!req.body) {
    return res.status(400).send('No suggestion received');
  }
  if (req.params.id !== req.body.id) {
    return res.status(400).send('IDs do not match');
  }
  const { errors, isValid } = validateSuggestionInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const date = moment().tz('Asia/Tokyo').locale('ja').format('YYYY-MM-DD HH:mm:ss.SSS');
  const select = `SELECT * from \`suggestion\` WHERE id = "${req.params.id}"`;
  const update = 'UPDATE `suggestion` SET `contributorName` = ?, `contributorEmail` = ?, `contributorTeam` = ?, `category` = ?, `targetedSystem` = ?, `description` = ?, `personDayCurrent` = ?, `personDayFuture` = ?, `cost` = ?, `gatewayStatus` = ?, `approvalStatus` = ?, `remark` = ?, `title` = ?, `editDate` = ? WHERE `id` = ?';
  let edit = {};
  // Request to check if the suggestion exists
  db.query(select, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    if (result.length === 0) {
      return res.status(400).send('Suggestion does not exist');
    }
    // Request to update the suggestion
    db.query(update, [req.body.contributorName, req.body.contributorEmail, req.body.contributorTeam, req.body.category, req.body.targetedSystem, req.body.description, req.body.personDayCurrent, req.body.personDayFuture, req.body.cost, req.body.gatewayStatus, req.body.approvalStatus, req.body.remark, req.body.title, date, req.body.id], (err1) => {
      if (err1) {
        return res.status(400).send(err1);
      }
      // Request to get the new suggestion updated
      db.query(select, (err2, result2) => {
        if (err2) {
          return res.status(400).send(err2);
        }
        // Check the modifications that have been made
        edit = detectionSuggestion(result[0], result2[0]);
        // If there are modifications:
        if (!isEmpty(edit)) {
          const insert = 'INSERT INTO `history` (date, adminId, suggestionId, modification) VALUES (?, ?, ?, ?)';
          // Insert the modifications into the history database
          db.query(insert, [date, req.query.login, req.body.id, JSON.stringify(edit)], () => {
            // If email is asked in the queries
            if (req.query.email === '1') {
              sendEmailConfirmation(req.body.id, 'put', edit);
              return res.status(200).send('Modification received with email');
            }
            return res.status(200).send('Modification received without email');
          });
        } else {
          return res.status(500).send('No modification received');
        }
        return 0;
      });
      return 0;
    });
    return 0;
  });
  return 0;
});

// Delete suggestion by id
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const get = `SELECT * from \`suggestion\` WHERE id = "${req.params.id}"`;
  const del = `DELETE FROM suggestion WHERE id = "${req.params.id}"`;
  db.query(get, (err1, results) => {
    if (err1) {
      return res.status(500).send(err1);
    }
    if (results.length > 0) {
      db.query(del, (err2) => {
        if (err2) {
          return res.status(500).send(err2);
        }
        return res.status(200).send('Suggestion deleted');
      });
    } else {
      return res.status(500).send('Suggestion not found');
    }
    return 0;
  });
});

export default router;
