var mysql = require("./mysql");

function handle_getUserEducationInfo_request(msg, callback) {
	var res={};
	var educationDetail = "SELECT * FROM LinkedIn.Education_Details where User_ID="+"(Select User_ID from LinkedIn.User_Details where Email_ID = '" + msg.emailID + "'" +")";
	console.log("Query Log : " + educationDetail.toString());
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
				if (results.length > 0){
					console.log(results);
					var education = JSON.stringify(results);
					
					res.code = "200";
					res.value = "Success";
					res.educationDetail = education;
					res.status = true;
					res.error = "none";
					console.log("User Education Detail Found Succesfully");
					callback(null, res);
				} else {
					console.log("No Education Detail Found");
					
					res.code = "200";
					res.value = "Fail";
					res.status = true;
					res.error = "none";	
					callback(null, res);
				}
			}
	}, educationDetail);
}

exports.handle_getUserEducationInfo_request = handle_getUserEducationInfo_request;