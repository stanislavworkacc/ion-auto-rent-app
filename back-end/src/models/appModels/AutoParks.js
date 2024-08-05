const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const carSchema = new mongoose.Schema({
    type: {type: Number},
    year: {type: Number},
    make: {type: String},
    model: {type: String},
    bodyType: {type: String},
});

const parkSchema = new mongoose.Schema({
    address: { type: String, unique: true, required: true, trim: true},
    logo: { type: String, required: false, trim: true },
    name: { type: String, default: '', required: true},
    scheduler: {
        type: Object,
        default: {
            close: String,
            open: String,
        },
        required: false
    },
    type: { type: Number, default: 0, required: true},
    cars: [carSchema]
});

const parksSchema = new mongoose.Schema({
    parks: [parkSchema],
});

parksSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('AutoParks', parksSchema);
