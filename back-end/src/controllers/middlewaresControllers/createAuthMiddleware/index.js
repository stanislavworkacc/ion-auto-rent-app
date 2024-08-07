const isValidAuthToken = require('./isValidAuthToken');
const login = require('./login');
const logout = require('./logout');
const forgetPassword = require('./forgetPassword');
const resetPassword = require('./resetPassword');
const register = require('./register');
const googleSsoLogin = require('./googleSsoLogin');
const matchPassword = require('./matchPassword');
const changePassword = require('./changePassword');
const deleteAccount = require('./deleteAccount');

const createAuthMiddleware = (userModel) => {
    let authMethods = {};

    authMethods.register = (req, res) =>
        register(req, res, {
            userModel,
        });

    authMethods.isValidAuthToken = (req, res, next) =>
        isValidAuthToken(req, res, next, {
            userModel,
        });

    authMethods.login = (req, res) =>
        login(req, res, {
            userModel,
        });

    authMethods.googleSsoLogin = (req, res) =>
        googleSsoLogin(req, res, {
            userModel,
        });

    authMethods.forgetPassword = (req, res) =>
        forgetPassword(req, res, {
            userModel,
        });

    authMethods.resetPassword = (req, res) =>
        resetPassword(req, res, {
            userModel,
        });

    authMethods.changePassword = (req, res) =>
        changePassword(req, res, {
            userModel,
        });

    authMethods.deleteAccount = (req, res) =>
        deleteAccount(req, res, {
            userModel,
        });

    authMethods.matchPassword = (req, res) =>
        matchPassword(req, res, {
            userModel,
        });

    authMethods.logout = (req, res) =>
        logout(req, res, {
            userModel,
        });
    return authMethods;
};

module.exports = createAuthMiddleware;
