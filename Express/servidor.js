const express = require("express");
const Contenedor = require("./contenedor");

const contenedor = new Contenedor("./productos.txt")
const app = express();

app.get("/", (req, res)=>{
    let mensaje = `<h1>Desafio Backend</h1>
                    <h2>Servidor Express</h2>
                    <ul>
                    <li>Productos (<a href="http://localhost:8080/productos">/productos</a>)</li>
                    <li>Producto Aleatoreo (<a href="http://localhost:8080/productoRandom">/productoRandom</a>)</li>
                    </ul>`

    res.send(mensaje);
})


app.get("/productos", async (req, res)=>{
   const todosproductos = await contenedor.getAll()
                                .then(res => res)

    res.send(todosproductos);
})


app.get("/productoRandom", async (req, res)=>{
    const cantidadItems = await contenedor.cantidadItems()
                            .then(data => data);

    Math.random();
    const element = Math.ceil(Math.random() * cantidadItems);

    const producto = await contenedor.getById(element)
    .then(data => data);

    res.send(producto);
})


const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`);
})

server.on("error", err => console.log(err));
