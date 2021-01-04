const ChangeOrderStatusRouter = require('../../presentation/routes/change-order-status-router')

module.exports = class SocketioRouterComposer {
	static compose () {
		return new ChangeOrderStatusRouter()
	}
}