const express = require('express');

const router = express.Router();

const { catchErrors } = require('@/handlers/errorHandlers');
const cars = require('@/controllers/coreControllers/carsControllers');

router.route('/models').get(catchErrors(cars.models));

module.exports = router;
