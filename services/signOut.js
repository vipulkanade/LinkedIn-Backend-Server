var mysql = require("./mysql");

function handle_sign_out_request(msg, callback) {
	var res={};		
	
	res.status = true;
	res.code = 200;
	res.error = "none";
	console.log("Sign Out Succesfully");
	callback(null, res);
}

exports.handle_sign_out_request = handle_sign_out_request;