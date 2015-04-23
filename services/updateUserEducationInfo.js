var mysql = require("./mysql");

function handle_updateUserEducationInfo_request(msg, callback) {
	var res={};
	if (msg.field === 'Year_of_Joining' || msg.field === 'Year_of_Ending') {
		var d = new Date(msg.name);
		msg.name = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	}
	var updateUser = "UPDATE LinkedIn.Education_Details SET "+ msg.field +"='"+ msg.name +"' where User_ID="+msg.userID + " AND Edu_ID = " + msg.eduID;
	console.log("Query Log : " + updateUser.toString());
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {				
			res.code = "200";
			res.value = "Success";
			res.status = true;
			res.error = "none";
			console.log("User Education Record Updated Succesfully");
			callback(null, res);
		}
	}, updateUser);
}

exports.handle_updateUserEducationInfo_request = handle_updateUserEducationInfo_request;