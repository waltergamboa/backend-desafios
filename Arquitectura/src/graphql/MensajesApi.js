const { mensajesGetAll, mensajesSave } = require("../negocio/mensajes.negocio");

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

class MensajesApi{
    constructor(){
    }

    async getMensajes(){
        const datos = await mensajesGetAll();
        return datos;
    }

    async saveMensaje({datos}){
        const retorno = await mensajesSave(datos);
        return {id: retorno};
    }

 }

module.exports = { MensajesApi }
