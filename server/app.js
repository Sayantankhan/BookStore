const express = require('express'), morgan = require('morgan');
const app = express();
const graphqlHTTP = require('express-graphql')

const schema = require('./schema/schema')
const application_config = require('./config')

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use('/graphql',graphqlHTTP({
    schema, //schema : schema,
    graphiql: true // tool to test
}));

app.listen(application_config.port, ()=>{
    console.log(`application is running on port ${application_config.port}`)
})