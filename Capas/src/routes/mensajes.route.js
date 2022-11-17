const express = require("express");
const { Router } = express;
const { getMensajes, postMensajes } = require("../controllers/mensajes.controller");

const routerMensajes = Router();


routerMensajes.get('/', getMensajes)
routerMensajes.post('/', postMensajes)


module.exports  = routerMensajes;

