const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerCompany,  updateCompany, getCompanyById, requestToJoinCompany} = require('../controllers/companyController');

const router = express.Router();

router.post('/register', authMiddleware, registerCompany);  
router.put('/update/:id', authMiddleware, updateCompany);
router.get('/:id', authMiddleware, getCompanyById);

//company request
router.post('/request', authMiddleware, requestToJoinCompany); 


module.exports = router;
