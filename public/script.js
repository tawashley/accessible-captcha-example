(function(window, undefined) {

	function init() {
		hitApi();
	}

	function hitApi() {
		var request = new XMLHttpRequest();
		request.open('GET', '/getCaptcha', true);

		request.onload = function() {
		  if (this.status >= 200 && this.status < 400) {
		    // Success!
		    var data = JSON.parse(this.response);
		    handleResponse(data)
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
		console.log(captchaJson);
	}

	init();

})(window)