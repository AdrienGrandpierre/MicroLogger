const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let loggerSchema = new Schema({
    date: {
        type: String
    },
    serviceName: {
        type: String
    },
    content: {
        type: String
    },
    status: {
        type: String
    }
}, {
    collection: process.env.DB_NAME
})

module.exports = mongoose.model('Logger', loggerSchema)