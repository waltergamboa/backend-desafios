const { options } = require("./DBConexion/mariaDB/conexionDB");
const knex = require("knex")(options);

knex.schema.createTable("productos", table => {
    table.increments("id");
    table.string("nombre");
    table.integer("precio");
    table.string("imagen");
})
.then(()=>console.log("tabla creada"))
.catch((err)=>{console.log(err); throw err})
.finally(()=>knex.destroy())





