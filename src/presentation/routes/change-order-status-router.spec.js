const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../../utils/errors/missing-param-error')

class ChangeOrderStatusRouter {
	async route (httpRequest) {
		const { status } = httpRequest.body

		if (!status) {
			return HttpResponse.badRequest(new MissingParamError('data'))
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
})