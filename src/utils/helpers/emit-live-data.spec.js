const MissingParamError = require('../errors/missing-param-error')
const EmitLiveData = require('./emit-live-data')

//mocking socketio because io instance of socketio is gonna be injected 
//inside EmitLiveData on ChangeOrderStatusRouterComposer, on main layer
const makeSocketio = () => {
	class Socketio {
		async emit (notificationName, payload) {
			this.notificationName = notificationName
			this.payload = payload
		}
	}

	return new Socketio()
}

const makeSut = () => {
	const socketio = makeSocketio()
	const sut = new EmitLiveData(socketio)
	return {
		socketio, 
		sut
	}
}

describe('Emit Live Data', () => {

	test('Should throw if no params are provided', async () => {
		const { sut } = makeSut()
		expect(sut.send()).rejects.toThrow(new MissingParamError('notificationName'))
		expect(sut.send('any_notificationName')).rejects.toThrow(new MissingParamError('payload'))
	})

	test('Should call emitter with correct values', async () => {
		const { sut, socketio } = makeSut()
		await sut.send('any_notificationName', 'any_payload')
		expect(socketio.notificationName).toBe('any_notificationName')
		expect(socketio.payload).toBe('any_payload')
	})
})
