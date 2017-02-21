
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
mongoose.connect('mongodb://172.16.21.70:27017/data');
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open ');
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error' );
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});
// all environmentss
app.set('port', process.env.PORT ||80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
  //res.render('layout.jade');
  res.writeHead(400,{'content-type':'text/html'});
  res.write('<!doctype html><html><head><meta charset="utf-8"><title>CGH-BACKEND</title><style>'+
  	        'body{background:#2f2f2f;background:-moz-radial-gradient(center,ellipse cover,#2f2f2f 0%,#1b1b1b 100%);'+
  	        'background:-webkit-gradient(radial,center center,0px,center center,100%,color-stop(0%,#2f2f2f),color-stop(100%,#1b1b1b));'+
  	        'background:-webkit-radial-gradient(center,ellipse cover,#2f2f2f 0%,#1b1b1b 100%);background:-o-radial-gradient(center,ellipse cover,#2f2f2f 0%,#1b1b1b 100%);'+
  	        'background:-ms-radial-gradient(center,ellipse cover,#2f2f2f 0%,#1b1b1b 100%);background:radial-gradient(ellipse at center,#2f2f2f 0%,#1b1b1b 100%);'+
  	        'filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#2f2f2f",endColorstr="#1b1b1b",GradientType=1);background-repeat:no-repeat;'+
  	        'background-size:cover;background-attachment:fixed}</style></head><body><center><div style="height:150px;"></div>'+
  	        '<div style="height:200px;"></div></div></center></body></html>');
  res.end();
});


var server =http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
}); 

var Usuario = mongoose.model('Usuario', 
                { 
 		 		 usuario: String,
                 contrasenia:String, 
                 email:String 
                });

app.get('/usuario/getUsuario', function(req, res){
   
   Usuario.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.post('/usuario/addUsuario', function(req, res){
  var userName = req.body.nombre;
  var userPass = req.body.contrasenia;
  var userEmail = req.body.email;
  var usuarioNew = new Usuario({  usuario: userName,  contrasenia: userPass,  email: userEmail  });
  usuarioNew.save(function(err) {

	  if (err) throw err;
		  console.log('User saved successfully!');
  });
  res.write('<!doctype html><html><head><meta charset="utf-8"><title>CGH-BACKEND</title></head><body>'+
  	        'new usuarios :'+userName+
  	        '</body></html>');
  res.end();
});