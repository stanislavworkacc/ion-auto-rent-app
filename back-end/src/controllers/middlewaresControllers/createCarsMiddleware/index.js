const models = require("@/controllers/middlewaresControllers/createCarsMiddleware/models");

const createCarsMiddleware = (carsModel) => {
    let carsMethods = {};

    carsMethods.models = (req, res) =>
        models(req, res, {
            carsModel,
        });

    return carsMethods;
};

module.exports = createCarsMiddleware;
