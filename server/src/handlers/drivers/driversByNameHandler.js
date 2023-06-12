/******************************/
/* HANDLER: Driver by Name    */
/******************************/
const getAllDrivers = require('../../controllers/drivers/getAllDrivers');

const driversByNameHandler = async (req,res) => {
    const { name } = req.query;

    try {
        const driverByName = await getAllDrivers(name);
        res.status(200).json(driverByName);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = driversByNameHandler;