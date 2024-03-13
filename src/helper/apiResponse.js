exports.mainResponse = function (res, type, msg, data) {
	//   console.log(data.body);
	let status = 200;
	if (type === "success") {
	  var resData = {
		status: 'success',
		message: msg,
		data: data,
	  };
	  status = 200;
	}
	else if (type === "no-route"){
		var resData = {
		  status: 'failed',
		  message: msg,
		  data: data,
		};
		status = 404;
	}
	else if (type === "validation"){
		var resData = {
		  status: 'failed',
		  message: msg,
		  data: data,
		};
		status = 400;
	}
	else if (type === "unauthorized"){
		var resData = {
		  status: 'failed',
		  message: msg,
		  data: data,
		};
		status = 401;
	} 
	else if (type === "failed") {
	  var resData = {
		status: 'failed',
		message: msg,
	  };
	  status = 200;
	}
	else {
	  var resData = {
		status: 'failed',
		message: msg,
		data: data,
	  };
	  status = 500;
	}
	return res.status(status).json(resData);
	
	
  };
  
  exports.successResponseWithData = function (res, msg, data) {
	var resData = {
	  status: 'success',
	  message: msg,
	  data: data,
	};
	return res.status(200).json(resData);
  };
  
  exports.ErrorResponse = function (res, msg) {
	var data = {
	  status: 'failed',
	  message: msg,
	};
	return res.status(500).json(data);
  };
  
  exports.notFoundResponse = function (res, msg) {
	var data = {
	  status: 'failed',
	  message: msg,
	};
	return res.status(200).json(data);
  };
  
  exports.validationErrorWithData = function (res, msg, data) {
	var resData = {
	  status: 'failed',
	  message: msg,
	  data: data,
	};
	return res.status(400).json(resData);
  };
  
  exports.unauthorizedResponse = function (res, msg) {
	var data = {
	  status: 'failed',
	  message: msg,
	};
	return res.status(401).json(data);
  };

  exports.failedWithData = (res, msg, data) => {
	let resData = {
		status: 'failed',
		message: msg,
		data: data,
	};

	return res.status(200).json(resData);
}