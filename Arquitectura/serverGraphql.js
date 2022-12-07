const express = require('express')
const { GraphQLController } = require("./src/graphql/GraphQL.Controller")

// Server ____________________________________________________________________________
const app = express();

app.use( express.static('public') )

app.use('/graphql', new GraphQLController() );

const PORT = 4000
app.listen(PORT, () => {
    const msg = `Servidor corriendo en puerto: ${PORT}`;
    console.log(msg)
})