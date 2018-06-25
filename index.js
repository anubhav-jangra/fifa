var express = require('express'),
    app     = express();

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/links'));
app.use(express.static(__dirname +  '/css'));
app.use(express.static(__dirname +  '/js'));

app.get('/', function(req, res) {
    res.sendFile(index.html);
});

app.listen(8080, function() {
    console.log("Localhost running.....Port 8080");
});
