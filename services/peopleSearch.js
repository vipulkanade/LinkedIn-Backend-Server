var mysql = require("./mysql");
var searchPeopleList;

function searchResult(msg, callback) {
	var res={};
	var searchQuery = "SELECT User_Details.User_ID,User_Details.Profile_Image_URL,User_Details.Country,User_Details.Professional_Headline,User_Details.User_Name,Invitation_Table.Status from User_Details LEFT JOIN Invitation_Table On User_Details.User_ID=Invitation_Table.Invited_To_User_ID where User_Details.User_Name like '%"+ msg.searchString+"%';";
	
	mysql.fetchData(function(err,results){
		if(err) {
			throw err;
		} else {
			if (results.length > 0){
				console.log(results);
				searchPeopleList = JSON.stringify(results);
				
				res.status = true;
				res.code = 200;
				res.error = "none";
				res.search = searchPeopleList;
				console.log("User Found Succesfully");
				callback(null, res);
			} else {
				console.log("Details Not Present");

				res.status = true;
				res.code = 200;
				res.error = "User Not Found";
				callback(null, res);
			}
		}
	}, searchQuery);
}

exports.handle_search_people_request = searchResult;