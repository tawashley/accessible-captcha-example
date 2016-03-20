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
  		res.json({	
  			question: captchaData.q
  		});
	});
});

app.post('/submitCaptcha', function (req, res) {
	handleCaptchaInput(req, res);
});

app.get('/submitCaptchaApi', function (req, res) {
	handleCaptchaInput(req, res);
});

app.listen(3000, function () {
  console.log('App reading and waiting on localhost:3000');
});

function handleCaptchaInput(request, response) {
	var captchaInput = request.query.captchaInput || request.body.captchaInput;

	captchaService.validateCaptcha(captchaInput, function(captchaValidated) {
		var message = (captchaValidated) ? 'Correct!' : 'Incorrect!' ;
		response.json({
			isCorrect: captchaValidated,
			text: message
		});
	})
}