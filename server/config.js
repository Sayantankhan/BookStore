const config = require('config')

const application = {
    port: config.application.port
}



module.exports = Object.assign({},application)