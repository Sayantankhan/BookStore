const config = require('config')

const application = {
    port: config.application.port,
    dbUrl: config.application.dbserver.dbUrl,
    book_collection: config.application.dbcollection.bookcollection,
    author_collection: config.application.dbcollection.authorcollection
};

module.exports = Object.assign({},application)