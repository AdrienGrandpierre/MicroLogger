const express = require('express')
const { receiveLog, getLogs, receiveLogJson } = require('./controllers/logger/logger')
const router = express.Router()

router.get('/', function (req, res) {
    res.status(200).send("Ready")
})

router.post('/addlog', receiveLog)

router.post('/addlogjson', receiveLogJson)

router.get('/logs', getLogs)

module.exports = router
