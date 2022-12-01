// faker
const { faker } = require("@faker-js/faker");
faker.locale = 'es'

function generar() {
    return {
        author: {
            id: faker.internet.email(),
            nombre: faker.name.firstName(),
            apellido: faker.name.lastName(),
            edad: faker.random.numeric(),
            alias: faker.lorem.word(),
            avatar: faker.lorem.word()
        },
        text: faker.lorem.text()

    }
}

module.exports = {
    generar
}

