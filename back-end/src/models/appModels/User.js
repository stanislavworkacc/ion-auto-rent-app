const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId, unique: true },
    email: { type: String, unique: true, required: true, trim: true},
    // password: { type: String, required: true, trim: true},
    userName: { type: String, required: true, trim: true },
    enabled: { type: Boolean, default: true, required: true},
    // telephone: { type: String, unique: true, required: true, trim: true },
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('User', schema);
