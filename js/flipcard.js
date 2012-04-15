/**
 * Requires jQuery to work.
 */
Lottery.FlipCard = function FlipCard(config) {
	if( typeof (config) !== "object") {
		throw new TypeError("Config must be an object");
	}

	this.faces = [config["backContent"], config["faceContent"]].reverse();
	this.config = config;

	this.getContent = function() {
		// use as queue
		var next = this.faces.shift();
		this.faces.push(next);
		return next;
	};

	this.getId = function() {
		return this.config["flipboxId"];
	};

	this.isFront = false;

	this.uiFlip = function(content) {
		this.isFront = !this.isFront;
		if( typeof (content) !== "undefined") {
			this.isFront = true;
		}
		$("#{0}".format(this.getId())).flip({
			direction : 'tb',
			content : typeof (content) !== "undefined" ? content : this.getContent(),
			speed : 500,
			color : "#FFFFFF"
		});
	}
}