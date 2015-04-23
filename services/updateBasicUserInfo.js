var mysql = require("./mysql");

function handle_updateBasicUserInfo_request(msg, callback) {
	var res={};
	var updateUser = "UPDATE LinkedIn.User_Details SET "+ msg.field +"='"+ msg.name +"' where User_ID=" + msg.userID;
	console.log("Query Log : " + updateUser.toString());
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {				
			res.code = "200";
			res.value = "Success";
			res.status = true;
			res.error = "none";
			console.log("User Basic Record Updated Succesfully");
			callback(null, res);
		}
	}, updateUser);
}

exports.handle_updateBasicUserInfo_request = handle_updateBasicUserInfo_request;