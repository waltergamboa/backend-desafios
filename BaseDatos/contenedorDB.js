class ContenedorDB{
    constructor(nombreTabla, opcionesConectar){
        this.nombreTabla = nombreTabla;
        this.opcionesConectar = opcionesConectar;
        this.knex = require("knex")(this.opcionesConectar);
    }

    async getAll(){
        try {
            let rows = await this.knex(this.nombreTabla).select("*");
            return rows;
        } catch (error) {
            console.log("Error al buscar los datos", error);
            return [];
        } finally{this.knex.destroy()}
    }

    async insert(obj){
        try {
            await this.knex(this.nombreTabla).insert(obj);
        } catch (error) {
            console.log("Error al insertar los datos", error);
        } finally{this.knex.destroy()}
    }

}

module.exports = ContenedorDB;