var mysql = require("./mysql");

function handle_getUserInfo_request(msg, callback) {
	var res={};

	var getUser = "SELECT * FROM LinkedIn.User_Details where Email_ID='"+msg.emailID+"'";
	console.log("Get User Info Query Log : " + getUser.toString());
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
				if (results.length > 0) {
					console.log(results);
					var user = results[0];
					
					res.code = "200";
					res.value = "Success";
					res.status = true;
					res.user = user;
					res.error = "none";	
					console.log("User Found Succesfully");	
					callback(null, res);
				} else {
					console.log("No Detail Found");
					
					res.code = "200";
					res.value = "Fail";
					res.status = true;
					res.error = "none";	
					callback(null, res);
				}
			}
	}, getUser);
}

exports.handle_getUserInfo_request = handle_getUserInfo_request;