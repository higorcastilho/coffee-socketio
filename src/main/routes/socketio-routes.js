const { adapt } = require('../adapters/express-router-adapter')

module.exports = router => {
	router.post('/send-notification', adapt(composer))
}

