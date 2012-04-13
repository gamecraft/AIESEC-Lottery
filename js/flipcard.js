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
		console.log("Doing an UI flip, nothing is drawed");
		this.isFront = !this.isFront;
		$("#{0}".format(this.getId())).flip({
			direction : 'tb',
			content : this.getContent(),
			speed : 500,
			color : "#FFFFFF"
		});
	}

	this.flip = function(giveReward/*bool*/, flipContent) {
		var isFront = this.isFront;
		if(isFront && giveReward == true) {
			var reward = Lottery.play(function() {
				return true;
				// for testing right now
			});
		}
		var content = "";
		var cardId = this.config["flipboxId"];

		// determine the content
		if( typeof (flipContent) !== "undefined") {
			content = "<img src={0} />".format(flipContent);
		} else {
			content = (isFront && giveReward) ? "<img src={0} />".format(reward.image) : this.getContent();
		}
		this.isFront = !this.isFront;

		$("#{0}".format(cardId)).flip({
			direction : 'tb',
			content : content/*turns this.isFront*/,
			speed : 500,
			color : "#FFFFFF",
			onEnd : function() {
				if( typeof (reward) !== "undefined") {
					Lottery.turnAllCards([cardId], reward)
				}
			}
		});
	};
	// add click handler
	var targetObj = this;
	$("#{0}".format(config["flipboxId"])).bind("click", {
		context : targetObj
	}, function(event) {
		event.data.context.uiFlip();
	});
}