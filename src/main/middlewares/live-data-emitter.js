const socketio = require('socket.io')

module.exports = http => {
	const io = socketio(http, {
		cors: {
			origin: "http://localhost:8080",
			methods: ["GET", "POST"],
			credentials: true
		}
	})

	return io
}
