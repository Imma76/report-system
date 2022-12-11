const handleError = (err, req, res, next) => res.status(500).send({ status: true, message: `${err}` })

export default handleError;