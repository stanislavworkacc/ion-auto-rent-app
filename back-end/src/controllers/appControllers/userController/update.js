const mongoose = require('mongoose');

const update = async (Model, req, res) => {
  const { id } = req.params;
  // const {email, userName, enabled, userLastName, ssoUser, phone, userSurname} = req.body;

  const userModel = await Model.findOneAndUpdate(
      { _id: id },
      {
        ...req.body
      },
      {
        new: true,
        runValidators: true
      }
  ).exec();

  if(userModel) {
    return res.status(200).json({
      success: true,
      result: userModel,
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
