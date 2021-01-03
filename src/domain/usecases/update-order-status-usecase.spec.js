const MissingParamError = require('../../utils/errors/missing-param-error')

class UpdateOrderStatusUseCase {
	async update (status) {
		if (!status) {
			throw new MissingParamError('status')
		}
	}
}

const makeSut = () => {
	const sut = new UpdateOrderStatusUseCase()

	return {
		sut
	}
}

describe('Update Order Status Usecase', () => {
	test('Should throw if no status is provided', async () => {
		const { sut } = makeSut()
		const promise = sut.update()
		expect(promise).rejects.toThrow(new MissingParamError('status'))
	})
})