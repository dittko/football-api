const express = require('express');
const router = express.Router();
const llmController = require('../controllers/llmController');

router.get('/list', llmController.getAll);       
router.get('/item/:id', llmController.getOne);   
router.get('/filter', llmController.filter);     

module.exports = router;
