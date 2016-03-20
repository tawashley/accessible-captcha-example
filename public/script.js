(function(window, undefined) {

	function init() {
		hitApi();
		bindEvents();
	}

	function bindEvents() {
		var form = document.querySelector('[data-captcha-form]');

		form.addEventListener('submit', function(event) {

			event.preventDefault();

			var captchaValue = encodeURIComponent(document.querySelector('[data-captcha-value]').value);

			console.log(captchaValue);

			var request = new XMLHttpRequest();

			request.open('GET', '/submitCaptchaApi?captchaInput=' + captchaValue, true);

			request.onload = function() {
			  if (this.status >= 200 && this.status < 400) {
			    // Success!
			    console.log(this.response);
			  } else {
			    // We reached our target server, but it returned an error
			  }
			};

			request.onerror = function() {
			  // There was a connection error of some sort
			};

			request.send();
		})
	}

	function hitApi() {
		var request = new XMLHttpRequest();
		request.open('GET', '/getCaptcha', true);

		request.onload = function() {
		  if (this.status >= 200 && this.status < 400) {
		    // Success!
		    handleResponse(JSON.parse(this.response))
		  } else {
		    // We reached our target server, but it returned an error
		  }
		};

		request.onerror = function() {
		  // There was a connection error of some sort
		};

		request.send();
	}

	function handleResponse(captchaJson) {
		var questionElement = document.querySelector('[data-captcha-answer]');

		questionElement.innerHTML = captchaJson.q;
	}

	init();

})(window)