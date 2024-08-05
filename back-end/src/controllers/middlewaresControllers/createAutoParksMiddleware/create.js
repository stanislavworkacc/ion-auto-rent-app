const mongoose = require('mongoose');
const Joi = require("joi");

const create = async (req, res, {autoParksModelName}) => {
    const AutoParksModel = mongoose.model(autoParksModelName);
    const {id} = req.params;
    const {
        address,
        logo,
        name,
        scheduler
    } = req.body;

    console.log('HERE')

    const objectSchema = Joi.object({
        address: Joi.string(),
        logo: Joi.string(),
        name: Joi.string().required(),
        scheduler: Joi.object({
            close: Joi.string(),
            open: Joi.string()
        })
    });

    const {error, value} = objectSchema.validate({
        address,
        logo,
        name,
        scheduler
    });

    if (error) {
        return res.status(409).json({
            success: false,
            result: null,
            error: error,
            message: 'Invalid/Missing credentials.',
            errorMessage: error.message,
        });
    }


    const autoPark = await AutoParksModel.findById(id);

    if (!autoPark) {
        const newAutoPark = new AutoParksModel({
            _id: id,
            parks: [req.body]
        });
        await newAutoPark.save();
    } else {
        autoPark.parks.push(req.body);
        await autoPark.save();
    }

    return res.status(200).json({
        success: true,
    })

};

module.exports = create;
