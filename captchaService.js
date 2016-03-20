var request = require('request');
var md5 = require('md5');

var _captchaData;
var captchaServiceApi = {};

captchaServiceApi.getCaptcha = function(callback) {
	request('http://api.textcaptcha.com/bob.json', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	_captchaData = JSON.parse(body);

	    callback(body);
	  }
	})
}

captchaServiceApi.validateCaptcha = function(answer, callback) {
	var isCorrect = false;
	var answerMd5 = md5(answer.toLowerCase());

	for (var i = 0; i < _captchaData.a.length; i++) {

		if(_captchaData.a[i] === answerMd5) {
			isCorrect = true;
		}
	}

	callback(isCorrect);
}

module.exports = captchaServiceApi;