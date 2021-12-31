const io = require('socket.io-client');
const fs = require('fs');
const path = require('path');

const logsFilePath = path.join(__dirname, `./../../${process.env.LOGS_PATH}`)

function receiveLog(req, res) {
    console.log("receive something");
    console.log(req.body);

    //write in logs.log file
    fs.appendFileSync(logsFilePath, req.body.log + "\n")

    const logs = req.body.log

    //mettre le trucs pour format ton log ici
    const logsObj = {
        ip: logs.split(' - - ')[0],
        date: logs.match(/(\[.*\])/)[0],
        reqinfo: logs.match(/(".*?")/g)[0],
        codehttp: logs.match(/" [0-9]{3} [0-9]{1,} "/)[0].replaceAll('"', '').trim().split(' ')[0],
        code: logs.match(/" [0-9]{3} [0-9]{1,} "/)[0].replaceAll('"', '').trim().split(' ')[1],
        resulr: logs.match(/(".*?")/g)[1],
        userAgent: logs.match(/(".*?")/g)[2],
    }


    // emit event with socket.io
    global.io.emit('logs', logsObj);

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