//const Contenedor = require("./archivos/contenedor");
//const contenedor = new Contenedor("./src/persistencias/archivos/productos.txt");

const { productosDao } = require("../factory/productos")

async function persistenciaGetAll(){
    try {
        const mensajes = await productosDao.getAll();
        return mensajes;    
    } catch (error) {
        console.log(error);        
    }
}

async function persistenciaSave(obj){
    try {
        const id = await productosDao.save(obj);
        return id;
    } catch (error) {
        console.log(error);        
    }
}

module.exports = {
    persistenciaGetAll,
    persistenciaSave
}