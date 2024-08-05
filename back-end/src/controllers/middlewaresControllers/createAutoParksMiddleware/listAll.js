const mongoose = require('mongoose');

const listAll = async (req, res, {autoParksModelName}) => {
    const AutoParksModel = mongoose.model(autoParksModelName);
    const {id} = req.params;

    const UserAutoParks = await AutoParksModel.findOne({
        _id: id
    }, {
        'parks.cars': false
    });

    return res.status(200).json({
        success: true,
        results: UserAutoParks.parks
    })

};

module.exports = listAll;
