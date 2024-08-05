const mongoose = require('mongoose');
const Joi = require("joi");

const edit = async (req, res, {autoParksModelName}) => {
    return res.status(200).json({
        success: true,
    })

};

module.exports = edit;
