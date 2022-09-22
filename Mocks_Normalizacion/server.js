/* ------------------------------- constantes ------------------------------- */
const express = require("express");
const { Router } = express;
const Contenedor = require("./contenedor");
const { Server: ServerHttp } = require("http");
const { Server: ServerIo } = require("socket.io");
// faker
const { faker } = require("@faker-js/faker");
faker.locale = 'es'
// normalize
const normalizr = require("normalizr");
const { normalize, denormalize, schema } = normalizr;
const util = require("util");

/* ------------------------------- inicializar ------------------------------ */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.set("views", "./public/views");

const HttpServer = new ServerHttp(app);
const io = new ServerIo(HttpServer);

const print = (obj)=>{
  console.log(util.inspect(obj, false, 12, true));
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error en el servidor!!!");
});

const getProducts = ()=>{
  //const contenedor = new Contenedor("./productos.txt");
  //const productos = await contenedor.getAll();

  let productos = [];
  let obj;
  for (let i = 0; i < 10; i++) {
    obj = {nombre: faker.animal.cat(), precio: faker.finance.amount(), imagen: faker.image.cats(640, 480, true) }
    productos.push(obj);
  }

  if (productos){
    return productos;
  }else{
    return [];
  }
}

const getMessages = async ()=>{
  const contenedor = new Contenedor("./mensajes.txt");
  const mensajes = await contenedor.getAll();


  // normalizacion
  const authorSchema = new schema.Entity('author', {}, {idAttribute: "id"});
  const commentSchema = new schema.Entity('text');
  const postSchema =[{
      author: authorSchema,
      text: commentSchema
  }]

  const normalizedMensajes = normalize(mensajes, postSchema)
  // sin normalizar
  console.log("Sin normalizar", JSON.stringify(mensajes).length)
  // normalizado
  console.log("Normalizado", JSON.stringify(normalizedMensajes).length)

  if (normalizedMensajes){
    return normalizedMensajes;
  }else{
    return [];
  }
}

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


io.on("connection", async (socket) => {
  socket.emit("mensaje-productos", getProducts());

  socket.emit("mensaje-chat", await getMessages().then((data)=>data));

  socket.on("producto-nuevo", async (producto)=>{
    const contenedor = new Contenedor("./productos.txt");
    const { nombre, precio, imagen } = producto;
    const id = await contenedor.save({
      nombre,
      precio,
      imagen,
    });
    io.sockets.emit("mensaje-productos",  getProducts())
  })

  socket.on("chat-nuevo", async (chat)=>{
    const contenedor = new Contenedor("./mensajes.txt");
    const { mail, nombre, apellido, edad, alias, avatar, mensaje } = chat;

    const obj = {
        author: {
            id: mail, 
            nombre: nombre, 
            apellido: apellido, 
            edad: edad, 
            alias: alias,
            avatar: avatar
        },
        text: mensaje,
        fechahora: generarFechaHora()
    }

    const id = await contenedor.save(obj);
    io.sockets.emit("mensaje-chat", await getMessages().then((data)=>data));
  })
});


app.get("/", async (req, res) => {
  try {
    res.render("pages/ingresar", {});
  } catch (error) {
    res.json({ error });
  }
});


/* -------------------------------------------------------------------------- */
/*                                   server                                   */
/* -------------------------------------------------------------------------- */
const PORT = process.env.PORT || 8080;
const server = HttpServer.listen(PORT, () => {
  console.log(`Escuchando en puerto ${server.address().port}`);
});
