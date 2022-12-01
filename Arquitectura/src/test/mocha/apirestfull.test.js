//import app from '../src/server.js'
// import { expect } from 'chai'
// import { generar } from './generador/mensajes.js'
// import mongoose from 'mongoose'
// import supertest from 'supertest'

const app = require("../../../server.js");
const { expect } = require("chai");
const { generar } = require("./generador/mensajes.js");
const mongoose = require("mongoose");
const supertest = require("supertest");


let request
let server

describe('test api rest full', () => {

    before(async function () {
        await connectDb()
        server = await startServer()
        request = supertest(`http://localhost:${server.address().port}/api/mensajes`)
    })

    after(function () {
        mongoose.disconnect()
        server.close()
    })

    describe('GET', () => {
        it('debería retornar un status 200', async () => {
            const response = await request.get('/')
            expect(response.status).to.eql(200)
        })
    })

    describe('POST', () => {
        it('debería incorporar un mensaje', async () => {
            const mensaje = generar()
            console.log('Console.log mensaje para prueba',mensaje)
            const response = await request.post('/').send(mensaje)
            expect(response.status).to.eql(200)

            //  const user = response.body
            //  console.log("aca")
            //  console.log(user)
            //  expect(user).to.include.keys('author', 'text')
            //  expect(user.author).to.eql(mensaje.author)
           //  expect(user.text).to.eql(mensaje.text)
        })
    })
})

async function connectDb() {
    try {
        await mongoose.connect('mongodb+srv://wgamboa:wgamboa1@cluster0.jqgfgcs.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Base de datos conectada!');
    } catch (error) {
        throw new Error(`Error de conexión en la base de datos: ${err}`)
    }
}

async function startServer() {
    return new Promise((resolve, reject) => {
        const PORT = 0
        const server = app.listen(PORT, () => {
            console.log(`Servidor express escuchando en el puerto ${server.address().port}`);
            resolve(server)
        });
        server.on('error', error => {
            console.log(`Error en Servidor: ${error}`)
            reject(error)
        });
    })
}