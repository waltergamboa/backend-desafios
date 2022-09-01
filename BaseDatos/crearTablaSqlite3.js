const { options } = require("./DBConexion/sqlite3/conexionDB");
const knex = require("knex")(options);
knex.schema.createTable("mensajes", table => {
    table.increments("id");
    table.string("mail");
    table.string("fechahora");
    table.string("mensaje");
})
.then(()=>console.log("table created"))
.catch((err)=>{console.log(err); throw err})
.finally(()=>knex.destroy())
