const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ssoSchema = new mongoose.Schema({
    ssoUser: { type: Boolean, default: false, required: true},
    firstSsoLogin: { type: Boolean, default: false, required: true},
});


const schema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, trim: true},
    userName: { type: String, required: true, trim: true },
    enabled: { type: Boolean, default: true, required: true},
    userLastName: { type: String, default: '', required: false},
    sso: ssoSchema,
    phone: { type: String, unique: false, required: false, trim: true, default: null },
    phoneCode: { type: String, unique: false, required: false, trim: false, default: '' },
    phoneLogin: { type: String, unique: true, required: false, trim: true, default: '' },
    userSurname: {type: String, default: '', required: false, trim: true},
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('User', schema);
