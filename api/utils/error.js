exports.handlePromiseError = function(res, err) {
	console.log(err.message);
	res.statusCode = err.statusCode;
	res.send(err.error);
};

exports.returnError = function(res, err, errCode) {
	var errObj = {
		error: {
			message: err,
			info: {statusCode: errCode},
			statusCode: errCode
		}
	};
	console.log(err);
	res.statusCode = errCode;
	res.send(JSON.stringify(errObj));
}