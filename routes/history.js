/* eslint-disable no-console */
/* eslint-disable max-len */

import express from 'express';
import db from '../utils/db';

const router = express.Router();

// Get all history
router.get('/', (req, res) => {
  const query = 'Select * from `history`';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(400).send('No history');
    }
    return res.send(result);
  });
});

// Get history by id
router.get('/:id', (req, res) => {
  const query = `Select * from \`history\` where id = ${req.params.id}`;
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(400).send('History does not exist');
    }
    return res.send(result);
  });
});

// Delete history by id
router.delete('/:id', (req, res) => {
  const get = `SELECT * from \`history\` WHERE id = "${req.params.id}"`;
  const del = `DELETE FROM history WHERE id = "${req.params.id}"`;
  db.query(get, (err1, results) => {
    if (err1) {
      return res.status(500).send(err1);
    }
    if (results.length > 0) {
      db.query(del, (err2) => {
        if (err2) {
          return res.status(500).send(err2);
        }
        return res.status(200).send('History deleted');
      });
    } else {
      return res.status(500).send('History not found');
    }
    return 0;
  });
});


// Get history by suggestion id
router.get('/suggestion/:id', (req, res) => {
  const query = `Select * from \`history\` where suggestionId = ${req.params.id} order by id DESC`;
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(400).send('History does not exist');
    }
    return res.send(result);
  });
});

// Delete history by suggestion id
router.delete('/suggestion/:id', (req, res) => {
  const get = `SELECT * from \`history\` WHERE suggestionId = "${req.params.id}"`;
  const del = `DELETE FROM history WHERE suggestionId = "${req.params.id}"`;
  db.query(get, (err1, results) => {
    if (err1) {
      return res.status(500).send(err1);
    }
    if (results.length > 0) {
      db.query(del, (err2) => {
        if (err2) {
          return res.status(500).send(err2);
        }
        return res.status(200).send('History deleted');
      });
    } else {
      return res.status(500).send('History not found');
    }
    return 0;
  });
});

export default router;
