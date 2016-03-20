var express = require('express');
var app = express();

var captchaService = require('./captchaService');

app.use(express.static(__dirname + '/public'));

app.get('/getCaptcha', function (req, res) {
	captchaService.getCaptcha(function(captchaData) {
  		res.send(captchaData);
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

