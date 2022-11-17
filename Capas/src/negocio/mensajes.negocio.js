const { persistenciaGetAll, persistenciaSave } = require("../persistencias/mensajes.persistencia");

async function mensajesGetAll(){
    return await persistenciaGetAll();
}

async function mensajesSave(obj){
    return await persistenciaSave(obj);
}

module.exports = {
    mensajesGetAll,
    mensajesSave
}
