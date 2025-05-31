const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verify = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/activate/:token', authController.activateAccount);
router.post('/change-password', verify, authController.changePassword);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
