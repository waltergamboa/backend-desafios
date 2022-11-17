const randomNumber = (cantidad) => {
    let numeros = [];
    Math.random();

    for (let index = 1; index <= cantidad; index++) {
        const elemento = Math.floor(Math.random() * 1000 + 1);
        numeros[elemento] = (numeros[elemento] || 0) + 1
    }

    const jsonString = JSON.stringify(Object.assign({}, numeros))

    return jsonString;    
}

process.on('message', mesajeRandomSend => {
    const cantidad = mesajeRandomSend.split(":")[1];
    process.send(randomNumber(cantidad))
})