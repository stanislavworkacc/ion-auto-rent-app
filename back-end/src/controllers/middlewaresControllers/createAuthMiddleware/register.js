const mongoose = require("mongoose");
const Joi = require("joi");
const {validate} = require("@/validators/default-validators");
const {generate: uniqueId} = require("shortid");
const UserPassword = require("@/models/coreModels/UserPassword");
const bcrypt = require("bcryptjs");

async function register(req, res, { userModel }) {
    const { email, password, userName } = req.body;
    const UserModel = mongoose.model(userModel);
    const UserPasswordModel = mongoose.model('UserPassword');

    const objectSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .required(),
        password: Joi.string().required(),
    });

    const { error, value } = objectSchema.validate({ email, password });
    if (error) {
        return res.status(409).json({
            success: false,
            result: null,
            error: error,
            message: 'Invalid/Missing credentials.',
            errorMessage: error.message,
        });
    }

    try {
        // Check if the user already exists
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new UserModel({
            email,
            userName,
            enabled: true,
        });
        // Save the user to the database
        await user.save();

        const salt = await bcrypt.genSalt(10);
        // generateHash

        const passwordHash = new UserPasswordModel().generateHash(salt, password);

        const UserPasswordData = {
            password: passwordHash,
            emailVerified: true,
            salt: salt,
            user: user._id,
        };
        await new UserPassword(UserPasswordData).save();


        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = register;
