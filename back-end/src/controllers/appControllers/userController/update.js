const mongoose = require('mongoose');

const update = async (Model, req, res) => {
  const { id } = req.params;
  // const {email, userName, enabled, userLastName, ssoUser, phone, userSurname} = req.body;

  const userModel = await Model.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
        phoneLogin: req.body?.phoneCode + req.body?.phone,
      },
      {
        new: true,
        runValidators: true
      }
  ).exec();

  if(userModel) {
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
        ssoUser: userModel.ssoUser,
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
