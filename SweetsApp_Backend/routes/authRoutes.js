const express = require('express');
const { register, login, getProtected } = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authenticateToken, getProtected);

module.exports = router;
