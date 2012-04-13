// Knuth shuffle
Array.prototype.shuffle = function() {
	for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
	return this;
};
// Global object to wrap logic
var Lottery = {};

/**
 * Returns a random number between N and M
 */
Lottery.randomBetween = function(N, M) {
	return Math.floor(M + (1 + N - M) * Math.random());
};

// populated in gameconstants.js
Lottery.gameConstants = {};
