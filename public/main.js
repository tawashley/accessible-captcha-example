(function(helpers, undefined) {

	function init() {
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
			json: true,
			complete: outputCaptchaResult
		})
	}

	function outputCaptchaResult(data) {
		var resultOutput = document.querySelector('[data-captcha-answer]');
		var CssClass = (data.isCorrect) ? 'is--correct' : 'is--incorrect';

		resultOutput.classList.remove('is--correct');
		resultOutput.classList.remove('is--incorrect');
		resultOutput.classList.add(CssClass);

		resultOutput.innerHTML = data.text;
	}

	init();

})(window.helpers)