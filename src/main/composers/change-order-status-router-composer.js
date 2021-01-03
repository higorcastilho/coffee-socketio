const { emitter } = require('../config/app')
const ChangeOrderStatusRouter = require('../../presentation/routes/change-order-status-router')
const UpdateOrderStatusUseCase = require('../../domain/usecases/update-order-status-usecase')
const EmitLiveData = require('../../utils/helpers/emit-live-data')

module.exports = class SocketioRouterComposer {
	static compose () {
		const emitLiveData = new EmitLiveData(emitter)
		const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(emitLiveData)
		return new ChangeOrderStatusRouter(updateOrderStatusUseCase)
	}
}