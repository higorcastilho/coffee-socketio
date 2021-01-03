const MissingParamError = require('../errors/missing-param-error')

module.exports = class EmitLiveData {
	
	constructor (emitter) {
		this.emitter = emitter
	}

	async send (notificationName, payload) {

		if (!notificationName) {
			throw new MissingParamError('notificationName')
		}

		if (!payload) {
			throw new MissingParamError('payload')
		}

		await this.emitter.emit(notificationName, payload)
	}
}