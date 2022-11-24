let MensajesDao;

const opcion = process.env.FACTORY || "archivo"

switch(opcion){
    case "archivo":
        const MensajesDaoArchivo = require("../../daos/mensajes/MensajesDaoArchivo");
        mensajesDao = new MensajesDaoArchivo();
        break;
    case "mongodb":
        const MensajesDaoMongoDB = require("../../daos/mensajes/MensajesDaoMongoDB");
        mensajesDao = new MensajesDaoMongoDB();
        break;
    default:
        break;

}

module.exports = { mensajesDao }