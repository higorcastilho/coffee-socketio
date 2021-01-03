const ServerError = require('../errors/server-error')

module.exports = class HttpResponse {
	static badRequest (error) {
		return {
			statusCode: 400,
			body: {
				error: error.message
			}
		}
	}

	static serverError () {
		return {
			statusCode: 500,
			body: {
				error: new ServerError().message
			}
		}
	}

	static ok (data) {
		return {
			statusCode: 200,
			body: data
		}
	}
}