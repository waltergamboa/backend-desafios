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

async function getMensajes(req, res){
    const datos = await mensajesGetAll();
    res.json(datos)
}

async function postMensajes(req, res){
    const { id, nombre, apellido, edad, alias, avatar } = req.body.author;
    const { text } = req.body;

    const obj = {
        author: {
            id: id, 
            nombre: nombre, 
            apellido: apellido, 
            edad: edad, 
            alias: alias,
            avatar: avatar
        },
        text: text,
        fechahora: generarFechaHora()
    }
    const resp = await mensajesSave(obj);
    res.json(resp)
}

module.exports = {
    getMensajes,
    postMensajes
}
