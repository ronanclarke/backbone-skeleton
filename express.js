var express = require("express");
var path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();


app.use(express.static('public'));

app.get('*', function (req, res) {

    if (req.query.prod)
        res.sendFile(path.join(__dirname + '/index.dist.html'));
    else
        res.sendFile(path.join(__dirname + '/index.dev.html'));
});


var port = 3000;
app.listen(port);
console.log("Listening on ",port, '...')