const io = require('socket.io-client');

function receiveLog(req, res) {
    console.log("receive something");

    console.log(req.body);
    //         global.io.emit('logs', data);
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