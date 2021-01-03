const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = class ChangeOrderStatusRouter {
	constructor (updateOrderStatusUseCase) {
		this.updateOrderStatusUseCase = updateOrderStatusUseCase
	}

	async route (httpRequest) {
		try {
			const { status } = httpRequest.body

			if (!status) {
				return HttpResponse.badRequest(new MissingParamError('data'))
			}

			await this.updateOrderStatusUseCase.update(status)

			return HttpResponse.ok({})

		} catch (error) {

			return HttpResponse.serverError()
		}
	}
}