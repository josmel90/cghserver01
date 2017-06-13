var mongoose = require('mongoose');
var Platos = mongoose.model('Platos', 
                { 
                 id_plato:String,
                 id_usuario:String,
                 ensalada:String,
 		 segundo: String,
                 sopa:String,
                 refresco:String,
                 postre:String,  
                 fecha_plato:String,
                 cant_vendido:String,
                 dia:String,
                 gusta:String,
                 no_gusta:String, 
                 img:String, 
                 estado:String 
                }); 
module.exports = Platos;


