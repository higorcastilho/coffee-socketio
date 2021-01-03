const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../../utils/errors/missing-param-error')
const ServerError = require('../errors/server-error')

class ChangeOrderStatusRouter {
	async route (httpRequest) {
		try {
			const { status } = httpRequest.body

			if (!status) {
				return HttpResponse.badRequest(new MissingParamError('data'))
			}
		} catch (error) {
			return HttpResponse.serverError()
		}
	}
}

const makeSut = () => {
	const sut = new ChangeOrderStatusRouter()
	return {
		sut
	}
}

describe('Socketio', () => {
	test('Should return 400 if no status is provided', async () => {
		const { sut } = makeSut()
		const httpRequest = {
			body: {}
		}
		const httpResponse = await sut.route(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body.error).toBe(new MissingParamError('data').message)
	})

	test('Should return 500 if no httpRequest is provided', async () => {
		const { sut } = makeSut()
		const httpResponse = await sut.route()
		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body.error).toBe(new ServerError().message)
	})
})