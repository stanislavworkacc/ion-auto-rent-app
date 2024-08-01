const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');


const matchPassword = async (req, res, { userModel }) => {
    const UserPasswordModel = mongoose.model(userModel + 'Password');
    const UserModel = mongoose.model(userModel);
    const { id } = req.params;
    const { password } = req.body;

    const user = await UserModel.findOne({
        _id: id
    });

    if (!user)
        return res.status(404).json({
            success: false,
            result: null,
            message: 'No account with this id has been registered.',
        });

    const databasePassword = await UserPasswordModel.findOne({ user: user._id});

    if (!user.enabled)
        return res.status(409).json({
            success: false,
            result: null,
            message: 'Your account is disabled, contact your account adminstrator',
        });

    //  authUser if your has correct password

    const isMatch = await bcrypt.compare(databasePassword.salt + password, databasePassword.password);


    if(isMatch) {
        return res.status(200).json({
            success: true,
            result: {
                matchPassword: true
            },
            message: 'Yeah man',
        });
    } else {
        return res.status(404).json({
            success: false,
            result: {
                matchPassword: false
            },
            message: 'Sorry man',
        });
    }
};

module.exports = matchPassword;
