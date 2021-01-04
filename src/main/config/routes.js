const router = require('express').Router()
const fg = require('fast-glob')
const createEmitter = require('./emitter')

module.exports = app => {
	app.use('/live-data-emitter/v2', router)
	
	const http = require('http').createServer(app)
	const emitter = createEmitter(http)

	fg.sync('**/src/main/routes/**.js').forEach(file => {
		return require(`../../../${file}`)(router, emitter)
	})

	return http
}