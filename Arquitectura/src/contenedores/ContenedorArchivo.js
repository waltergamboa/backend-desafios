const fs = require("fs");

class ContenedorArchivo {
  constructor(ubicacion) {
    this.ubicacion = ubicacion;
    this.proximoId = 1;
  }

  async stringToObj() {
    try {
      let dataArch = await fs.promises
        .readFile(this.ubicacion, "utf-8")
        .then((data) => data);
      let dataArchParse = JSON.parse(dataArch);

      if (dataArchParse.length) {
        let proximoId = dataArchParse[dataArchParse.length - 1].id + 1;

        this.proximoId = proximoId;
      } else {
        this.proximoId = 1;
      }

      return dataArchParse;
    } catch (error) {
      console.log(error);
    }
  }

  aaastringToObj() {
    try {
      let dataArch = fs.readFileSync(this.ubicacion, "utf-8");
      let dataArchParse = JSON.parse(dataArch);

      if (dataArchParse.length) {
        let proximoId = dataArchParse[dataArchParse.length - 1].id + 1;

        this.proximoId = proximoId;
      } else {
        this.proximoId = 1;
      }

      return dataArchParse;
    } catch (error) {
      console.log(error);
    }
  }

  async save(obj) {
    try {
      //  let dataArch = await fs.promises.readFile(this.ubicacion, "utf-8");
      //  let dataArchParse = JSON.parse(dataArch); //dataArchParse[dataArchParse.length-1] -> ultimo elemento y +1 tengo el id para usar

      let dataArchParse = await this.stringToObj().then((data) => data);
      if (dataArchParse.length) {
        await fs.promises.writeFile(
          this.ubicacion,
          JSON.stringify(
            [...dataArchParse, { ...obj, id: this.proximoId }],
            null,
            2
          )
        );
      } else {
        await fs.promises.writeFile(
          this.ubicacion,
          JSON.stringify([{ ...obj, id: this.proximoId }], null, 2)
        );
      }
      return this.proximoId;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      // let dataArch = await fs.promises.readFile(this.ubicacion, "utf-8");
      // let dataArchParse = JSON.parse(dataArch);
      let dataArchParse = await this.stringToObj().then((data) => data);

      let producto = dataArchParse.find(
        (producto) => producto.id === Number(id)
      );

      //  if (producto) {
      return producto;
      //  } else {
      //    console.log("Item no encontrado");
      //        return null;
      //  }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      //  let dataArch = await fs.promises.readFile(this.ubicacion, "utf-8");
      //  let dataArchParse = JSON.parse(dataArch);

      let dataArchParse = await this.stringToObj().then((data) => data);

      if (dataArchParse.length) {
        return dataArchParse;
      } else {
        console.log("No hay productos");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      // let dataArch = await fs.promises.readFile(this.ubicacion, "utf-8");
      // let dataArchParse = JSON.parse(dataArch);

      let dataArchParse = await this.stringToObj().then((data) => data);

      let producto = dataArchParse.find((producto) => producto.id === id);
      if (producto) {
        const dataArchParseFiltrado = dataArchParse.filter(
          (producto) => producto.id !== id
        );
        await fs.promises.writeFile(
          this.ubicacion,
          JSON.stringify(dataArchParseFiltrado, null, 2)
        );
        return id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(
        this.ubicacion,
        JSON.stringify([], null, 2),
        "utf-8"
      );
      console.log("Todos los productos borrados");
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, obj) {
    try {
      let dataArchParse = await this.stringToObj().then((data) => data);

      let item = dataArchParse.find((a) => parseInt(a.id) === parseInt(id));
      item = obj;

      const indice = dataArchParse.findIndex(
        (i) => parseInt(i.id) === parseInt(id)
      );
      dataArchParse[indice] = { ...item, id: id };

      await fs.promises.writeFile(
        this.ubicacion,
        JSON.stringify(dataArchParse, null, 2),
        "utf-8"
      );
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async cantidadItems() {
    try {
      const productos = await this.getAll();
      return productos.length;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItem(id, idProducto) {
    try {
      // let dataArch = await fs.promises.readFile(this.ubicacion, "utf-8");
      // let dataArchParse = JSON.parse(dataArch);

      let dataArchParse = await this.stringToObj().then((data) => data);

      let carrito = dataArchParse.find((carrito) => parseInt(carrito.id) === id);
 
      let productos = carrito.productos;

      if (carrito) {
          const dataCarritoFiltrado = productos.filter(
          (producto) => parseInt(producto.id) !== idProducto
          );

        carrito.productos = dataCarritoFiltrado

        await fs.promises.writeFile(
          this.ubicacion,
          JSON.stringify(dataArchParse, null, 2)
        );
        return id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

}




module.exports = ContenedorArchivo;

