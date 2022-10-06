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
// cokkie parser
const cookieParser = require("cookie-parser");
// session
const session = require("express-session");
// mongo
const MongoStore = require("connect-mongo");
// auth
const authMiddleware = require("./src/middlewares/auth/auth.middleware");


const mongoConfig = {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}


// base
require("dotenv").config();
// 
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");


const Usuarios = require("./models/usuarios.model");
const connectDB = require("./mongoDB/connection");

// nuevo



/* ------------------------------- inicializar ------------------------------ */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("views", __dirname + "/public/views");
app.set("view engine", "ejs");


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


connectDB();

// session
app.use(session({
  secret: "secret",
  cokkie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7
  },
  rolling: true,
  resave: true,
  saveUninitialized: false
})) 

app.use(passport.initialize())
app.use(passport.session())
// session


// utils
const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
}

const createHash = (password)=>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

const checkAuth = (req, res, next)=>{
  if (req.isAuthenticated()){
      next()
  }else{
      res.redirect("/login")
  }
}



// midelware
passport.use("login", new LocalStrategy(
  async (username, password, done)=>{
     
     let user = await Usuarios.findOne({name: username});

      if (!user){
          return done(null, false, {message: "User not found"});
      }

        if (!isValidPassword(user, password)){
            return done(null, false, {message: "Password incorrect"});
        }


      done(null, user)
  }
))

passport.use("signup", new LocalStrategy({
  passReqToCallback: true
}, async (req, username, password, done)=>{
  
  const registro = await Usuarios.findOne({name: username});
  const { name, email } = req.body;
  if(registro){
      return done(null, false, {message: "Usuario ya existe"})
  }

   let usuario = new Usuarios({
         name: username,
         email: email,
         password: createHash(password)
     });
     await usuario.save();


  return done(null, usuario.id);

}))


passport.serializeUser((user, done) => {
  done(null, user.id);
})


passport.deserializeUser(async (id, done) => {
  

let  user = await Usuarios.findById(id);
  done(null, user);
})


// check
app.get("/", checkAuth, (req, res)=>{
  res.render("pages/ingresar", {nombre: req.user.name});
})


// login
app.get('/login', (req, res) => {
  res.render('login')
})

app.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/error_login"
}),(req, res)=>{
  const { username, password } = req.body;
  const { user } = req.user;
  res.render("pages/ingresar", {nombre: req.user.name});
})


// signup
app.get('/signup', (req, res) => {
  res.render('signup')
})

app.post("/signup", passport.authorize("signup",{
  successRedirect: "/login",
  failureRedirect: "/error_signup"
}), (req, res)=>{
  res.render("login");
})


// logout
app.post('/logout', (req, res, next) => {
  req.logout((err) => {
      if (err) { return next(err) }
      res.redirect('/login')
  })
})

// error
app.get('/error_login', (req, res) => {
  res.render('error_login')
})

app.get('/error_signup', (req, res) => {
  res.render('error_registrar')
})


/* -------------------------------------------------------------------------- */
/*                                   server                                   */
/* -------------------------------------------------------------------------- */
const PORT = process.env.PORT || 8080;
const server = HttpServer.listen(PORT, () => {
  console.log(`Escuchando en puerto ${server.address().port}`);
});
