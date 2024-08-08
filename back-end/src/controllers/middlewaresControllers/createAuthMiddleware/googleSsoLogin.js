const UserPassword = require("@/models/coreModels/UserPassword");
const mongoose = require('mongoose');

const decodeToken = require("@/utils/parseGoogleSso");
const bcrypt = require("bcryptjs");
const {ssoAuthUser, authUser} = require("@/controllers/middlewaresControllers/createAuthMiddleware/authUser");

const googleSsoLogin = async (req, res, {userModel}) => {
    const UserPasswordModel = mongoose.model(userModel + 'Password');
    const UserModel = mongoose.model(userModel);
    const {credential} = req.body;

    if (!credential) {
        return res.status(409).json({
            success: false,
            result: null,
            error: 'Сredential payload not provided',
            message: 'Invalid/Missing credentials.',
            errorMessage: 'Google Sso Login Fail',
        });
    }

    const parsedCredentialsUser = decodeToken(credential);
    const existingUser = await UserModel.findOne({email: parsedCredentialsUser.email});

    if (existingUser) {
        ssoAuthUser(req, res, { user: existingUser, UserPasswordModel });
    } else {
        const createdUser = new UserModel({
            email: parsedCredentialsUser.email,
            userName: parsedCredentialsUser.given_name,
            userLastName: parsedCredentialsUser.family_name,
            enabled: true,
            sso: {
                firstSsoLogin: true,
                ssoUser: true,
            },
        });

        const googleSsoDefaultPassword = '';
        const salt = await bcrypt.genSalt(10);
        const passwordHash = new UserPasswordModel().generateHash(salt, '');

        const UserPasswordData = {
            password: passwordHash,
            emailVerified: true,
            salt: salt,
            user: createdUser._id,
        };
        await new UserPassword(UserPasswordData).save();
        // Save the user to the database
        await createdUser.save();

        authUser(req, res, {
            user: createdUser,
            databasePassword: UserPasswordData,
            password: googleSsoDefaultPassword,
            UserPasswordModel
        });

    }
    //  authUser if your has correct password
};

module.exports = googleSsoLogin;
