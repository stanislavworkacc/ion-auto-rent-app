const express = require('express');

const router = express.Router();

const { catchErrors } = require('@/handlers/errorHandlers');
const adminAuth = require('@/controllers/coreControllers/adminAuth');

router.route('/login').post(catchErrors(adminAuth.login));
router.route('/login-google-sso').post(catchErrors(adminAuth.googleSsoLogin));
router.route('/register').post(catchErrors(adminAuth.register));
router.route('/matchPassword/:id').post(adminAuth.isValidAuthToken, catchErrors(adminAuth.matchPassword));
router.route('/changePassword/:id').post(adminAuth.isValidAuthToken, catchErrors(adminAuth.changePassword));
router.route('/deleteAccount/:id').post(adminAuth.isValidAuthToken, catchErrors(adminAuth.deleteAccount));

router.route('/forgetpassword').post(catchErrors(adminAuth.forgetPassword));
router.route('/resetpassword').post(catchErrors(adminAuth.resetPassword));

router.route('/logout').post(adminAuth.isValidAuthToken, catchErrors(adminAuth.logout));

module.exports = router;
