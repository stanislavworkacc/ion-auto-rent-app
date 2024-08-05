const create = require("@/controllers/middlewaresControllers/createAutoParksMiddleware/create");
const edit = require("@/controllers/middlewaresControllers/createAutoParksMiddleware/edit");
const listAll = require("@/controllers/middlewaresControllers/createAutoParksMiddleware/listAll");

const createAutoParksMiddleware = (autoParksModelName) => {
    let autoParkMethods = {};

    autoParkMethods.create = (req, res) =>
        create(req, res, {
            autoParksModelName,
        });

    autoParkMethods.edit = (req, res) =>
        edit(req, res, {
            autoParksModelName,
        });

    autoParkMethods.listAll = (req, res) =>
        listAll(req, res, {
            autoParksModelName,
        });

    return autoParkMethods;
};

module.exports = createAutoParksMiddleware;
