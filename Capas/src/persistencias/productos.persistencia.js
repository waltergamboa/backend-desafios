const Contenedor = require("./archivos/contenedor");
const contenedor = new Contenedor("./src/persistencias/archivos/productos.txt");

async function persistenciaGetAll(){
    try {
        const mensajes = await contenedor.getAll();
        return mensajes;    
    } catch (error) {
        console.log(error);        
    }
}

async function persistenciaSave(obj){
    try {
        const id = await contenedor.save(obj);
        return id;
    } catch (error) {
        console.log(error);        
    }
}

module.exports = {
    persistenciaGetAll,
    persistenciaSave
}