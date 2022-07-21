const Contenedor = require("./contenedor");

const contenedor = new Contenedor("./productos.txt")


/* ---------------------------------- test ---------------------------------- */
contenedor.save({nombre: "Manzana", presentacion: "x kilo", cantidad: 1, precio: 12, categoria: "frutas"});


 //const productos = contenedor.getAll();
 //console.log(productos);


 //const producto = contenedor.getById(1);
 //console.log(producto);

 
 //const mensaje = contenedor.delete(1);

 
 //const mensajeTodos = contenedor.deleteAll();


















