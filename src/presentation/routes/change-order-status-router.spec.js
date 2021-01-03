const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../../utils/errors/missing-param-error')
const ServerError = require('../errors/server-error')

class ChangeOrderStatusRouter {
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

const makeUpdateOrderStatusUseCase = () => {
	class UpdateOrderStatusUseCaseSpy {
		async update (status) {
			this.status = status
		}
	}

	return new UpdateOrderStatusUseCaseSpy()
}	


const makeSut = () => {
	const updateOrderStatusUseCaseSpy = makeUpdateOrderStatusUseCase()
	const sut = new ChangeOrderStatusRouter(updateOrderStatusUseCaseSpy)
	return {
		updateOrderStatusUseCaseSpy,
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

	test('Should return 500 if httpRequest has no body', async () => {
		const { sut } = makeSut()
		const httpRequest = {}
		const httpResponse = await sut.route(httpRequest)
		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body.error).toBe(new ServerError().message)
	})

	test('Should call UpdateOrderStatusUseCase with correct params', async () => {
		const { sut, updateOrderStatusUseCaseSpy } = makeSut()
		const httpRequest = {
			body: {
				status: 'any_status'
			}
		}
		await sut.route(httpRequest)
		expect(updateOrderStatusUseCaseSpy.status).toBe(httpRequest.body.status)
	})

	test('Should return 200 if a valid status is provided', async () => {
		const { sut } = makeSut()
		const httpRequest = {
			body: {
				status: 'any_status'
			}
		}
		const httpResponse = await sut.route(httpRequest)
		expect(httpResponse.statusCode).toBe(200)
		expect(httpResponse.body).toEqual({})
	})
})