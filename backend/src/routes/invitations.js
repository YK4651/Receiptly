const express = require('express');
const { sendInvitation, acceptInvitation, getPendingInvitations } = require('../controllers/invitationController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

//router.use(authMiddleware);

router.post('/', sendInvitation);
router.get('/accept/:invitationId', acceptInvitation);
router.get('/pending', getPendingInvitations);

module.exports = router;