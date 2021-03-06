const express = require('express'), morgan = require('morgan');
const app = express();
const graphqlHTTP = require('express-graphql')
const {EventEmitter} = require('events'), event = new EventEmitter();
const mongoose = require('mongoose')
const cors = require('cors')

const schema = require('./schema/schema')
const application_config = require('./config')

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(cors());

app.use('/graphql',graphqlHTTP({
    schema, //schema : schema,
    graphiql: true // tool to test
}));

mongoose.connect(application_config.dbUrl,{ useNewUrlParser: true })
mongoose.connection.once('open',()=>{
    event.emit('dbup')
})

event.on('dbup', ()=>{
    app.listen(application_config.port, ()=>{
        console.log(`application is running on port ${application_config.port}`)
    });
})
