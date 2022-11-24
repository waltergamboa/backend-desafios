const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super("productos", {
          nombre: {
            type: String,
            require: true,
            trim: true,
            max: 50,
          },
          precio: {
            type: Number,
            require: true,
          },
          imagen: {
            type: String,
            require: true,
            trim: true,
            max: 250,
          }
        });
    }
}

module.exports = ProductosDaoMongoDB;