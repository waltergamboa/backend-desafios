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
    console.log(JSON.stringify(chat).length);
    // normalizacion
    const authorSchema = new normalizr.schema.Entity('author', {}, {idAttribute: "id"});
    const commentSchema = new normalizr.schema.Entity('text');
    const postSchema =[{
        author: authorSchema,
        texto: commentSchema
    }]

    const denormalizedChat = normalizr.denormalize(chat.result, postSchema, chat.entities);

    console.log(JSON.stringify(denormalizedChat).length);
    

    const divMensajes = document.querySelector("#mensajes");
    let html = `<ul>`

    denormalizedChat.map(item=>{
        html = html + `<li><span class="mensajeMail">${item.author.id}</span><span class="mensajeFechaHora">[${item.fechahora}]:</span><span class="mensajeTexto">${item.text}</span></li>`;
    })

    html = html + `</ul>`

    divMensajes.innerHTML = html;

    const calculoPorcentaje = (Number(JSON.stringify(chat).length)) * 100 / Number(JSON.stringify(denormalizedChat).length) 

    document.querySelector("#porcentaje").innerHTML = `Porcentaje de Compresion ${parseInt(calculoPorcentaje)} %`;

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
        const nombre = document.querySelector("#nombreChat").value;
        const apellido = document.querySelector("#apellido").value;                
        const edad = document.querySelector("#edad").value;
        const alias = document.querySelector("#alias").value;                
        const avatar = document.querySelector("#avatar").value;                        
        const mensaje = document.querySelector("#mensaje").value;

        const chat = { mail, nombre, apellido, edad, alias, avatar, mensaje };
//console.log("chat", chat)        
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
