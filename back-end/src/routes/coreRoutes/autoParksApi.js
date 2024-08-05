const express = require('express');

const router = express.Router();

const { catchErrors } = require('@/handlers/errorHandlers');
const autoParks = require('@/controllers/appControllers/autoParkController');

router.route('/create/:id').post(catchErrors(autoParks.create));
router.route('/listAll/:id').post(catchErrors(autoParks.listAll));

module.exports = router;
