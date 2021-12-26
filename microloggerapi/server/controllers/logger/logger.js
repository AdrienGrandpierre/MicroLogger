const io = require('socket.io-client');

function receiveLog(req, res) {
    res.status(200).send("Ok")

    console.log("receive something");

    console.log(req.body);
    //         global.io.emit('logs', data);
}

async function getLogs(req, res) {
    res.status(200).send("Ok")
}

module.exports = {
    receiveLog,
    getLogs
};