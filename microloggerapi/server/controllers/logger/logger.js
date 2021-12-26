const io = require('socket.io-client');
const fs = require('fs');
const path = require('path');

const logsFilePath = path.join(__dirname, `./../../${process.env.LOGS_PATH}`)

function receiveLog(req, res) {
    console.log("receive something");
    console.log(req.body);

    //write in logs.log file
    fs.appendFileSync(logsFilePath, req.body.log + "\n")

    //format to json object
    const log = req.body.log.split('|')
    const logjson = {
        date: log[0],
        serviceName: log[1],
        content: log[2],
        status: log[3]
    }

    // emit event with socket.io
    global.io.emit('logs', logjson);

    res.status(200).send(logjson)
}

function receiveLogJson(req, res) {
    console.log("receive something");
    console.log(req.body);

    //dirty need to rewrite
    const log = `${req.body.date}|${req.body.serviceName}|${req.body.content}|${req.body.status}\n`

    //write in logs.log file
    fs.appendFileSync(logsFilePath, log)

    // emit event with socket.io
    global.io.emit('logs', req.body);
    res.status(200).send(req.body)
}

async function getLogs(req, res) {

    let data = fs.readFileSync(logsFilePath, 'utf8')

    //split with regex
    data = data.split(/[\n]/).map(x => x.split('|'))
    //same but with separator only
    // data = data.split('\n').map(x => x.split('|'))

    console.log(data);

    res.status(200).send("ok")
}

module.exports = {
    receiveLog,
    receiveLogJson,
    getLogs
};