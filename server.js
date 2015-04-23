//super simple rpc server example
var amqp = require('amqp')
, util = require('util');

var login = require('./services/login');
var signUp = require('./services/signUpNewUser');
var getUserInfo = require('./services/getUserInfo');
var getUserEducationInfo = require('./services/getUserEducationInfo');
var getUserExperienceInfo = require('./services/getUserExperienceInfo');
var getUserSkillInfo = require('./services/getUserSkillInfo');
var updateBasicUserInfo = require('./services/updateBasicUserInfo');
var updateUserEducationInfo = require('./services/updateUserEducationInfo');
var updateUserExperienceInfo = require('./services/updateUserExperienceInfo');
var updateLastLogin = require('./services/updateLastLogin');
var addUserProfileDetails = require('./services/addUserProfileDetails');
var peopleSearch = require('./services/peopleSearch');
var getPendingConnectedSearchResult = require('./services/getPendingConnectedSearchResult');
var acceptUserConnectionInvitation = require('./services/acceptUserConnectionInvitation');
var sendConnectionRequest = require('./services/sendConnectionRequest');
var signOut = require('./services/signOut');


var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	console.log("Server is Listening");
	cnn.queue('login_queue', function(q){
		console.log("login_queue function");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("login_queue inside function");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			switch (message.type) {
				case "login":
					login.handle_login_request(message, function(err,res){
						util.log("Handle Login request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "signup":
					signUp.handle_sign_up_request(message, function(err,res){
						util.log("Handle SignUp request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "sign_out_user":
					signOut.handle_sign_out_request(message, function(err,res){
						util.log("Handle SignOut request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "update_last_login_detail":
					updateLastLogin.handle_updateLastLogin_request(message, function(err,res){
						util.log("Handle update last login request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
			}		
		});
	});
	
	cnn.queue('profile_queue', function(q){
		console.log("profile_queue function");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("inside profile_queue function");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			switch (message.type) {
				case "getuserinfo":
					getUserInfo.handle_getUserInfo_request(message, function(err,res){
						util.log("Handle Get User Info request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "get_user_education_info":
					getUserEducationInfo.handle_getUserEducationInfo_request(message, function(err,res){
						util.log("Handle Get User Education Info request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "get_user_experience_info":
					getUserExperienceInfo.handle_getUserExperienceInfo_request(message, function(err,res){
						util.log("Handle Get User Experience Info request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "get_user_skill_info":
					getUserSkillInfo.handle_getUserSkillInfo_request(message, function(err,res){
						util.log("Handle Get User Skill Info request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "update_basic_user_info":
					updateBasicUserInfo.handle_updateBasicUserInfo_request(message, function(err,res){
						util.log("Handle Update Basic Info request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "update_user_education_info":
					updateUserEducationInfo.handle_updateUserEducationInfo_request(message, function(err,res){
						util.log("Handle Update Education Info request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "update_user_experience_info":
					updateUserExperienceInfo.handle_updateUserExperienceInfo_request(message, function(err,res){
						util.log("Handle Update Experience Info request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "add_user_education":
					addUserProfileDetails.handle_addUserEducation_request(message, function(err,res){
						util.log("Handle Add Education Info request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "add_user_experience":
					addUserProfileDetails.handle_addUserExperience_request(message, function(err,res){
						util.log("Handle Add Experience Info request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "add_user_skill":
					addUserProfileDetails.handle_addUserSkill_request(message, function(err,res){
						util.log("Handle Add Skill Info request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
			}		
		});
	});
	
	cnn.queue('member_service_queue', function(q){
		console.log("member_service_queue function");
		q.subscribe(function(message, headers, deliveryInfo, m){
			console.log("member_service_queue inside function");
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			switch (message.type) {
				case "get_search_result":
					peopleSearch.handle_search_people_request(message, function(err,res){
						util.log("Handle People Search request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "get_connected_people_result":
					getPendingConnectedSearchResult.handle_connected_people_list_request(message, function(err,res){
						util.log("Handle Connected People Search request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "get_pending_connections_result":
					getPendingConnectedSearchResult.handle_pending_connections_list_request(message, function(err,res){
						util.log("Handle Pending Connections Search request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "accept_connection_invitation":
					acceptUserConnectionInvitation.handle_userConnectionInvitation_request(message, function(err,res){
						util.log("Handle User Connection Invitation request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
				
				case "send_connection_invitation":
					sendConnectionRequest.handle_sendConnectionRequest_request(message, function(err,res){
						util.log("Handle User Connection Invitation request: "+JSON.stringify(res));
						//return index sent
						cnn.publish(m.replyTo, res, {
							contentType:'application/json',
							contentEncoding:'utf-8',
							correlationId:m.correlationId
						});
					});
				break;
			}		
		});
	});
});