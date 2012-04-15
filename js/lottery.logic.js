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
			var reward = Lottery.play();
			console.log("Card is picked up : ", reward.description);
			Lottery.gameConfig["rewards"].push(reward);
			Lottery.gameConfig["selectedCards"].push($(this).attr("id"));
			Lottery.FlipCardsTable[$(this).attr("id")].uiFlip(reward.image);
			if(Lottery.gameConfig["newChoice"] === false) {
				Lottery.endOfRound();
			}
		});
	},
	deattachCardHandlers : function() {
		$(".flipbox").unbind("click");
	},
	attachJokersHandlers : function() {
		$(".joker").bind("click", {}, function() {
			Lottery.gameConfig["jokersCount"]--;
			Lottery.UI.updateJokersAmount();
			var id = $(this).attr("id");
			if(id === "double") {
				Lottery.gameConfig["modifier"] = 2;
				Lottery.endOfRound(false /*no jokers time*/);
			} else if(id === "addChoice") {

			} else if(id === "newChoice") {
				Lottery.gameConfig["newChoice"] = true;
				Lottery.UI.turnAllCards();
				Lottery.UI.attachCardHandlers();
				Lottery.clearRewards();
			}
		});
	},
	deattachJokersHandlers : function() {
		$(".joker").unbind("click");
	}
};

Lottery.applyEffect = function() {
	$.each(Lottery.gameConfig["rewards"], function(index, item) {
		console.log(item);
		Lottery.gameConfig = item.effect(Lottery.gameConfig, Lottery.gameConfig["modifier"]);
		Lottery.FlipCardsTable[Lottery.gameConfig["selectedCards"][index]].uiFlip();
		console.log(item.description);
		Lottery.UI.updateUI();
	});
	Lottery.clearRewards();
};

Lottery.clearRewards = function() {
	Lottery.gameConfig["rewards"] = [];
	Lottery.gameConfig["selectedCards"] = [];
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
		"jokersTimer" : null,
		"modifier" : 1,
		"rewards" : [],
		"selectedCards" : [],
		"newChoice" : false
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

Lottery.endOfRound = function(playJokers) {
	if( typeof (playJokers) === "undefined") {
		playJokers = true;
	}

	clearInterval(Lottery.gameConfig["clearCode"]);
	Lottery.gameConfig["roundTimer"].reset();
	Lottery.UI.deattachCardHandlers();

	if(Lottery.gameConfig["jokersCount"] > 0 && playJokers === true) {
		console.log("15 seconds for Joker time");
		// play joker
		Lottery.playJoker();
	} else {
		// change directly round
		clearTimeout(Lottery.gameConfig["jokersClearCode"]);
		Lottery.changeRound();
	}
};

Lottery.playJoker = function() {
	if(Lottery.gameConfig["jokersCount"] > 0) {
		Lottery.gameConfig["jokersTimer"].reset();
		$(".joker").removeAttr("disabled");
		Lottery.gameConfig["jokersTimer"].start();
		Lottery.UI.attachJokersHandlers();
		Lottery.gameConfig["jokersClearCode"] = setTimeout(Lottery.changeRound, Lottery.gameConfig["jokersTimeout"] * 1000);

	} else {
		Lottery.changeRound();
	}
};

Lottery.changeRound = function() {
	Lottery.applyEffect();
	Lottery.gameConfig["roundTimer"].reset();
	Lottery.gameConfig["currentRound"]++;
	Lottery.gameConfig["jokersTimer"].reset();

	// reset joker modifiers
	Lottery.gameConfig["newChoice"] = false;
	Lottery.gameConfig["modifier"] = 1;

	if(Lottery.gameConfig["currentRound"] > Lottery.gameConfig["totalRounds"]) {
		alert("The game has ended!");
		clearInterval(Lottery.gameConfig["clearCode"]);
		return;
	}
	// do UI changes
	Lottery.UI.turnAllCards();
	Lottery.UI.deattachJokersHandlers();
	Lottery.UI.disableJokerButtons();
	Lottery.UI.updateRounds();

	//Lottery.gameConfig["clearCode"] = setInterval(Lottery.endOfRound, Lottery.gameConfig["roundTime"] * 1000);
	Lottery.gameConfig["roundTimer"].start();

	Lottery.UI.attachCardHandlers();
	console.log("New round has started");
};

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
