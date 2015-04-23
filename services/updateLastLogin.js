var mysql = require("./mysql");

function getdatetime() {
	var currentdate = new Date(); 
	var datetime = currentdate.getFullYear() + "-"
	                + (currentdate.getMonth()+1)  + "-" 
	                + currentdate.getDate() + " "  
	                + currentdate.getHours() + ":"  
	                + currentdate.getMinutes() + ":" 
	                + currentdate.getSeconds();
	return datetime;
}

function handle_updateLastLogin_request(msg, callback) {
	var res={};
	var updateQuery="UPDATE LinkedIn.User_Details SET Last_Login='"+getdatetime()+"' WHERE User_ID='"+msg.userID+"'";
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
				if (!res.finished) {
					res.code = "200";
					res.value = "Success";
					res.status = true;
					res.error = "none";
					console.log("valid login");	
					callback(null, res);
				}
		}	
	}, updateQuery);
}

exports.handle_updateLastLogin_request = handle_updateLastLogin_request;