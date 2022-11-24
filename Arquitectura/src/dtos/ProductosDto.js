export default class ProductoDto {
    id;
    nombre;
    precio;
    imagen;
  
    constructor({ id, nombre, precio, imagen }) {
      this.id = id
      this.nombre = nombre;
      this.precio = precio;
      this.imagen = imagen;
    }
  
    static fromJson(json) {
      const datos = JSON.parse(json)
      return new ProductoDto(datos)
    }
  
    toJson() {
      return JSON.stringify(this)
    }
  }