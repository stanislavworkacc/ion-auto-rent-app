const express = require('express');

const router = express.Router();

const { catchErrors } = require('@/handlers/errorHandlers');
const autoParks = require('@/controllers/appControllers/autoParkController');
const DoSingleStorage = require('../../middlewares/uploadMiddleware/DoSingleStorage');

// DoSingleStorage({ entity: 'admin', fieldName: 'photo', fileType: 'image' })

router.route('/create/:id').post(
    DoSingleStorage({ entity: 'parks', fieldName: 'logo', fileType: 'image' }),
    catchErrors(autoParks.create)
);
router.route('/listAll/:id').post(catchErrors(autoParks.listAll));

module.exports = router;
