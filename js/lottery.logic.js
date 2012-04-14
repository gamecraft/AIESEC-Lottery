// after gameconstants.js is loaded
// requires jQuery
Lottery.FlipCardsTable = {};
Lottery.gameConfig = {};

Lottery.UI = {
	updateUI : function() {
		Lottery.UI.updateTeamScore();
		Lottery.UI.updateJokersAmount();

	},
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
	},
	disableJokerButtons : function() {
		$(".joker").attr("disabled", "disabled");
	},
	turnAllCards : function() {
		for(var flipCardId in Lottery.FlipCardsTable) {
			if(Lottery.FlipCardsTable.hasOwnProperty(flipCardId)) {
				if(Lottery.FlipCardsTable[flipCardId].isFront === true) {
					Lottery.FlipCardsTable[flipCardId].uiFlip();
				}
			}
		}
	},
	attachCardHandlers : function() {
		$(".flipbox").bind("click", {}, function() {
			console.log($(this).attr("id"));
			var reward = Lottery.play();
			Lottery.gameConfig = reward.effect(Lottery.gameConfig);
			Lottery.FlipCardsTable[$(this).attr("id")].uiFlip();
			console.log(reward.description);
			Lottery.UI.updateUI();
		});
	},
	deattachCardHandlers : function() {
		$(".flipbox").unbind("click");
	}
};

Lottery.setup = function() {
	var initialConfig = {
		"teamScore" : 10,
		"currentRound" : 1,
		"totalRounds" : 20,
		"roundTime" : 30, // seconds
		"jokersCount" : 10,
		"jokersTimeout" : 15, // seconds
		"roundTimer" : null,
		"jokersTimer" : null
	};
	Lottery.gameConfig = initialConfig;

	Lottery.UI.updateTeamScore();
	Lottery.UI.updateJokersAmount();
	Lottery.UI.updateRounds();
	$("#totalRounds").html(Lottery.gameConfig["totalRounds"]);

	Lottery.gameConfig["roundTimer"] = new Timer("#timer");
	Lottery.gameConfig["roundTimer"].setTimeout(Lottery.gameConfig["roundTime"])

	Lottery.gameConfig["jokersTimer"] = new Timer("#jokersTimer");
	Lottery.gameConfig["jokersTimer"].setTimeout(Lottery.gameConfig["jokersTimeout"])
};

Lottery.endOfRound = function() {
	clearInterval(Lottery.gameConfig["clearCode"]);
	Lottery.UI.deattachCardHandlers();
	if(Lottery.gameConfig["jokersCount"] > 0) {
		console.log("15 seconds for Joker time");
		// play joker
		Lottery.playJoker();
	} else {
		// change directly round
		Lottery.changeRound();
	}
};

Lottery.playJoker = function() {
	Lottery.gameConfig["jokersTimer"].reset();
	$(".joker").removeAttr("disabled");
	Lottery.gameConfig["jokersTimer"].start();
	setTimeout(Lottery.changeRound, Lottery.gameConfig["jokersTimeout"] * 1000);
};

Lottery.changeRound = function() {
	Lottery.gameConfig["roundTimer"].reset();
	Lottery.gameConfig["currentRound"]++;

	if(Lottery.gameConfig["currentRound"] > Lottery.gameConfig["totalRounds"]) {
		alert("The game has ended!");
		clearInterval(Lottery.gameConfig["clearCode"]);
		return;
	}
	// do UI changes
	Lottery.UI.disableJokerButtons();
	Lottery.UI.updateRounds();

	Lottery.gameConfig["clearCode"] = setInterval(Lottery.endOfRound, Lottery.gameConfig["roundTime"] * 1000);
	Lottery.gameConfig["roundTimer"].start();

	Lottery.UI.attachCardHandlers();
	console.log("New round has started");
}

Lottery.start = function() {
	Lottery.UI.attachCardHandlers();
	// start round timer
	Lottery.gameConfig["clearCode"] = setInterval(Lottery.endOfRound, Lottery.gameConfig["roundTime"] * 1000);
	Lottery.gameConfig["roundTimer"].start();
}

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
	return rewards.GAIN_15_POINTS;
};
