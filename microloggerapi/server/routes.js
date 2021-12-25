const express = require('express')
const { receiveLog } = require('./controllers/logger/logger')
const loggerSchema = require('./models/logger-schema')
const router = express.Router()

router.get('/', function (req, res) {
    res.status(200).send("Ready")
})

router.post('/log', receiveLog)

module.exports = router
