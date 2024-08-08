const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const mongoose = require('mongoose');

const checkAndCorrectURL = require('./checkAndCorrectURL');
const sendMail = require('./sendMail');

const { loadSettings } = require('@/middlewares/settings');
const { useAppSettings } = require('@/settings');
const {authUser} = require("@/controllers/middlewaresControllers/createAuthMiddleware/authUser");


const login = async (req, res, { userModel }) => {
  const UserPasswordModel = mongoose.model(userModel + 'Password');
  const UserModel = mongoose.model(userModel);
  const { email = null, password, phone = null } = req.body;

  const objectSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: true } }).allow(null),
    password: Joi.string().required(),
    phoneLogin: Joi.string().allow(''),
  });

  const { error, value } = objectSchema.validate({ email, password, phoneLogin: phone });
  if (error) {
    return res.status(409).json({
      success: false,
      result: null,
      error: error,
      message: 'Invalid/Missing credentials.',
      errorMessage: error.message,
    });
  }

  const user = await UserModel.findOne(email ? { email: email } : {phoneLogin: phone });
  // const user = await UserModel.findOne({ email: email, phone: phone });


  console.log('user', user);
  if (!user)
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No account with this email has been registered.',
    });

  const databasePassword = await UserPasswordModel.findOne({ user: user._id});

  if (!user.enabled)
    return res.status(409).json({
      success: false,
      result: null,
      message: 'Your account is disabled, contact your account adminstrator',
    });

  //  authUser if your has correct password
  authUser(req, res, { user, databasePassword, password, UserPasswordModel });
};

module.exports = login;
