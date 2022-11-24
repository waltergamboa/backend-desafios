let productosDao;

const opcion = process.env.FACTORY || "archivo"

switch(opcion){
    case "archivo":
        const ProductosDaoArchivo = require("../../daos/productos/ProductosDaoArchivo");
        productosDao = new ProductosDaoArchivo();
        break;
    case "mongodb":
        const ProductosDaoMongoDB = require("../../daos/productos/ProductosDaoMongoDB");
        productosDao = new ProductosDaoMongoDB();
        break;
    default:
        break;

}

module.exports = { productosDao }