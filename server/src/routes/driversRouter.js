const { Router } = require('express');

const allDriversHandler = require('../handlers/drivers/allDriversHandler');
const driversByIdHandler = require('../handlers/drivers/driversByIdHandler');
const driversByNameHandler = require('../handlers/drivers/driversByNameHandler');
const postDriversHandler = require('../handlers/drivers/postDriversHandler');

const driversRouter = Router();
driversRouter.get('/', allDriversHandler);
driversRouter.get('/name', driversByNameHandler);
driversRouter.get('/:id', driversByIdHandler);
driversRouter.post('/', postDriversHandler)

module.exports = driversRouter;