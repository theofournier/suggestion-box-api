import moment from 'moment-timezone';
import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send({ time: moment().tz('Asia/Tokyo').locale('ja').format('YYYY-MM-DD HH:mm:ss.SSS') });
});

export default router;
