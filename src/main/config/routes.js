const router = require('express').Router()
const fg = require('fast-glob')

module.exports = app => {
	app.use('/socketio/v2', router)
	fg.sync('**/src/main/routes/**.js').forEach(file => {
		return require(`../../../${file}`)(router)
	})
}