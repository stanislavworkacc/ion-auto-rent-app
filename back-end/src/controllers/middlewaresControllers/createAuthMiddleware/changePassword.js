const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');


const changePassword = async (req, res, { userModel }) => {
    const UserPasswordModel = mongoose.model(userModel + 'Password');
    const UserModel = mongoose.model(userModel);

    const { id } = req.params;
    const { password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = new UserPasswordModel().generateHash(salt, password);

    const updatedPasswordData = {
        password: passwordHash,
        salt: salt,
    };

    const updatedPasswordModel = await UserPasswordModel.findOneAndUpdate({user: id}, {
        $set: updatedPasswordData,
    }, { new: true });


    const updatedUserModel = await UserModel.findOneAndUpdate({
        _id: id
    }, {
        ssoUser: false,
    }, {
        new: true,
    }).exec();

    if(updatedPasswordModel && updatedUserModel) {
        return res.status(200).json({
            success: true,
            result: updatedUserModel,
            message: 'Password updated successfully',
        })
    }

    return res.status(500).json({
        success: false,
        result: {},
        message: 'Sorry we have the problems',
    })
};

module.exports = changePassword;
