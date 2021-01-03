const MissingParamError = require('../../utils/errors/missing-param-error')
const UpdateOrderStatusUseCase = require('./update-order-status-usecase')

const makeSocketio = () => {
	class SocketioSpy {
		async emit (notificationName, payload) {
			this.notificationName = notificationName
			this.payload = payload
		}
	}

	return new SocketioSpy()
}

const makeSocketioWithError = () => {
	class SocketioSpy {
		async emit () {
			throw new Error()
		}	
	}

	return new SocketioSpy()
}


const makeSut = () => {
	const socketioSpy = makeSocketio()
	const sut = new UpdateOrderStatusUseCase(socketioSpy)

	return {
		socketioSpy,
		sut
	}
}

describe('Update Order Status Usecase', () => {
	test('Should throw if no status is provided', async () => {
		const { sut } = makeSut()
		const promise = sut.update()
		expect(promise).rejects.toThrow(new MissingParamError('status'))
	})

	test('Should call Socketio with correct params', async () => {
		const { sut, socketioSpy } = makeSut()
		await sut.update('any_notificationName', 'any_status')
		expect(socketioSpy.notificationName).toBe('any_notificationName')
		expect(socketioSpy.payload).toBe('any_status')
	})

	test('Should throw if invalid dependencies are provided', async () => {
		const socketio = class SocketioSpy {}
		const suts = [].concat(
			new UpdateOrderStatusUseCase(),
			new UpdateOrderStatusUseCase(socketio)
		)

		for (const sut of suts) {
			const promise = sut.update('any_notificationName', 'any_status')
			expect(promise).rejects.toThrow()
		}
	})

	test('Should throw if any dependency throws', async () => {
		const socketioWithError = makeSocketioWithError()
		const suts = [].concat(
			new UpdateOrderStatusUseCase(socketioWithError)
		)

		for (const sut of suts) {
			const promise = sut.update('any_notificationName', 'any_status')
			expect(promise).rejects.toThrow()
		}
	})
})