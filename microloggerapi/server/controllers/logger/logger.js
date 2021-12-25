const logger = require("../../models/logger-schema");

function receiveLog(req, res) {
    console.log("receive something");

    console.log(req.body);

    logger.create(req.body, (error, data) => {
        if (error) {
            console.log("error when try to add log in db ", error);
            return res.json(error)
        } else {
            console.log("user add to db");
            res.json(data)
        }
    })

}

module.exports = {
    receiveLog,
};