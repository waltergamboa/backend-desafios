const mongoose = require("mongoose");

class ContenedorMongoDB{
    constructor(coleccion, esquema){
        this.coleccion = coleccion;
        this.esquema = esquema;
        this.model = mongoose.model(this.coleccion, this.esquema);
        this.connectDB();
    }

    async connectDB(){
        try {
            const url = process.env.MONGO_DB
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            console.log("MongoDB conectada")
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){
        try {
            let documents = await this.model.find();
            return documents;
        } catch (error) {
            console.log("Error al buscar los datos", error);
            return [];
        } 
    }

    async getById(id){
        try {
            let document = await this.model.findById(id);
            return document;
        } catch (error) {
            console.log("Error al buscar los datos", error);
            return null;
        } 
    }

    async save(document){
        try {
            let documents = await this.model(document).save();
            return documents;
        } catch (error) {
            console.log("Error al insertar los datos", error);
            return null;
        } 
    }

    async updateById(id, document){
        try {
            let documents = await this.model.findByIdAndUpdate(id, document);
            return documents;
        } catch (error) {
            console.log("Error al insertar los datos", error);
            return null;
        } 
    }

    async deleteById(id){
        try {
            let documents = await this.model.findByIdAndDelete(id);
            return documents;
        } catch (error) {
            console.log("Error al buscar los datos", error);
            return null;
        } 
    }    
}

module.exports = ContenedorMongoDB;