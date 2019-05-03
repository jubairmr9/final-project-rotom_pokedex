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

app.get("/select",function (req,res) {
    var id = req.param('id');
    var sql = "call Pokedex.pokeInfo("+id+")";
    var result =DBF.query(mysql.format(sql));

    result.then(function (info, error) {
        res.send(info);
    })
})

app.listen(port);