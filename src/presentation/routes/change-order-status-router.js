const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../../utils/errors/missing-param-error')

module.exports = class ChangeOrderStatusRouter {
	
	async route (httpRequest) {
		try {
			const { notificationName, data } = httpRequest.body
			console.log(notificationName, data)
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
	
			return HttpResponse.serverError()
		}
	}
}