const express = require('express');
const router = express.Router();
const verify = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const adminController = require('../controllers/adminController');

router.use(verify, isAdmin);

router.get('/users', adminController.getAllUsers);
router.post('/users', adminController.createUser);
router.delete('/users/:id', adminController.deleteUser);
router.patch('/users/:id/admin', adminController.toggleAdmin);
router.patch('/users/:id/active', adminController.toggleActive);

module.exports = router;
