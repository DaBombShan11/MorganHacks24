const router = require('express').Router();
const { registerNurse, loginNurse } = require('../controllers/authController');

router.post('/signup', registerNurse);
router.post('/signin', loginNurse);

module.exports = router;