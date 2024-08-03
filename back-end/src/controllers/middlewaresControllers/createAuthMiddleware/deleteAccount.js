const mongoose = require('mongoose');


const deleteAccount = async (req, res, { userModel }) => {
    const {id} = req.params;

    const UserPasswordModel = mongoose.model(userModel + 'Password');
    const UserModel = mongoose.model(userModel);

    const UserPasswordResponse = await  UserPasswordModel.deleteOne({user: id});
    const UserModelResponse = await UserModel.deleteOne({_id: id});

    if(UserPasswordResponse && UserModelResponse) {
        return res.status(200).json({
            success: true,
            result: {},
            message: 'Account deleted successfully',
        })
    }

    if(!UserPasswordResponse && UserModelResponse) {
        return res.status(500).json({
            success: false,
            result: {},
            message: 'UserPasswordResponse didnt updated',
        })
    }

    if(UserPasswordResponse && !UserModelResponse) {
        return res.status(500).json({
            success: false,
            result: {},
            message: 'UserModelResponse didnt updated',
        })
    }
};

module.exports = deleteAccount;
