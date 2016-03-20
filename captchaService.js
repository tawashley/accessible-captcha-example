var request = require('request');
var md5 = require('md5');

var _captchaData;
var captchaServiceApi = {};

var API_BASE_URL = "http://api.textcaptcha.com/"
var API_ID = "trisashley@gmail.com"
var API_FORMAT = ".json"


captchaServiceApi.getCaptcha = function(callback) {
	request(getCaptchaApiUrl(), function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	_captchaData = JSON.parse(body);

	    callback(_captchaData);
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

function getCaptchaApiUrl() {
	return API_BASE_URL + API_ID + API_FORMAT;
}

module.exports = captchaServiceApi;