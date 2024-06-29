const mongoose = require('mongoose');
const {get} = require("axios");
const Model = mongoose.model('Setting');

const models = async (req, res, {carsModel}) => {

    await get('https://api.api-ninjas.com/v1/cars?limit=2&model=')
        .then(function (response) {
            // handle success
            console.log(response);
            return res.status(203).json({
                success: false,
                result: response.data,
                message: 'Responce texst',
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    // return res.status(203).json({
    //     success: false,
    //     result: [],
    //     message: 'Responce texst',
    // });
    // const sort = parseInt(req.query.sort) || 'desc';
    //
    // //  Query the database for a list of all results
    // const result = await Model.find({
    //     removed: false,
    //     isPrivate: false,
    // }).sort({ created: sort });
    //
    // if (result.length > 0) {
    //     return res.status(200).json({
    //         success: true,
    //         result,
    //         message: 'Successfully found all documents',
    //     });
    // } else {
    //     return res.status(203).json({
    //         success: false,
    //         result: [],
    //         message: 'Collection is Empty',
    //     });
    // }
};

module.exports = models;
