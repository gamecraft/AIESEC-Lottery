if( typeof (Lottery) === "undefined") {
	var Lottery = {};
	Lottery.gameConstants = {};
}
Lottery.gameConstants.ENTRY_FEE = 10;
// in percents
Lottery.gameConstants.BOOKS_AVAILABLE = true;

// reward name -> {name, description, chance of winning}
Lottery.gameConstants.rewards = {};

Lottery.gameConstants.rewards.TEAM_POINTS = {
	name : "TEAM_POINTS",
	description : "The reward is team points for 4% of entry fee",
	image : "images/team_points.png",
	chance : 30 // in percent
};

Lottery.gameConstants.rewards.BOOK = {
	name : "BOOK",
	description : "The player wins a book. There's a small ammount of books for winning.",
	image : "images/book.png",
	chance : 20  // in percent
};

Lottery.gameConstants.rewards.HELP_CARD = {
	name : "HELP_CARD",
	description : "The player receives a +1 help card.",
	image : "images/help_card.png",
	chance : 1  // in percent
};

Lottery.gameConstants.rewards.NEW_SKILL = {
	name : "NEW_SKILL",
	description : "One level of new skill.",
	image : "images/new_skill.png",
	chance : 1  // in percent
};

Lottery.gameConstants.rewards.SKILL_POINTS = {
	name : "SKILL_POINTS",
	description : "The players wins 2 skill points.",
	image : "images/skill_points.png",
	chance : 10  // in percent
};

Lottery.gameConstants.rewards.QUOTE = {
	name : "QUOTE",
	description : "The players wins a quote.",
	image : "images/quote.png",
	chance : 1  // in percent
};

Lottery.gameConstants.rewards.MODIFIER_BY_TWO = {
	name : "MODIFIER_BY_TWO",
	description : "New team points aquired are multiplied by two.",
	image : "images/modifier_x2.png",
	chance : 10  // in percent
};
