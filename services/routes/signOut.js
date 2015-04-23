var clientURL = 'http://10.0.0.208:3232';

function signOut(req, res) {
	
		req.session.destroy();
		res.header('Access-Control-Allow-Origin', clientURL );
		res.header("Access-Control-Allow-Credentials", true);
				
		res.send({
		"status":true,
		"error" : "none"
		});
		console.log("Signout Succesful");	
}

exports.signOut = signOut;