const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = class UpdateOrderStatusUseCase {
	constructor (socketio) {
		this.socketio = socketio
	}

	async update (notificationName, status) {

		if (!notificationName) {
			throw new MissingParamError('notificationName')
		}

		if (!status) {
			throw new MissingParamError('status')
		}

		await this.socketio.emit(notificationName, status)
	}
}