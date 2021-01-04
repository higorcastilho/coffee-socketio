const socketio = require('socket.io')

module.exports = http => {
	return socketio(http, {
		cors: {
			origin: "http://localhost:8080",
			methods: ["GET", "POST"],
			credentials: true
		}
	})
}