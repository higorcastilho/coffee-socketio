const express = require('express')
const app = express()
const setupApp = require('./setup')
const setupRoutes = require('./routes')
const setupLiveDataEmitter = require('../middlewares/live-data-emitter')

setupApp(app)
setupRoutes(app)

const http = require('http').createServer(app)

const emitter = setupLiveDataEmitter(http)

module.exports = { app, http, io }