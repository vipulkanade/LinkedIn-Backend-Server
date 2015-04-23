var mysql = require("./mysql");

function handle_getUserExperienceInfo_request(msg, callback) {
	var res={};
	var experienceDetail = "SELECT * FROM LinkedIn.Experience_Details where User_ID="+"(Select User_ID from LinkedIn.User_Details where Email_ID = '" + msg.emailID + "'" +")";
	console.log("Query Experience Log : " + experienceDetail.toString());
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
				if (results.length > 0){
					console.log(results);
					var experience = JSON.stringify(results);
					
					res.code = "200";
					res.value = "Success";
					res.experienceDetail = experience;
					res.status = true;
					res.error = "none";
					console.log("User Experience Details Found Succesfully");
					callback(null, res);
				} else {
					console.log("User Experience Details Not Found");
					
					res.code = "200";
					res.value = "Fail";
					res.status = true;
					res.error = "none";	
					callback(null, res);
				}
		}
	}, experienceDetail);
}

exports.handle_getUserExperienceInfo_request = handle_getUserExperienceInfo_request;