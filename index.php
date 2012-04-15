<?php
header("Content-Type: text/html; charset=utf-8");
?>
<!doctype HTML>
<html>
	<head>
		<title>Лотарията</title>
		<script type="text/javascript" src="js/additional_prototypes.js"></script>
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script src="js/jquery-ui-1.8.18.custom.min.js" type="text/javascript"></script>
		<script src="js/jquery.flip.min.js" type="text/javascript"></script>
		<script src="js/main.js" type="text/javascript"></script>
		<script src="js/gameconstants.js" type="text/javascript"></script>
		<script src="js/lottery.logic.js" type="text/javascript"></script>
		<script src="js/flipcard.js" type="text/javascript"></script>
		<script src="js/timer.js" type="text/javascript"></script>
		<script type="text/javascript">
			$(document).ready(function() {

				$("#lotteryCards").children().each(function(index, item) {
					var card = new Lottery.FlipCard({
						flipboxId : item.id,
						backContent : '<img src="images/front.png" />',
						faceContent : '<img src="images/front.png" />'
					});
					Lottery.FlipCardsTable[item.id] = card;
				});
				//start the game
				Lottery.setup();
			});

		</script>
		<style>
			#lotteryCards {
				width: 100%;
				height: 300px;
			}
			.flipbox {
				width: 193px;
				height: 248px;
				float: right;
				margin: 10px;
			}
			#roundsContainer {
				height : 30px;
				text-align: center;
				font-weight: bold;
				font-size: 25px;
				background-color: #FEC973;
			}
		</style>
	</head>
	<body>
		<div id="roundsContainer">
			Round # : <span id="roundNumber">1</span> of <span id="totalRounds">20</span> | <span id="timer">60</span> seconds
		</div>
		<h1>Team Score : <span id="teamScore">0</span></h1>
		<div id="lotteryCards">
			<div class="flipbox" id="flipbox">
				<img src="images/front.png" />
			</div>
			<div class="flipbox" id="flipbox2">
				<img src="images/front.png" />
			</div>
			<div class="flipbox" id="flipbox3">
				<img src="images/front.png" />
			</div>
			<div class="flipbox" id="flipbox4">
				<img src="images/front.png" />
			</div>
			<div class="flipbox" id="flipbox5">
				<img src="images/front.png" />
			</div>
			<div class="flipbox" id="flipbox6">
				<img src="images/front.png" />
			</div>
			<div class="flipbox" id="flipbox7">
				<img src="images/front.png" />
			</div>
		</div>
		<br />
		<hr />
		<h1>Jokers left : <span id="jokersCount">10</span> | <span id="jokersTimer"></span> seconds</h1>
		<div id="jokerCards">
			<input type="button" value="New Choice" id="newChoice" class="joker" disabled="disabled" />
			<input type="button" value="Add Choice" id="addChoice" class="joker" disabled="disabled" />
			<input type="button" value="Double" id="double" class="joker" disabled="disabled" />
			
		</div>
	</body>
</html>