const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../../utils/errors/missing-param-error')
const ServerError = require('../errors/server-error')
const ChangeOrderStatusRouter = require('./change-order-status-router')

const makeUpdateOrderStatusUseCase = () => {
	class UpdateOrderStatusUseCaseSpy {
		async update (notificationName, status) {
			this.notificationName = notificationName
			this.status = status
		}
	}

	return new UpdateOrderStatusUseCaseSpy()
}

const makeUpdateOrderStatusUseCaseWithError = () => {
	class UpdateOrderStatusUseCaseSpy {
		async update () {
			throw new Error()
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
	
	test('Should return 400 if no notificationName is provided', async () => {
		const { sut } = makeSut()
		const httpRequest = {
			body: {}
		}
		const httpResponse = await sut.route(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body.error).toBe(new MissingParamError('notificationName').message)
	})

	test('Should return 400 if no status is provided', async () => {
		const { sut } = makeSut()
		const httpRequest = {
			body: {
				notificationName: 'any_notificationName'
			}
		}
		const httpResponse = await sut.route(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body.error).toBe(new MissingParamError('status').message)
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
				notificationName: 'any_notificationName',
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
				notificationName: 'any_notificationName',
				status: 'any_status'
			}
		}
		const httpResponse = await sut.route(httpRequest)
		expect(httpResponse.statusCode).toBe(200)
		expect(httpResponse.body).toEqual({})
	})

	test('Should throw if invalid dependencies are provided', async () => {
		const updateOrderStatusUseCaseSpy = class UpdateOrderStatusUseCaseSpy {}
		const suts = [].concat(
			new ChangeOrderStatusRouter(),
			new ChangeOrderStatusRouter(updateOrderStatusUseCaseSpy)
		)

		for (const sut of suts) {
			const httpRequest = {
				body: {
					notificationName: 'any_notificationName',
					status: 'any_status'
				}
			}

			const httpResponse = await sut.route(httpRequest)
			expect(httpResponse.statusCode).toBe(500)
			expect(httpResponse.body.error).toBe(new ServerError().message)
		}
	})

	test('Should throw if any dependency throws', async () => {
		const updateOrderStatusUseCaseWithError = makeUpdateOrderStatusUseCaseWithError()
		const suts = [].concat(
			new ChangeOrderStatusRouter(updateOrderStatusUseCaseWithError)
		)

		for (const sut of suts) {
			const httpRequest = {
				body: {
					notificationName: 'any_notificationName',
					status: 'any_status'
				}
			}

			const httpResponse = await sut.route(httpRequest)
			expect(httpResponse.statusCode).toBe(500)
			expect(httpResponse.body.error).toBe(new ServerError().message)
		}
	})
})