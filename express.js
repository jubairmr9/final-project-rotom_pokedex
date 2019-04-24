promise = require('bluebird');
mysql = require('mysql');
DBF = require('./dbf-setup.js');

var express=require('express'),
    app = express(),
    port = process.env.PORT || 1337;


app.use(express.static(__dirname + '/public'));
app.get("/pokemon",function(req,res){
    var sql = 'SELECT * FROM Pokedex.pokemon';
    var result = DBF.query(mysql.format(sql));

    //Use the .then stuff to make everything better
    result.then(function(result, error) {
        res.send(result);
    })

});

app.listen(port);