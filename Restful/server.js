/* ------------------------------- constantes ------------------------------- */
const express = require("express");
const { Router } = express;
const Contenedor = require("./contenedor");

/* ------------------------------- inicializar ------------------------------ */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error en el servidor!!!");
});

app.get("/", (req, res) => {
  let mensaje = `<h1>Desafio Backend</h1>
                    <h2>Restful</h2>
                    <ul>
                    <li>(GET) Productos (<a href="http://localhost:8080/api/productos">/api/productos</a>)</li>
                    <li>(GET por ID) Producto (<a href="http://localhost:8080/api/productos/1">/api/productos/1</a>)</li>                    
                    <li>(POST) Productos (<a href="http://localhost:8080/static">/static</a>)</li>
                    <li>(DELETE por ID) Producto - Ejemplo usado en REST Client <br><br> <span style="color: red;">
                    DELETE http://localhost:8080/api/productos/1 HTTP/1.1</span></li><br>
                    <li>(PUT) Producto - Ejemplo usado en REST Client <br><br> <span style="color: green;">
                    PUT http://localhost:8080/api/productos/1 HTTP/1.1<br>
                    content-type: application/json
                 <br><br>
                 {<br>
                             "nombre": "Manzana",<br>
                             "presentacion": "kilo",<br>
                             "precio": 22,<br>
                             "stock": 142,<br>
                             "categoria": "frutas"<br>
                             }</span></li>
                    </ul>`;

  res.send(mensaje);
});

/* -------------------------------------------------------------------------- */
/*                              router Productos                              */
/* -------------------------------------------------------------------------- */
const routerProductos = Router();

routerProductos.get("/", async (req, res) => {
  try {
    const contenedor = new Contenedor("./productos.txt");
    const productos = await contenedor.getAll();
    if (productos) {
      res.json(productos);
    } else {
      res.json({ mensaje: "Sin productos" });
    }
  } catch (error) {
    res.json({ error });
  }
});

routerProductos.get("/:id", async (req, res) => {
  try {
    const contenedor = new Contenedor("./productos.txt");
    const { id } = req.params;

    const producto = await contenedor.getById(parseInt(id));
    producto
      ? res.json(producto)
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    res.json({ error });
  }
});

routerProductos.post("/", async (req, res) => {
  try {
    const { nombre, categoria, presentacion, stock, precio } = req.body;
    const contenedor = new Contenedor("./productos.txt");

    const id = await contenedor.save({
      nombre,
      presentacion,
      stock: Number(stock),
      precio: Number(precio),
      categoria,
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

routerProductos.put("/:id", async (req, res) => {
  try {
    const contenedor = new Contenedor("./productos.txt");
    const { id } = req.params;
    const item = req.body;

    const retorno = await contenedor.updateById(parseInt(id), item);
    retorno
      ? res.json({ mensaje: "El producto se actualizo con exito" })
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    res.json(error);
  }
});

routerProductos.delete("/:id", async (req, res) => {
  try {
    const contenedor = new Contenedor("./productos.txt");
    const { id } = req.params;

    const retorno = await contenedor.delete(parseInt(id));
    retorno
      ? res.json({ mensaje: "El producto se borro con exito" })
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    res.json(error);
  }
});

app.use("/api/productos", routerProductos);

/* -------------------------------------------------------------------------- */
/*                                   server                                   */
/* -------------------------------------------------------------------------- */
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${server.address().port}`);
});
