var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var morgan = require("morgan");

var app = express();
var port = process.env.port || 7777;
var srcpath  =path.join(__dirname,'/public') ;
app.use(express.static('public'));
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));

// Pagina padrao index.html
app.get("*",function(req,res){
    res.sendFile(srcpath +'/index.html');
})

//Server Starta na porta Definida
app.listen(port,function(){
    console.log("Servidor iniciado na porta: "+ port);
    console.log("Acesse http://localhost:"+port);
})
