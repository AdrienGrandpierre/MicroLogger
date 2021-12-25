const logger = require("../../models/logger-schema");

const io = require('socket.io-client');

function receiveLog(req, res) {
    console.log("receive something");

    console.log(req.body);

    logger.create(req.body, (error, data) => {
        if (error) {
            console.log("error when try to add log in db ", error);
            return res.json(error)
        } else {
            console.log("user add to db");
            global.io.emit('logs', data);
            res.json(data)
        }
    })

}

async function getLogs(req, res) {
    logger.find({}, (error, data) => {
        if (error) {
            return res.json(error)
        } else {
            res.json(data)
        }
    })
}

module.exports = {
    receiveLog,
    getLogs
};