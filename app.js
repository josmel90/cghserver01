
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
//mongoose.connect('mongodb://172.16.21.70:27017/data');
mongoose.connect('mongodb://data:Josmell.2015@ds157459.mlab.com:57459/heroku_5tp70h1l');
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

var server =http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
}); 

app.get('/', function(req, res){ 
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

var Usuario = require('./models/usuarios');
var Success = require('./models/success');
app.get('/usuario', function(req, res){
   
   Usuario.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.post('/usuario', function(req, res){
  var idSocial   = req.body.id_social;
  var tipoSocial = req.body.tipo_social;
  var usuario    = req.body.usuario;
  var contrasenia= req.body.contrasenia;
  var dni        = req.body.dni;
  var celular    = req.body.celular;
  var email      = req.body.email;
  var genero     = req.body.genero;
  var nombre     = req.body.nombre; 
  var apellido   = req.body.apellido; 
  var fechaNacimiento  = req.body.fecha_nacimiento; 
  var foto       = req.body.foto; 
  var codigoTrabajador = req.body.codigo_trabajador; 
  var fechaRegistro    = req.body.fecha_registro; 
  var estado     = req.body.estado;  
  var usuarioNew = new Usuario({  
  	id_social:idSocial,
	tipo_social:tipoSocial,
	usuario: usuario,
	contrasenia:contrasenia, 
  dni:dni, 
  celular:celular, 
	email:email, 
	genero:genero,
	nombre:nombre,
	apellido:apellido,
	fecha_nacimiento:fechaNacimiento,
	foto:foto,
	codigo_trabajador:codigoTrabajador, 
	estado:estado  
  });
  usuarioNew.save(function(err) {
	  if (err) throw err;
	  Success = new Success({  result:'true' });
  	  res.json(Success);
  }); 
 
});