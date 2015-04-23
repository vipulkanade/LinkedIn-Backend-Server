var mysql = require("./mysql");

function handle_sendConnectionRequest_request(msg, callback) {
	var res={};
	var sendConnectionRequest = "INSERT INTO LinkedIn.Invitation_Table (Invited_By_User_ID, Invited_To_User_ID, Status) VALUES ('"+ msg.senderUserID +"', '" + msg.sendRequestToUserID + "', '0');";
	
	console.log("Query userConnectionInvitation Log : " + sendConnectionRequest.toString());
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {				
			res.code = "200";
			res.value = "Success";
			res.status = true;
			res.error = "none";
			console.log("User Connection Invitation Accepted Succesfully");
			callback(null, res);
		}
	}, sendConnectionRequest);
}

exports.handle_sendConnectionRequest_request = handle_sendConnectionRequest_request;