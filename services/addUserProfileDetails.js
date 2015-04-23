var mysql = require("./mysql");

function handle_addUserEducation_request(msg, callback) {
	var res={};
	var addEduQuery="INSERT INTO LinkedIn.Education_Details(User_ID, Degree, University_Name, Courses, Year_of_Joining, Year_of_Ending) VALUES ("+msg.userID+", '"+msg.Degree+"', '"+msg.University_Name+"', '"+msg.Courses+"', '"+msg.YOJ+"', '"+msg.YOE+"');";
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
			res.code = "200";
			res.value = "Success";
			res.status = true;
			res.error = "none";
			console.log("User Education Record Added Succesfully");
			callback(null, res);		
		}
	}, addEduQuery);
}

function handle_addUserExperience_request(msg, callback) {
	var res={};
	var addExpQuery="Insert into LinkedIn.Experience_Details (User_ID,Company_Name,Start_Date,End_Date,Job_Title,Job_Profile) " +
	"values ('"+msg.userID+"','"+msg.company+"','"+msg.startDate+"','"+msg.endDate+"','"+msg.jobTitle+"','"+msg.jobDesc+"'); " ;
	console.log("Query handle_addUserExperience_request Log : " + addExpQuery.toString());
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
			res.code = "200";
			res.value = "Success";
			res.status = true;
			res.error = "none";
			console.log("User Experience Record Added Succesfully");
			callback(null, res);		
		}
	}, addExpQuery);
}

function handle_addUserSkill_request(msg, callback) {
	var res={};
	var addSkillQuery="INSERT INTO LinkedIn.Skill_Details(User_ID, Skill_Name) VALUES ("+msg.userID+", '"+msg.skill+"');";
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
			res.code = "200";
			res.value = "Success";
			res.status = true;
			res.error = "none";
			console.log("User Education Record Added Succesfully");
			callback(null, res);		
		}
	}, addSkillQuery);
}

exports.handle_addUserEducation_request = handle_addUserEducation_request;
exports.handle_addUserExperience_request = handle_addUserExperience_request;
exports.handle_addUserSkill_request = handle_addUserSkill_request;