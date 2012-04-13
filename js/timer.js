var Timer = function(element) {
	this.element = element;

	this.setTimeout = function(val) {
		this.timeout = val;
		this.current = val;
		$(this.element).html(val);
	}

	this.start = function() {
		var that = this;
		this.clearCode = setInterval(function() {
			if(that.current < 0) {
				// dispatch event
				console.log("Timer ended")
				clearInterval(that.clearCode);
				return false;
			}
			that.current--;
			$(that.element).html(that.current);
		}, 1000);
	}

	this.reset = function() {
		clearInterval(this.clearCode);
		this.setTimeout(this.timeout);
	}
};
