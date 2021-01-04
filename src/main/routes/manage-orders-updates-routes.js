const { adapt } = require('../adapters/express-router-adapter')
const ChangeOrderStatusComposer = require('../composers/change-order-status-router-composer')

module.exports = (router, emitter) => {
	router.post('/update-order-status', adapt(ChangeOrderStatusComposer.compose(), emitter))
}

