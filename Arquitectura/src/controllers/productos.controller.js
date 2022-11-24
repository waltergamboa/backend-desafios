const { productosGetAll, productosSave } = require("../negocio/productos.negocio");

async function getProductos(req, res){
    const datos = await productosGetAll();
    res.json(datos)
}

async function postProductos(req, res){
    const { nombre, precio, imagen } = req.body;
    const obj = {
        nombre,
        precio,
        imagen
    }
    const resp = await productosSave(obj);
    res.json(resp)
}

module.exports = {
    getProductos,
    postProductos
}
