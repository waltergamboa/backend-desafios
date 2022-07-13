/* -------------------------------------------------------------------------- */
/*                              Desafio - Clases                              */
/* -------------------------------------------------------------------------- */

class Usuario {
/* ------------------------------- Constructor ------------------------------ */
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

/* --------------------------------- Metodos -------------------------------- */
  getFullName() {
    const completo = `${this.nombre} ${this.apellido}`;
    return completo;
  }

  addMascota(nombre) {
    this.mascotas.push(nombre);
  }

  countMascotas() {
    const cantidad = this.mascotas.length;
    return cantidad;
  }

  addBook(nombre, autor) {
    const objBook = { nombre: nombre, autor: autor };
    this.libros.push(objBook);
  }

  getBookNames() {
    const arrNombres = this.libros.map((item) => item.nombre);
    return arrNombres;
  }
}

/* ------------------------------ Objeto usario ----------------------------- */
usuario = new Usuario("Elon", "Musk", [], []);

/* -------------------------- Ejemplos Solicitados -------------------------- */
usuario.addMascota("perro");
usuario.addMascota("gato");
usuario.addMascota("tortuga");

console.log(usuario.countMascotas());

usuario.addBook("El señor de las moscas", "William Golding");
usuario.addBook("Fundacion", "'Isaac Asimov");

console.log(usuario.getBookNames());

console.log(usuario.getFullName());
