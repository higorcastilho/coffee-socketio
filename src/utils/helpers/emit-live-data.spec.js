class EmitLiveData {
	
	constructor (emitter) {
		this.emitter = emitter
	}

	async send (notificationName, payload) {
		await this.emitter.emit(notificationName, payload)
	}
}

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
	test('Should call emitter with correct values', async () => {
		const { sut, socketio } = makeSut()
		await sut.send('any_notificationName', 'any_payload')
		expect(socketio.notificationName).toBe('any_notificationName')
		expect(socketio.payload).toBe('any_payload')
	})
})