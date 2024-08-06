const Joi = require("joi");

const fileSchema = Joi.object({
    logo: Joi.object({
        lastModified: Joi.number().required(),
        lastModifiedDate: Joi.date().required(),
        name: Joi.string().required(),
        size: Joi.number().required(),
        type: Joi.string().required(),
        webkitRelativePath: Joi.string().allow('').required()
    }).required(),
    lastModified: Joi.number().required(),
    lastModifiedDate: Joi.date().required(),
    name: Joi.string().required(),
    size: Joi.number().required(),
    type: Joi.string().required(),
    webkitRelativePath: Joi.string().allow('').required()
});

const base64Type = Joi.string().pattern(/^data:image\/[a-zA-Z]+;base64,[^\s]+$/).required();


module.exports = {
    base64Type,
    fileSchema
};
