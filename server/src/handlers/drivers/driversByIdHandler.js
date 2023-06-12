/******************************/
/* HANDLER: by ID de piloto   */
/******************************/
const getDriverById = require('../../controllers/drivers/getDriverById');

const driversByIdHandler = async (req,res) => {
    const { id } = req.params;
    try {
        const driverById = await getDriverById(id);
        res.status(200).json(driverById);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = driversByIdHandler;