/*
* get course list
*/
var respon = function(res, str, code){
	//var mes = JSON.stringify(str);
	res.writeHead(code,{'Content-Type':'text/plain'});
	if(str.length > 0){
		res.write(str);
	}
	res.end();
};
var fs = require('fs');
exports.getallcourse = function(req, res) {
	var key = req.headers['x-edx-api-key'];
	var access = req.headers['authorization'];
	if (key != '1234567890' || access.length < 10){
		res.writeHead(403, {"Content-Type":"application/json"});
		//res.send("heh");
		res.end();
		return;
	}
	fs.readFile('coursedata', 'utf-8', function(err,data) {
		var courses = data.split(/\n/);
		var response = "";
		var mark = 1;
		for(var i = courses.length; i --;){
			if(courses[i].length > 0){
			console.log(courses[i]);
			fs.readFile('data/' + courses[i], 'utf-8', function(err, data) {
				if ( response.length > 0){
					response = response + ',';
				}
				console.log(i);
				console.log(data);
				mark ++;
				console.log(mark);
				response = response + '{' + data + '}';
				if(mark == courses.length) {
					response = '[' + response + ']';
					var back = '{"status" : "success",'
						 + '"courses" :' +  response + '}';
					respon(res, back, 200);
				}
			});}
		}
	});
};

exports.getenrollcourse = function(req, res) {
	var key = req.headers['x-edx-api-key'];
	var access = req.headers['authorization'];
	if (key != '1234567890' || access.length < 10){
		res.writeHead(403, {"Content-Type":"application/json"});
		//res.send("heh");
		res.end();
		return;
	}
	fs.readFile('data/' + access, 'utf-8', function(err,data) {
		var courses = data.split(/\n/);
		var mark = 1;
		var response = "";
		for(var i = courses.length; i --;){
			if (courses[i].length > 0)
			fs.readFile('data/' + courses[i], 'utf-8', function(err, data) {
				if ( response.length > 0){
					response = response + ',';
				}
				mark ++;
				response = response + '{' + data + '}';
				if(mark == courses.length) {
					response = '[' + response + ']';
					var back = '{ "enrollments" : '+ response +'}';
					respon(res, back, 200);
				}
			});
		}
	});
};
