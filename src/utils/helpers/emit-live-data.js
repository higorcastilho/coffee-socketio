const MissingParamError = require('../errors/missing-param-error')

module.exports = class EmitLiveData {
	
	async send (notificationName, payload) {

		if (!notificationName) {
			throw new MissingParamError('notificationName')
		}

		if (!payload) {
			throw new MissingParamError('payload')
		}

		await emit(notificationName, payload)
	}
}