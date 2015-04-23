
var ejs = require("ejs");
var mysql = require("./mysql");
var passwordHash = require("password-hash");
var jwt = require('jwt-simple');

/*function getdatetime() {
	var currentdate = new Date(); 
	var datetime = currentdate.getFullYear() + "-"
	                + (currentdate.getMonth()+1)  + "-" 
	                + currentdate.getDate() + " "  
	                + currentdate.getHours() + ":"  
	                + currentdate.getMinutes() + ":" 
	                + currentdate.getSeconds();
	return datetime;
}*/

function handle_login_request(msg, callback){	
	var res = {};
	var userID ;
	var getUser = "SELECT Password, User_ID, Last_Login FROM LinkedIn.User_Details where Email_ID='"+msg.email+"'";
	console.log("Query Login Log : " + getUser.toString());
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
			if((results.length > 0) && (passwordHash.verify(msg.password,results[0].Password))){
					var expires = 700000;
					var token = jwt.encode({
					  iss: msg.email + msg.password,
					  exp: expires
					}, "anystringshouldwork");
					var user = results[0];
					userID = user.User_ID;
					
					res.code = "200";
					res.value = "Success";
					res.status = true;
					res.lastlog = user.Last_Login;
					res.token = token;
					res.userID = userID;
					res.emailID = msg.email;
					res.error = "none";
					console.log("valid login");	
					callback(null, res);
					/*var updateQuery="UPDATE LinkedIn.User_Details SET Last_Login='"+getdatetime()+"' WHERE User_ID='"+results[0].User_ID+"'";
					
					mysql.fetchData(function(err,results){
						if(err) {
							console.log(err);
							console.log(results);
							console.log(err.code);
							
							if (results === '503') {
								res.code = "503";
								res.value = "Service Unavailable"
								console.log("503 Sent");
								callback(null, res);
							} 
						} else {
								if (!res.finished) {
									res.code = "200";
									res.value = "Success";
									res.status = true;
									res.lastlog = user.Last_Login;
									res.token = token;
									res.userID = userID;
									res.emailID = msg.email;
									res.error = "none";
									console.log("valid login");	
									callback(null, res);
								}
						}	
					}, updateQuery);*/
				//}
			} else {
				console.log("Invalid Login");
				res.code = "401";
				res.value = "User not Valid";
				callback(null, res);
			}		
		}
	}, getUser);
	
}

exports.handle_login_request = handle_login_request;