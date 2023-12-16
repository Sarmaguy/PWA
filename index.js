var express = require('express');
var app = express();

// Serve static files from the current directory
app.use(express.static(__dirname));

// Send the index.html file for any other requests
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(function(req, res, next) {
    res.status(404).sendFile(__dirname + '/404.html');
});

app.listen(8080, function () {
    console.log('Simple Web Application running on port 8080!');
});
