const { persistenciaGetAll, persistenciaSave } = require("../persistencias/productos.persistencia");

const generarFechaHora = ()=>{
    const fecha = new Date();
    const fechaStr =
    ("00" +  fecha.getDate()).slice(-2) + "/" +
    ("00" + (fecha.getMonth() + 1)).slice(-2) + "/" +
    fecha.getFullYear() + " " +
    ("00" + fecha.getHours()).slice(-2) + ":" +
    ("00" + fecha.getMinutes()).slice(-2) + ":" +
    ("00" + fecha.getSeconds()).slice(-2);
  
    return fechaStr;
  }

async function productosGetAll(){
    return await persistenciaGetAll();
}

async function productosSave(obj){
    return await persistenciaSave(obj);
}

module.exports = {
    productosGetAll,
    productosSave
}