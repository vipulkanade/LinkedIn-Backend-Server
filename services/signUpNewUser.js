var ejs = require("ejs");
var mysql = require("./mysql");
var passwordHash = require("password-hash");
var jwt = require('jwt-simple');

function checkForExistingUser(newUserEmail, callback) {
	var getUser = "select * from User_Details where Email_ID='" + newUserEmail + "'";
	console.log("Query is:" + getUser);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			callback(err, results.length > 0);
		}
	}, getUser);
}


function handle_sign_up_request(msg, callback) {
	var res = {};
	checkForExistingUser(msg.emailID,function(err,results){
		if(results){
			res.status = true;
			res.userAlreadyPresent = true;
			res.code = 200;
			res.error = "none";
			console.log("valid login");	
			callback(null, res);
			} else {
				var hashedpassword = passwordHash.generate(msg.password);
				console.log(hashedpassword);
				var insertUserQuery="INSERT into LinkedIn.User_Details(User_Name,Email_ID,Password) VALUES('"+msg.name+"','"+ 
				msg.emailID+"','"+hashedpassword+"');";
				
					mysql.fetchData(function(err,results){
						if(err) {
							throw err;
						} else {
							console.log(results);
							var expires = 700000;
							var token = jwt.encode({
							  iss: msg.emailID,
							  exp: expires
							}, "anystringshouldwork");
							
							res.token = token;
							res.status = true;
							res.code = 200;
							res.userAlreadyPresent = false;
							res.error = "none";
							console.log("valid login");	
							callback(null, res);
						}
					}, insertUserQuery);
			}
	});
}

exports.handle_sign_up_request = handle_sign_up_request;