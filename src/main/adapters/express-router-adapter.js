module.exports = class ExpressRouterAdapter {
	static adapt (router, emitter) {
		return async (req, res) => {
			const httpRequest = {
				body: req.body
			} 

			const httpResponse = await router.route(httpRequest)
	
			emitter.emit(httpResponse.body.notificationName, httpResponse.body.data)

			res.status(httpResponse.statusCode).json({})
		}
	}
}