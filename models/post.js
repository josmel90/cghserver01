var mongoose = require('mongoose');
var Post = mongoose.model('Post', 
                { 
                 _id_usuario:String,
                 tv_titulo_post:String,
 		 tv_fecha_post: String,
                 tv_detalle_post:String,
                 cant_goods:String,
                 cant_post_comentarios:String,  
                 fecha_registro:{ type: Date, default: Date.now },
                 img_url:String,
                 img_url_usuario:String,
                 estado:String 
                }); 
module.exports = Post;