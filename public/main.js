(function(helpers, undefined) {

	function init() {
		getCaptcha();
		bindEvents();
	}

	function bindEvents() {
		var form = document.querySelector('[data-captcha-form]');

		form.addEventListener('submit', handleFormSubmit);
	}

	function handleFormSubmit(event) {
		event.preventDefault();
		var captchaValue = encodeURIComponent(document.querySelector('[data-captcha-value]').value);

		helpers.request({
			method: 'GET',
			url: '/submitCaptchaApi?captchaInput=' + captchaValue,
			complete: outputCaptchaResult
		})
	}

	function outputCaptchaResult(data) {
		var resultOutput = document.querySelector('[data-captcha-answer]');

		resultOutput.innerHTML = data;
	}

	function getCaptcha() {
		helpers.request({
			method: 'GET',
			url: '/getCaptcha',
			json: true,
			complete: outputCaptchaQuestion
		})
	}

	function outputCaptchaQuestion(captchaJson) {
		var questionElement = document.querySelector('[data-captcha-question]');
		questionElement.innerHTML = captchaJson.question;
	}

	init();

})(window.helpers)