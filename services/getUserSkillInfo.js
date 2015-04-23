var mysql = require("./mysql");

function handle_getUserSkillInfo_request(msg, callback) {
	var res={};
	var skillDetail = "SELECT * FROM LinkedIn.Skill_Details where User_ID="+"(Select User_ID from LinkedIn.User_Details where Email_ID = '" + msg.emailID + "'" +")";
	console.log("Query getUserSkillInfo Log : " + skillDetail.toString());
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
			if (results.length > 0){
				console.log(results);
				skillDetail = JSON.stringify(results);
				
				res.code = "200";
				res.value = "Success";
				res.status = true;
				res.skillDetail = skillDetail;
				res.error = "none";	
				console.log("User Skill Info Found Succesfully");	
				callback(null, res);	
			} else {
				console.log("User Skill Info Not Present");
				
				res.code = "200";
				res.value = "Fail";
				res.status = true;
				res.error = "none";	
				callback(null, res);
			}
		}
	}, skillDetail);
}

exports.handle_getUserSkillInfo_request = handle_getUserSkillInfo_request;