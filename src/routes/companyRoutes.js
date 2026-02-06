const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerCompany,  updateCompany, getCompanyById} = require('../controllers/companyController');

const router = express.Router();

router.post('/register', authMiddleware, registerCompany);  
router.put('/update/:id', authMiddleware, updateCompany);
router.get('/:id', authMiddleware, getCompanyById);

module.exports = router;
