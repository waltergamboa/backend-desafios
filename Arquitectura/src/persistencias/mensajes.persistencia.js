// const Contenedor = require("./archivos/contenedor");
// const contenedor = new Contenedor("./src/persistencias/archivos/mensajes.txt");

const { mensajesDao } = require("../factory/mensajes")


async function persistenciaGetAll(){
    try {
        const mensajes = await mensajesDao.getAll();
        return mensajes;    
    } catch (error) {
        console.log(error);        
    }
}

async function persistenciaSave(obj){
    try {
        const id = await mensajesDao.save(obj);
        return id;
    } catch (error) {
        console.log(error);        
    }
}

module.exports = {
    persistenciaGetAll,
    persistenciaSave
}