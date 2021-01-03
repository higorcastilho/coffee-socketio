module.exports = (req, res, next) => {
	res.set('accesss-control-allow-origin', '*')
	res.set('accesss-control-allow-methods', '*')
	res.set('accesss-control-allow-headers', '*')
	next()
}