const axios = require('axios');
let url = "";

// // get mensajes
// url = 'http://localhost:8080/api/mensajes'

// axios.get(url) 
//     .then(res => {
//         console.log(res.data)
//     })
//     .catch(err => console.log(err))


// // get productos
// url = 'http://localhost:8080/api/productos'

// axios.get(url) 
//     .then(res => {
//         console.log(res.data)
//     })
//     .catch(err => console.log(err))


// url = 'http://localhost:8080/api/mensajes'

// let options= {
//                 "author": {
//                     "id": "cincocapas@gmail.com",
//                     "nombre": "cincocapasnombre",
//                     "apellido": "cincocapasapellido",
//                     "edad": "5",
//                     "alias": "cincocapasalias",
//                     "avatar": "cincocapasavatar"
//                 },
//                 "text": "test cinco capas"
//       }
    
//     axios.post(url, options)
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       })



      url = 'http://localhost:8080/api/productos'

      options= {
              "nombre": "ManzanasssssssWWW",
              "precio": "12111",
              "imagen": "https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g="

            }
          
          axios.post(url, options)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            })      
