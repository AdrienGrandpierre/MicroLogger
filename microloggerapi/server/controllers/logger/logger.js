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
    data.pop()

    let logs = []
    data.forEach(log => {
        logs.push({
            ip: log.split(' - - ')[0],
            date: log.match(/(\[.*\])/)[0],
            reqinfo: log.match(/(".*?")/g)[0],
            codehttp: log.match(/" [0-9]{3} [0-9]{1,} "/)[0].replaceAll('"', '').trim().split(' ')[0],
            code: log.match(/" [0-9]{3} [0-9]{1,} "/)[0].replaceAll('"', '').trim().split(' ')[1],
            resulr: log.match(/(".*?")/g)[1],
            userAgent: log.match(/(".*?")/g)[2],
        })
    });

    // maplog = data.map(x => x = {
    //     ip: x.split(' - - ')[0],
    //     date: x.match(/(\[.*\])/)[0],
    //     reqinfo: x.match(/(".*?")/g)[0],
    //     codehttp: x.match(/" [0-9]{3} [0-9]{1,} "/)[0].replaceAll('"', '').trim().split(' ')[0],
    //     code: x.match(/" [0-9]{3} [0-9]{1,} "/)[0].replaceAll('"', '').trim().split(' ')[1],
    //     resulr: x.match(/(".*?")/g)[1],
    //     userAgent: x.match(/(".*?")/g)[2],
    // })

    // console.log(maplog);

    res.status(200).send(logs)
}

module.exports = {
    receiveLog,
    getLogs
};