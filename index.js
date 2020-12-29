const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

const app = express()
const http = require('http').createServer(app)
const io = socketio(http, {
	cors: {
		origin: "http://localhost:8080",
		methods: ["GET", "POST"],
		credentials: true
	}
})

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

io.on('connection', socket => {
	console.log('Socket: client connected')
})

app.post('/send-notification', (req, res) => {
	const notify = { data: req.body }
	console.log(req.body)
	io.emit('notification', notify)
	res.send({ status: 200, notify })
})

app.post('/new-order', (req, res) => {
	const notify = { data: req.body }
	io.emit('newOrder', notify)
	res.send({notify})
})

http.listen(port, () => {
	console.log(`Listening on port:${port}`)
})
