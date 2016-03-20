var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var captchaService = require('./captchaService');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')

app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	captchaService.getCaptcha(function(captchaData) {
  		res.render('index', {	
  			question: captchaData.q
  		});
	});
})

app.post('/submitCaptcha', function (req, res) {
	captchaService.validateCaptcha(req.body.captchaInput, function(captchaValidated) {
		var message = (captchaValidated) ? 'Correct!' : 'Incorrect!';

		res.render('captureSubmitted', {
			isCorrect: captchaValidated,
			text: message
		});
	})
});

app.get('/submitCaptchaApi', function (req, res) {
	captchaService.validateCaptcha(req.query.captchaInput, function(captchaValidated) {
		var message = (captchaValidated) ? 'Correct!' : 'Incorrect!';

		res.json({
			isCorrect: captchaValidated,
			text: message
		});
	})
});

app.listen(3000, function () {
  console.log('App reading and waiting on localhost:3000');
});