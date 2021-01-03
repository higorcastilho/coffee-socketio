jest.mock('socket.io', () => ({
	async emit (notificationName, payload) {
		
	}
}))

class EmitLiveData {
	async send () {

	}
}

describe('Emit Live Data', () => {
	test('', () => {
		expect(1+1).toBe(2)
	})
})