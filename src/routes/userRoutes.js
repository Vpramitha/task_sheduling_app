const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getMyProfile } = require('../controllers/profileController');
const { getCompanyList } = require('../controllers/companyController');

const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Profile data',
    userId: req.user.id,
  });
});

router.get('/my_profile', authMiddleware, getMyProfile);

router.get('/company_list', authMiddleware, getCompanyList);

module.exports = router;
