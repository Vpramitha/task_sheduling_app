const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerCompany,  updateCompany} = require('../controllers/companyController');

const router = express.Router();

router.post('/register', authMiddleware, registerCompany);  
router.put('/update/:id', authMiddleware, updateCompany);

module.exports = router;
