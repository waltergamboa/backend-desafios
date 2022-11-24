const ContenedorMongoDB = require("../../contenedores/ContenedorMongoDB");

class MensajesDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super("mensajes", {
          author: {
            nombre: {
              type: String,
              require: true,
              trim: true,
              max: 50,
            },
            apellido: {
              type: String,
              require: true,
              trim: true,
              max: 50,
            },
            edad: {
              type: Number,
              require: true,
            },            
            alias: {
              type: String,
              require: true,
              trim: true,
              max: 50,
            },
            avatar: {
              type: String,
              require: true,
              trim: true,
              max: 50,
            }               
          },
          text: {
            type: String,
            require: true,
            trim: true,
            max: 150,
          }
        });
    }
}

module.exports = MensajesDaoMongoDB;
