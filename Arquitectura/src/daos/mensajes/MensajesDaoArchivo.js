const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");

class MensajesDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("./../arquitectura/src/persistencias/archivos/mensajes.txt");
    }
}

module.exports = MensajesDaoArchivo;


