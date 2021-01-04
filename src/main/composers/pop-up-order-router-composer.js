const PopUpOrderRouter = require('../../presentation/routes/pop-up-order-router')

module.exports = class PopUpOrderRouterComposer {
	static compose () {
		return new PopUpOrderRouter()
	}
}