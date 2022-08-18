const server = io().connect();

const renderProductos = (productos)=>{
    const divProductos = document.querySelector("#productos");
    let html = `<div class="row">`

    productos.map(prod=>{
        html = html + `<div class="col-3">
        <div class="card text-black bg-light border-light w-120 m-3"><div class="card-header">${prod.nombre}</div>
        <div class="card-body" style="text-align: center;">
        <img src=${prod.imagen} style="width: 200px; height: 200px; object-fit: cover;"></img>
        <p class="card-text">
          $ ${prod.precio} 
        </p>
      </div>
      <div class="card-footer" style="text-align: right">
      <p>
      </p>
    </div>
    </div>
    </div>`;
    })

    html = html + `</div>`

    divProductos.innerHTML = html;

}


const renderMensajes = (chat)=>{
    const divMensajes = document.querySelector("#mensajes");
    let html = `<ul>`

    chat.map(item=>{
        html = html + `<li><span class="mensajeMail">${item.mail}</span><span class="mensajeFechaHora">[${item.fechahora}]:</span><span class="mensajeTexto">${item.mensaje}</span></li>`;
    })

    html = html + `</ul>`

    divMensajes.innerHTML = html;
}


const agregarProducto = (evt)=>{
    const nombre = document.querySelector("#nombre").value;
    const precio = document.querySelector("#precio").value;
    const imagen = document.querySelector("#imagen").value;

    const producto = {nombre, precio, imagen};
    server.emit("producto-nuevo", producto);
    return false;
}

const agregarChat = (evt)=>{
    try {
        const mail = document.querySelector("#mail").value;
        const mensaje = document.querySelector("#mensaje").value;

        const chat = {mail, mensaje};
        server.emit("chat-nuevo", chat);
        document.querySelector("#mensaje").value = "";
        document.querySelector("#mensaje").focus();
        return false; 
            
    } catch (error) {
        console.log(error)        
    }
}

server.on("mensaje-productos", (productos)=>{
    renderProductos(productos);
})

server.on("mensaje-chat", (chat)=>{
    renderMensajes(chat);
})
