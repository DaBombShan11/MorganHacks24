const router = require('express').Router();
const { getListofKids } = require('../controllers/listOfPatientController');
const { authenticateNurse } = require('../middleware/authmiddleware.js');

router.get('/listOfPatients', authenticateNurse, getListofKids);

module.exports = router;