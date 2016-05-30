var express = require("express");
var path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();


app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get("/partials/:partialPath",function(req,res){
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../app/index.html'));
});


var port = 3000;
app.listen(port);
console.log("Listening on ",port, '...')