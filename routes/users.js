import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send({ user: 'axa.taro@axa.co.jppp' });
});

export default router;
