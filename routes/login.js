/*
* Post login
*/
var respon = function(res, str, code){
	res.writeHead(code,{'Content-Length':str.length,  'Content-Type':'application/json'});
	if(str.length > 0){
		res.write(str);
	}
	res.end();
};
var fs = require('fs');
exports.login = function(req, res) {
	console.log(req.body+'');
	var key = req.headers['x-edx-api-key'];
	var access = req.headers['Authorization'];
	console.log(access);
	if (key != '1234567890'){
		console.log(access);
		res.writeHead(403, {"Content-Type":"text/plain"});
		//res.send("heh");
		res.end();
		return;
	}
	var body = req.body;
	var clientId = body.client_id;
	var clientSecret = body.client_secret;
	var grant = body.grant_type;
	var username = body.username;
	var password = body.password;
	fs.readFile('userdata', 'utf-8', function(err, data){
		if (err) {
			respon(res, "", 500);
		}else {
			var users = data.split(/\n/);
			for(var i = users.length; i -- ;){
				var item = users[i];
				var items = item.split(/\t/);
				if (items[0] == username && items[3] == password) {
					console.log(username);
					var back = '{"access_token": "0987654321' + items[1] +'",' 
						 + '"scope": "read", "expires_in": 86399,'+ 
						'"refresh_token": "0987654321' + items[1]  + 'refresh"}';
					respon(res, back, 200);
					return;
				}
			}
			//@TODO (need to look at django-oauth2-provider)
			res.writeHead(404, {"Content-Type":"application/json"});
			res.end();
		}
	});
};
