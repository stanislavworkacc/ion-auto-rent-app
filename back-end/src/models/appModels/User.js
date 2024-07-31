const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, trim: true},
    userName: { type: String, required: true, trim: true },
    enabled: { type: Boolean, default: true, required: true},
    userLastName: { type: String, default: '', required: false},
    ssoUser: { type: Boolean, default: false, required: false},
    phone: { type: String, unique: true, required: false, trim: true, default: null },
    userSurname: {type: String, default: '', required: false, trim: true},
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('User', schema);
