const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = class ChangeOrderStatusRouter {
	constructor (updateOrderStatusUseCase) {
		this.updateOrderStatusUseCase = updateOrderStatusUseCase
	}

	async route (httpRequest) {
		try {
			const { notificationName, status } = httpRequest.body

			if (!notificationName) {
				return HttpResponse.badRequest(new MissingParamError('notificationName'))
			}
			
			if (!status) {
				return HttpResponse.badRequest(new MissingParamError('status'))
			}
			await this.updateOrderStatusUseCase.update(notificationName, status)

			return HttpResponse.ok({})

		} catch (error) {

			return HttpResponse.serverError()
		}
	}
}