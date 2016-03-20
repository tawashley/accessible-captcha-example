var request = require('request');

var captchaServiceApi = {};

captchaServiceApi.getCaptcha = function(callback) {
	request('http://api.textcaptcha.com/bob.json', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    callback(JSON.stringify(body));
	  }
	})
}

module.exports = captchaServiceApi;