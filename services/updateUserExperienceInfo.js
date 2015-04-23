var mysql = require("./mysql");

function handle_updateUserExperienceInfo_request(msg, callback) {
	var res={};
	if (msg.field === 'Start_Date' || msg.field === 'End_Date') {
		var d = new Date(msg.name);
		msg.name = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
	}
	var updateUser = "UPDATE LinkedIn.Experience_Details SET "+ msg.field +"='"+ msg.name +"' where User_ID="+msg.userID + " AND Exp_ID = " + msg.expID;
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

exports.handle_updateUserExperienceInfo_request = handle_updateUserExperienceInfo_request;