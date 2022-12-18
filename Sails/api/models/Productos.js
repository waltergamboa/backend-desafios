/**
 * Productos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    descripcion: {type: "string", required: true},
    precio: {type: "number", required: true},
    categoria: {type: "string", required: true}
  }

};

