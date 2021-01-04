const { adapt } = require('../adapters/express-router-adapter')
const ChangeOrderStatusComposer = require('../composers/change-order-status-router-composer')
const PopUpOrderComposer = require('../composers/pop-up-order-router-composer')

module.exports = (router, emitter) => {
	router.post('/update-order-status', adapt(ChangeOrderStatusComposer.compose(), emitter))
	router.post('/pop-up-order', adapt(PopUpOrderComposer.compose(), emitter))
}

