const MissingParamError = require('../../utils/errors/missing-param-error')
const UpdateOrderStatusUseCase = require('./update-order-status-usecase')

const makeEmitLiveData = () => {
	class emitLiveDataSpy {
		async send (notificationName, payload) {
			this.notificationName = notificationName
			this.payload = payload
		}
	}

	return new emitLiveDataSpy()
}

const makeEmitLiveDataWithError = () => {
	class emitLiveDataSpy {
		async send () {
			throw new Error()
		}	
	}

	return new emitLiveDataSpy()
}


const makeSut = () => {
	const emitLiveDataSpy = makeEmitLiveData()
	const sut = new UpdateOrderStatusUseCase(emitLiveDataSpy)

	return {
		emitLiveDataSpy,
		sut
	}
}

describe('Update Order Status Usecase', () => {

	test('Should throw if no notificationName is provided', async () => {
		const { sut } = makeSut()
		const promise = sut.update()
		expect(promise).rejects.toThrow(new MissingParamError('notificationName'))
	})
	
	test('Should throw if no status is provided', async () => {
		const { sut } = makeSut()
		const promise = sut.update('any_notificationName')
		expect(promise).rejects.toThrow(new MissingParamError('status'))
	})

	test('Should call EmitLiveData with correct params', async () => {
		const { sut, emitLiveDataSpy } = makeSut()
		await sut.update('any_notificationName', 'any_status')
		expect(emitLiveDataSpy.notificationName).toBe('any_notificationName')
		expect(emitLiveDataSpy.payload).toBe('any_status')
	})

	test('Should throw if invalid dependencies are provided', async () => {
		class EmitLiveDataSpy {}
		const suts = [].concat(
			new UpdateOrderStatusUseCase(),
			new UpdateOrderStatusUseCase(new EmitLiveDataSpy)
		)

		for (const sut of suts) {
			const promise = sut.update('any_notificationName', 'any_status')
			expect(promise).rejects.toThrow()
		}
	})

	test('Should throw if any dependency throws', async () => {
		const emitLiveDataWithError = makeEmitLiveDataWithError()
		const suts = [].concat(
			new UpdateOrderStatusUseCase(emitLiveDataWithError)
		)

		for (const sut of suts) {
			const promise = sut.update('any_notificationName', 'any_status')
			expect(promise).rejects.toThrow()
		}
	})
})