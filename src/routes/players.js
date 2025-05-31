const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController');

router.get('/', controller.getAllPlayers);
router.get('/:id', controller.getPlayerById);
router.post('/', controller.createPlayer);
router.put('/:id', controller.updatePlayer);
router.delete('/:id', controller.deletePlayer);

module.exports = router;
