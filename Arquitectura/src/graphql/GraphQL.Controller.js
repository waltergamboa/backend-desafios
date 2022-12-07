const { MensajesApi } = require('./MensajesApi');
const { buildSchema } = require('graphql')
const  { graphqlHTTP } = require('express-graphql');

const schema = buildSchema(`
  type Author{
    id: String,
    nombre: String,
    apellido: String
    edad: Int,
    alias: String,
    avatar: String
  }
  type Mensaje {
    id: ID!,
    text: String,
    author: Author,
    fechahora: String
  }
  input AuthorInput{
    id: String,
    nombre: String,
    apellido: String
    edad: Int,
    alias: String,
    avatar: String
  }
  input MensajeInput {
    author: AuthorInput
    text: String,
    fechahora: String
  }
  type Query {
    getMensajes: [Mensaje]
  }
  type Mutation {
    saveMensaje(datos: MensajeInput): Mensaje
  }
`)

class GraphQLController{
    constructor(){
        this.api = new MensajesApi()
        this.config = {
          schema,
          rootValue: {
            getMensajes: this.api.getMensajes,
            saveMensaje: this.api.saveMensaje
          },
          graphiql: true
        }
        return graphqlHTTP(this.config)
    }
}

// getPersona: this.api.getPersona,
// getPersonas: this.api.getPersonas,
// createPersona: this.api.createPersona,
// updatePersona: this.api.updatePersona,
// deletePersona: this.api.deletePersona


module.exports = { GraphQLController }