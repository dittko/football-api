const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const verify = require('../middlewares/auth');

router.use(verify); 

router.get('/', teamController.getAll);
router.get('/:id', teamController.getOne);
router.post('/', teamController.create);
router.put('/:id', teamController.update);
router.delete('/:id', teamController.remove);

module.exports = router;
