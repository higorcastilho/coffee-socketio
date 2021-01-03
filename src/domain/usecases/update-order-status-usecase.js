const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = class UpdateOrderStatusUseCase {
	constructor (emitLiveData) {
		this.emitLiveData = emitLiveData
	}

	async update (notificationName, status) {

		if (!notificationName) {
			throw new MissingParamError('notificationName')
		}

		if (!status) {
			throw new MissingParamError('status')
		}

		await this.emitLiveData.send(notificationName, status)
	}
}