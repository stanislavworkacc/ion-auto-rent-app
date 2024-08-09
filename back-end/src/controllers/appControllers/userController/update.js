const mongoose = require('mongoose');
const Joi = require("joi");

const update = async (Model, req, res) => {
    const {id} = req.params;
    const {userName, userLastName, userSurname, phone, phoneCode, email} = req.body;

    const objectSchema = Joi.object({
        userName: Joi.string().required(),
        userLastName: Joi.string().allow(''),
        userSurname: Joi.string().allow(''),
        phone: Joi.string().allow(''),
        phoneCode: Joi.string().allow(''),
        email: Joi.string().required(),
    });

    const {error, value} = objectSchema.validate({
        userName,
        userLastName,
        userSurname,
        phone,
        phoneCode,
        email
    });

    console.log('error', error);

    if (error) {
        return res.status(409).json({
            success: false,
            result: null,
            error: error,
            message: 'Invalid/Missing credentials.',
            errorMessage: error.message,
        });
    }


    const userFindByEmail = await Model.findOne(
        {
            email,
            _id: {$ne: id} // Виключити документ за його ID
        },
    );

    if (userFindByEmail) {
        return res.status(400).json({
            success: false,
            message: 'You try to use email that already exist',
            result: {}
        })
    }


    const userFindByPhone = await Model.findOne(
        {
            phoneLogin: req.body?.phoneCode + req.body?.phone,
            _id: {$ne: id} // Виключити документ за його ID
        }
    );

    if(userFindByPhone) {
        return res.status(400).json({
            success: false,
            message: 'You try to use phone that already exist',
            result: {}
        })
    }


    const userModel = await Model.findOneAndUpdate(
        {_id: id},
        {
            userName: req.body.userName,
            userLastName: req.body.userLastName,
            userSurname: req.body.userSurname,
            phone: req.body.phone,
            phoneCode: req.body.phoneCode,
            email: req.body.email,
            phoneLogin: req.body?.phoneCode + req.body?.phone,
        },
        {
            new: true,
            runValidators: true
        }
    ).exec();

    if (userModel) {
        return res.status(200).json({
            success: true,
            result: {
                _id: userModel._id,
                userName: userModel.userName,
                userLastName: userModel?.userLastName,
                userSurname: userModel?.userSurname,
                phoneCode: userModel?.phoneCode,
                phone: userModel?.phone,
                email: userModel.email,
                sso: userModel.sso,
            },
            message: 'Successfully updated this document',
        });
    }


    return res.status(200).json({
        success: false,
        result: id,
        message: 'You cant update',
    });
};

module.exports = update;
