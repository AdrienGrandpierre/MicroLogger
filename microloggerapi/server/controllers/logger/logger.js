const io = require('socket.io-client');
const fs = require('fs');
const path = require('path');

const logsFilePath = path.join(__dirname, `./../../${process.env.LOGS_PATH}`)

function receiveLog(req, res) {
    console.log("receive something");
    console.log(req.body);

    //write in logs.log file
    fs.appendFileSync(logsFilePath, req.body.log + "\n")

    // emit event with socket.io
    global.io.emit('logs', req.body.log);

    res.status(200).send(req.body.log)
}

async function getLogs(req, res) {

    let data = fs.readFileSync(logsFilePath, 'utf8')
    data = data.split('\n')
    console.log(data);

    //format data
    //
    
    //

    res.status(200).send(data)
}

module.exports = {
    receiveLog,
    getLogs
};