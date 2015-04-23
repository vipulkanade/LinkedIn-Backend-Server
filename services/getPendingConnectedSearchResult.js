var mysql = require("./mysql");
var connectedPeopleList;

function handle_pending_connections_list_request(msg, callback) {
	var res={};
	var pendingConnection = "select * from User_Details where User_ID in(select Invited_By_User_ID from Invitation_Table where Invited_To_User_ID="+ msg.userID +" and Status="+0+");";
	console.log("Query Log : " + pendingConnection.toString());
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
			if (results.length > 0){
				console.log(results);
				var pendingConnectionList = JSON.stringify(results);
				
				res.code = "200";
				res.value = "Success";
				res.status = true;
				res.error = "none";
				res.pendingConnectionList = pendingConnectionList;
				console.log("Users Found Succesfully");	
				callback(null, res);
				
			} else {
				console.log("Details Not Present");
				
				res.code = "200";
				res.value = "Success";
				res.status = true;
				res.error = "none";
				callback(null, res);
			}
		}
	}, pendingConnection);
}

function handle_connected_people_list_request(msg, callback) {
	var res={};
	var connectedPeople = "select * from User_Details where User_ID in(select Invited_To_User_ID from Invitation_Table where Invited_By_User_ID="+ msg.userID +" and Status="+1+") OR User_ID in (select Invited_By_User_ID from Invitation_Table where Invited_To_User_ID = "+ msg.userID +" and Status=1);";
	console.log("Query Log : " + connectedPeople.toString());
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
			if (results.length > 0){
				console.log(results);
				connectedPeopleList = JSON.stringify(results);

				res.code = "200";
				res.value = "Success";
				res.status = true;
				res.error = "none";
				res.connectedPeopleList = connectedPeopleList;
				console.log("Users Found Succesfully");	
				callback(null, res);
				
			} else {
				console.log("Details Not Present");
				
				res.code = "200";
				res.value = "Success";
				res.status = true;
				res.error = "none";
				callback(null, res);
			}
		}
	}, connectedPeople);
}

exports.handle_connected_people_list_request = handle_connected_people_list_request;
exports.handle_pending_connections_list_request = handle_pending_connections_list_request;