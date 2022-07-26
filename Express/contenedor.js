const fs = require("fs");

class Contenedor {
  constructor(ubicacion) {
    this.ubicacion = ubicacion;
    this.proximoId = 1;
  }

  // async stringToObj() {
  //   try {
  //     let dataArch = await fs.promises.readFile(this.ubicacion, "utf-8")
  //     let dataArchParse = JSON.parse(dataArch)
  //     return (dataArchParse)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  stringToObj() {
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

  async save(obj){
      try {
        //  let dataArch = await fs.promises.readFile(this.ubicacion, "utf-8");
        //  let dataArchParse = JSON.parse(dataArch); //dataArchParse[dataArchParse.length-1] -> ultimo elemento y +1 tengo el id para usar

        let dataArchParse = this.stringToObj();
          if (dataArchParse.length){
              await fs.promises.writeFile(this.ubicacion, JSON.stringify([...dataArchParse, {...obj, id: this.proximoId}], null, 2))
          }else{
              await fs.promises.writeFile(this.ubicacion, JSON.stringify([{...obj, id: this.proximoId}], null, 2))

          }
          console.log(`El producto se genero con el id: ${this.proximoId}`)
      } catch (error) {
          console.log(error);
      }
  }

  async getById(id) {
    try {
      // let dataArch = await fs.promises.readFile(this.ubicacion, "utf-8");
      // let dataArchParse = JSON.parse(dataArch);
      let dataArchParse = this.stringToObj();

      let producto = dataArchParse.find((producto) => producto.id === id);
      if (producto) {
        return producto;
      } else {
        console.log("Producto no encontrado");
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      //let dataArch = await fs.promises.readFile(this.ubicacion, "utf-8");
      //let dataArchParse = JSON.parse(dataArch)

      let dataArchParse = this.stringToObj();

      if (dataArchParse.length) {
        return dataArchParse;
      } else {
        console.log("No hay productos");
      }
    } catch (error) {
      console.log(error);
    }
  }
 
  async cantidadItems(){
    try {
      const productos = await this.getAll();
      return productos.length;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      // let dataArch = await fs.promises.readFile(this.ubicacion, "utf-8");
      // let dataArchParse = JSON.parse(dataArch);

      let dataArchParse = this.stringToObj();

      let producto = dataArchParse.find((producto) => producto.id === id);
      if (producto) {
        const dataArchParseFiltrado = dataArchParse.filter(
          (producto) => producto.id !== id
        );
        await fs.promises.writeFile(
          this.ubicacion,
          JSON.stringify(dataArchParseFiltrado, null, 2)
        );
        console.log("Producto eliminado");
      } else {
        console.log("Producto no encontrado para borrar");
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
}

module.exports = Contenedor;

