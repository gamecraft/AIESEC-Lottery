if( typeof (Lottery) === "undefined") {
	var Lottery = {};
	Lottery.gameConstants = {};
}

// reward name -> {name, description, chance of winning}
Lottery.gameConstants.rewards = {};

Lottery.gameConstants.rewards.GAIN_15_POINTS = {
	name : "GAIN_15_POINTS",
	description : "Gain 15 points",
	image : "images/team_points.png",
	chance : 20, // in percent
	effect : function(gameConfig, modifier) {
		gameConfig["teamScore"] += 15 * modifier;
		return gameConfig;
	}
};

Lottery.gameConstants.rewards.GAIN_25_POINTS = {
	name : "GAIN_25_POINTS",
	description : "Gain 25 points",
	image : "images/book.png",
	chance : 17.5, // in percent
	effect : function(gameConfig, modifier) {
		gameConfig["teamScore"] += 25 * modifier;
		return gameConfig;
	}
};

Lottery.gameConstants.rewards.GAIN_40_POINTS = {
	name : "GAIN_40_POINTS",
	description : "Gain 40 points",
	image : "images/help_card.png",
	chance : 10, // in percent
	effect : function(gameConfig, modifier) {
		gameConfig["teamScore"] += 40 * modifier;
		return gameConfig;
	}
};

Lottery.gameConstants.rewards.GAIN_2_JOKERS = {
	name : "GAIN_2_JOKERS",
	description : "Jokers count + 2",
	image : "images/new_skill.png",
	chance : 15, // in percent
	effect : function(gameConfig, modifier) {
		gameConfig["jokersCount"] += 2 * modifier;
		return gameConfig;
	}
};

Lottery.gameConstants.rewards.LOSE_15_POINTS = {
	name : "LOSE_15_POINTS",
	description : "Lose 15 points.",
	image : "images/skill_points.png",
	chance : 17.5, // in percent
	effect : function(gameConfig, modifier) {
		gameConfig["teamScore"] -= 15 * modifier;
		return gameConfig;
	}
};

Lottery.gameConstants.rewards.LOSE_30_POINTS = {
	name : "LOSE_30_POINTS",
	image : "images/quote.png",
	description : "Lose 30 points",
	chance : 12.5, // in percent
	effect : function(gameConfig, modifier) {
		gameConfig["teamScore"] -= 30 * modifier;
		return gameConfig;
	}
};

Lottery.gameConstants.rewards.BOMB = {
	name : "BOMB",
	description : "Lose 75% of total score",
	image : "images/modifier_x2.png",
	chance : 7.5, // in percent
	effect : function(gameConfig, modifier) {
		gameConfig["teamScore"] -= 0.75 * gameConfig["teamScore"] * modifier;
		return gameConfig;
	}
};
