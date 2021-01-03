const env = require('./config/env')
const { http } = require('./config/app')

http.listen(env.port, () => {
	console.log(`Server running at http://localhost:${env.port}`)
})