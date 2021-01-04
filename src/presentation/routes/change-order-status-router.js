const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = class ChangeOrderStatusRouter {
	constructor (updateOrderStatusUseCase) {
		this.updateOrderStatusUseCase = updateOrderStatusUseCase
	}

	async route (httpRequest) {
		try {
			const { notificationName, data } = httpRequest.body
			
			if (!notificationName) {
				return HttpResponse.badRequest(new MissingParamError('notificationName'))
			}
			
			if (!data) {
				return HttpResponse.badRequest(new MissingParamError('data'))
			}

			return HttpResponse.ok(
			{
				notificationName,
				data
			})

		} catch (error) {
			console.log(error)
			return HttpResponse.serverError()
		}
	}
}