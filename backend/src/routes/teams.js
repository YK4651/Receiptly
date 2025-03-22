const express = require('express');
const { createTeam, getTeams, addMember } = require('../controllers/teamController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createTeam);
router.get('/', getTeams);
router.post('/add-member', addMember);

module.exports = router;