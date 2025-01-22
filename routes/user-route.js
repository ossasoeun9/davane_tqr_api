const router = require('express').Router();

const { verifyToken } = require('../controllers/auth-controller.js');
const { getProfileById, editProfile } = require('../controllers/user-controller.js');

router.get('/:id', getProfileById);
router.put('/edit', verifyToken, editProfile);

module.exports = router;