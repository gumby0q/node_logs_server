const express = require('express')
const app = express()
const fs = require('fs');
const util = require('util');

app.use(express.json());


function file_log (d) { //
  log_file.write(util.format(d) + '\n');
};

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

const log_file = fs.createWriteStream(__dirname + `/logs/debug_${getDateTime()}.log`, {flags : 'w'});


// app.get('/', function (req, res) {
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


app.post('/debug-log/', function (req, res) {
    // console.log('input req post headers', req.headers);
    console.log('debug-log input req post body', req.body);

    const logData = {
        timestamp: getDateTime(),
        data: req.body,
    };
    const jsonLogData = JSON.stringify(logData);

    file_log(jsonLogData + ',');


    const responceObject = {
        ok: true,
    };
    responce = JSON.stringify(responceObject)

    res.send(responce);
})

app.listen(3000);