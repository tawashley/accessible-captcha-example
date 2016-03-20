(function() {

	var helpersApi = {};

	helpersApi.test = function() {
		console.log('hits helper test');
	}

	helpersApi.request = function(options) {
		var request = new XMLHttpRequest();

		var method = options.method.toUpperCase() || 'GET';
		var url = options.url;
		var callback = options.complete || function() {};
		var isJson = options.json || false;

		request.open(method, url, true);

		request.onload = function() {
		  if (this.status >= 200 && this.status < 400) {
		    // Success!
		    var response = (isJson) ? JSON.parse(this.response) : this.response;
		    callback(response);
		  } else {
		    // We reached our target server, but it returned an error

		  }
		};

		request.onerror = function() {
		  // There was a connection error of some sort
		};

		request.send();
	}

	window.helpers = helpersApi;

})(window)