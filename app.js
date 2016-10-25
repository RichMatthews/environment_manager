var express = require('express');
var app = express();
var fetch = require('isomorphic-fetch');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendfile('./index.html');
});


app.listen(process.env.PORT || 8080);
