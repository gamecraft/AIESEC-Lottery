// after gameconstants.js is loaded
// requires jQuery
Lottery.FlipCardsTable = {};
Lottery.gameConfig = {};

Lottery.UI = {
	updateTeamScore : function() {
		$("#teamScore").html(Lottery.gameConfig["teamScore"]);
	},
	updateJokersAmount : function() {
		$("#jokersCount").html(Lottery.gameConfig["jokersCount"]);
	},
	startJokersTimer : function() {

	},
	stopJokersTimer : function() {

	},
	updateRounds : function() {
		$("#roundNumber").html(Lottery.gameConfig["currentRound"]);
	}
};

Lottery.setup = function() {
	console.log("GAME HAS STARTED");

	var initialConfig = {
		"teamScore" : 10,
		"currentRound" : 1,
		"totalRounds" : 20,
		"roundTime" : 30, // seconds
		"jokersCount" : 10,
		"jokersTimeout" : 15, // seconds
		"timer" : null
	};
	Lottery.gameConfig = initialConfig;

	Lottery.UI.updateTeamScore();
	Lottery.UI.updateJokersAmount();
	Lottery.UI.updateRounds();
	$("#totalRounds").html(Lottery.gameConfig["totalRounds"]);

	Lottery.gameConfig["timer"] = new Timer("#timer");
	Lottery.gameConfig["timer"].setTimeout(Lottery.gameConfig["roundTime"])
};

Lottery.changeRound = function() {
	Lottery.gameConfig["timer"].reset();

	Lottery.gameConfig["currentRound"]++;
	if(Lottery.gameConfig["currentRound"] > Lottery.gameConfig["totalRounds"]) {
		alert("The game has ended!");
		clearInterval(Lottery.gameConfig["clearCode"]);
		return;
	}
	Lottery.UI.updateRounds();
	console.log("New round has started");
	Lottery.gameConfig["timer"].start();
}

Lottery.start = function() {
	// start round timer
	Lottery.gameConfig["clearCode"] = setInterval(Lottery.changeRound, Lottery.gameConfig["roundTime"] * 1000);
	Lottery.gameConfig["timer"].start();
}

Lottery.turnAllCards = function() {
	for(var flipCardId in Lottery.FlipCardsTable) {
		if(Lottery.FlipCardsTable.hasOwnProperty(flipCardId)) {
			if(Lottery.FlipCardsTable[flipCardId].isFront === true) {
				Lottery.FlipCardsTable[flipCardId].uiFlip();
			}
		}
	}
};

Lottery.isWinning = function(rewardObject, percent, lastBound) {
	if( typeof (rewardObject.chance) !== "undefined") {
		return percent >= lastBound && percent <= rewardObject.chance + lastBound - 1;
	}

	return false;
};

Lottery.percentageSum = (function() {
	var sum = 0;
	var rewards = Lottery.gameConstants.rewards;
	for(reward in rewards) {
		if(rewards.hasOwnProperty(reward) && typeof (rewards[reward]) !== "function") {
			sum += rewards[reward].chance;
		}
	}
	return sum;
})();

Lottery.play = function() {
	var drawPercent = Lottery.randomBetween(1, Lottery.percentageSum), rewards = Lottery.gameConstants.rewards;
	console.log(drawPercent);

	var bound = 1;

	for(var reward in rewards) {
		if(rewards.hasOwnProperty(reward)) {
			if(Lottery.isWinning(rewards[reward], drawPercent, bound)) {
				return rewards[reward];
			} else {
				bound += rewards[reward].chance;
			}
		}
	}
	return rewards.QUOTE;
};
