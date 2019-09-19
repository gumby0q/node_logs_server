const express = require('express')
const app = express()
const fs = require('fs');
const util = require('util');
const serveIndex = require('serve-index')

const PORT = 3000;

function fileLog (d) {
  logFile.write(util.format(d) + '\n');
};

function getDateTime() {

    let date = new Date();

    let hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    let min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    let sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    let day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}



const logFile = fs.createWriteStream(__dirname + `/logs/debug_${getDateTime()}.txt`, {flags : 'w'});
const sharedPath = __dirname + '/logs';

app.use(express.json());

// app.get('/logs', function (req, res) {
//     console.log('input req', req);
//     res.send('Hello World')
// })

app.post('/', function (req, res) {
    // console.log('input req post headers', req.headers);
    console.log('input req post body', req.body);

    let accsessStatus = true;
    if (req.body.cardid == 'db3e253c') {
        accsessStatus = false
    }

    const responceObject = {
        access: accsessStatus,
    };

    responce = JSON.stringify(responceObject)
    console.log(responce);

    res.send(responce);
})

app.use('/logs', express.static(sharedPath), serveIndex(sharedPath, {'icons': true, 'view': 'details'}));

app.post('/debug-log/', function (req, res) {
    // console.log('input req post headers', req.headers);
    console.log('debug-log input req post body', req.body);

    const logData = {
        timestamp: getDateTime(),
        data: req.body,
    };
    const jsonLogData = JSON.stringify(logData);

    fileLog(jsonLogData + ',');


    const responceObject = {
        ok: true,
    };
    responce = JSON.stringify(responceObject)

    res.send(responce);
})

app.listen(PORT);
console.log('server listening on port', PORT);
