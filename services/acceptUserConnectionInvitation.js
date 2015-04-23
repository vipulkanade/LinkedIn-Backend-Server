var mysql = require("./mysql");

function handle_userConnectionInvitation_request(msg, callback) {
	var res={};
	var acceptUserConnection = "UPDATE LinkedIn.Invitation_Table SET Status = 1 where Invited_By_User_ID = " + msg.senderUserID + " And Invited_To_User_ID = " + msg.acceptorUSerID;
	console.log("Query userConnectionInvitation Log : " + acceptUserConnection.toString());
	
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
	}, acceptUserConnection);
}

exports.handle_userConnectionInvitation_request = handle_userConnectionInvitation_request;