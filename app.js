var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var captchaService = require('./captchaService');

app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(express.static(__dirname + '/public'));

app.get('/getCaptcha', function (req, res) {
	captchaService.getCaptcha(function(captchaData) {
  		res.send(captchaData);
	});
});

app.post('/submitCaptcha', function (req, res) {
	captchaService.validateCaptcha(req.body.captchaInput, function(captchaValidated) {
		var message = (captchaValidated) ? 'Correct!' : 'Incorrect!' ;
		res.send(message);
	})

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

