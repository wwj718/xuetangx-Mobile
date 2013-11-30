/*
* Post response.
email username fullname password
*/
function Isyx(yx){
 var reyx= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
 return(reyx.test(yx));
}
var respon = function(res, str, code){
	var mes = JSON.stringify(str);
	res.writeHead(code,{'Content-Length':mes.length,  'Content-Type':'application/json'});
	console.log(JSON.stringify(str));
	res.write(JSON.stringify(str));
	console.log(JSON.stringify(str));
	//res.send(300, JSON.stringify(str));
	res.end();
};
var fs = require('fs');
exports.register = function(req, res) {
	var key = req.headers['x-edx-api-key'];
	//var access = req.headers['Authorization'];
	var items = req.headers;
	for(var it in items){
		console.log(it + ":" + items[it]);
	}
	if(key != '1234567890'){
		console.log(key);
		res.writeHead(403, {"Content-Type":"application/json"});
		//res.send("heh");
		res.end();
		return;
	}
	var email = req.body.email;
	var username  = req.body.username;
	var full_name = req.body.full_name;
	var password = req.body.password;
	if (email == undefined || username == undefined || full_name == undefined || password == undefined) {
		var back = {
			err_type: 'MissingParameter',
			err_msg: 'Missing required parameters'
		};
		console.log("miss");
		respon(res, back, 400);
		return;
	}
	if(password.length < 5){
		var back = {
			err_type: 'InvalidPassword',
			err_msg: 'Password provided is invalid'
		};
		console.log("password");
		respon(res, back, 400);
		return;
	}
	if(!Isyx(email)) {
		var back = {
			err_type: 'InvalidEmail',
			err_msg: 'Email provided is invalid'
		};
		respon(res, back, 400);
		return;
	}
	fs.writeFile('test2', 'tete', 'utf-8', function(err){});
	fs.readFile('userdata', 'utf-8',function(err, data) {
		var back = {
			err_type: 'UserAlreadyExists',
			err_msg: 'User Already Exists'
		};
		console.log(data);
		var datas = data.split(/\n/);
		console.log(datas.length);
		for(var i = datas.length; i--;) {
			var item = datas[i];
			var items = item.split(/\t/);
			console.log(items.length);
			console.log(items[0] + " " + items[1]);
			if(items[0]  == email || items[1] == username) {
				console.log("exist");
				respon(res, back, 400);
				return ;
			}
		}
		res.writeHead(200, {"Content-Type":"application/json"});
		res.end();
		var newItem = email + '\t' + username + '\t' + full_name + '\t' + password + '\n';
		fs.appendFile('userdata', newItem, 'utf-8', function(err){
			console.log(err);
		});
		fs.writeFile('data/0987654321'+username,"", 'utf-8', function(err){
			if(err){
				console.log(err);
			}
		});
		
	});
	//console.log(content);
};
