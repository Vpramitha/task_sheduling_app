const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Profile data',
    userId: req.user.id,
  });
});

module.exports = router;
