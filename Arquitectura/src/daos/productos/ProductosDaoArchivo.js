const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("./../arquitectura/src/persistencias/archivos/productos.txt");
    }
}

module.exports = ProductosDaoArchivo;


