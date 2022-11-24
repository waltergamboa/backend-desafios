const express = require("express");
const { Router } = express;
const { getProductos, postProductos } = require("../controllers/productos.controller");

const getTimestamp = ()=>{
  return Date.now();
}

/* -------------------------------------------------------------------------- */
/*                              router Productos                              */
/* -------------------------------------------------------------------------- */
const routerProductos = Router();

routerProductos.get('/', getProductos)
routerProductos.post('/', postProductos)



module.exports  = routerProductos;



