const http = require('http')

const options = {
    // hostname: 'www.pokeapi.co/api/v2/ability/?limit=20&offset=20',
    hostname: 'http://localhost:8080',
    // port: 4000,
    path: '/api/mensajes',
    method: 'GET'
}

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    
    res.on('data', d => {
        process.stdout.write(d)
    })
})


req.on('error', error => { 
    console.log(error)
 })

 req.end()