/* ------------------------------- constantes ------------------------------- */
const express = require("express");
const { Router } = express;
const Contenedor = require("./contenedor");
const handlebars = require("express-handlebars");

/* ------------------------------- inicializar ------------------------------ */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error en el servidor!!!");
});

app.get("/", (req, res) => {
  let mensaje = `<h1>Desafio Backend</h1>
                    <h2>Plantillas</h2>
                    <ul>
                    <li>(GET) Productos Handlebars (<a href="http://localhost:8080/hbs/productos">/hbs/productos</a>)</li>
                    <li>(POST) Productos Handlebars (<a href="http://localhost:8080/hbs">/hbs</a><br><br></li>                    
                    <li>(GET) Productos Pug (<a href="http://localhost:8080/pug/productos">/pug/productos</a>)</li>
                    <li>(POST) Productos Pug (<a href="http://localhost:8080/pug">/pug</a><br><br></li>                    
                    <li>(GET) Productos Ejs (<a href="http://localhost:8080/ejs/productos">/ejs/productos</a>)</li>                                        
                    <li>(POST) Productos Ejs (<a href="http://localhost:8080/ejs">/ejs</a>)</li>                    
                    </ul>`;

  res.send(mensaje);
});


app.post("/productos", async (req, res) => {
  try {
    const { nombre, precio, imagen } = req.body;
    const contenedor = new Contenedor("./productos.txt");

    const id = await contenedor.save({
      nombre,
      precio,
      imagen,
    });

    if (id > 0) {
      res.json({ mensaje: `Se genero el id ${id}` });
    } else {
      res.json({ mensaje: "No se pudo generar el producto" });
    }
  } catch (error) {
    res.json(error);
  }
});

function setEjs() {
  app.set("view engine", "ejs");
  app.set("views", "ejs/views");
}

function setHbs() {
  app.engine(
    "hbs",
    handlebars.engine({
      extname: "hbs",
      defaultLayout: "index.hbs",
      layoutsDir: __dirname + "/hbs/views/layouts",
      partialsDir: __dirname + "/hbs/views/partials",
    })
  );

  app.set("view engine", "hbs");
  app.set("views", "./hbs/views");
}

function setPug() {
  app.set("view engine", "pug");
  app.set("views", "./pug/views");
}

const routerEjs = Router();

routerEjs.get("/productos", async (req, res) => {
  try {
    setEjs();

    const contenedor = new Contenedor("./productos.txt");
    const productos = await contenedor.getAll();
    if (productos) {
      res.render("pages/index", { productos });
    } else {
      res.json({ mensaje: "Sin productos" });
    }
  } catch (error) {
    res.json({ error });
  }
});

routerEjs.get("/", async (req, res) => {
  try {
    setEjs();
    res.render("pages/ingresar", {});
  } catch (error) {
    res.json({ error });
  }
});

routerEjs.post("/productos", async (req, res) => {
  try {
    const { nombre, precio, imagen } = req.body;
    const contenedor = new Contenedor("./productos.txt");

    const id = await contenedor.save({
      nombre,
      precio,
      imagen,
    });

    if (id > 0) {
      res.json({ mensaje: `Se genero el id ${id}` });
    } else {
      res.json({ mensaje: "No se pudo generar el producto" });
    }
  } catch (error) {
    res.json(error);
  }
});

app.use("/ejs", routerEjs);

const routerHbs = Router();

routerHbs.get("/productos", async (req, res) => {
  try {
    setHbs();

    const contenedor = new Contenedor("./productos.txt");
    const productos = await contenedor.getAll();
    if (productos) {
      res.render("pages/main", { productos });
    } else {
      res.json({ mensaje: "Sin productos" });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

routerHbs.get("/", async (req, res) => {
  try {
    setHbs();
    res.render("pages/ingresar", {});
  } catch (error) {
    res.json({ error });
  }
});

routerHbs.post("/productos", async (req, res) => {
  try {
    const { nombre, precio, imagen } = req.body;
    const contenedor = new Contenedor("./productos.txt");

    const id = await contenedor.save({
      nombre,
      precio,
      imagen,
    });

    if (id > 0) {
      res.json({ mensaje: `Se genero el id ${id}` });
    } else {
      res.json({ mensaje: "No se pudo generar el producto" });
    }
  } catch (error) {
    res.json(error);
  }
});

app.use("/hbs", routerHbs);

const routerPug = Router();

routerPug.get("/productos", async (req, res) => {
  try {
    setPug();

    const contenedor = new Contenedor("./productos.txt");
    const productos = await contenedor.getAll();
    if (productos) {
      res.render("pages/index", { productos });
    } else {
      res.json({ mensaje: "Sin productos" });
    }
  } catch (error) {
    res.json({ error });
  }
});

routerPug.get("/", async (req, res) => {
  try {
    setPug();
    res.render("pages/ingresar", {});
  } catch (error) {
    res.json({ error });
  }
});

routerPug.post("/productos", async (req, res) => {
  try {
    const { nombre, precio, imagen } = req.body;
    const contenedor = new Contenedor("./productos.txt");

    const id = await contenedor.save({
      nombre,
      precio,
      imagen,
    });

    if (id > 0) {
      res.json({ mensaje: `Se genero el id ${id}` });
    } else {
      res.json({ mensaje: "No se pudo generar el producto" });
    }
  } catch (error) {
    res.json(error);
  }
});

app.use("/pug", routerPug);

/* -------------------------------------------------------------------------- */
/*                                   server                                   */
/* -------------------------------------------------------------------------- */
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${server.address().port}`);
});
