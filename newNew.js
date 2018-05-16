var suits = ["Diamonds","Hearts","Spades","Clubs"];
var values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
var deck = [];
var shuffleDeck = [];
var hands = [];
var selected = 0;
var possible = "no";
var ai = 0;
var play = [];
var leading = null;
var enter = 0;
var renderNow = "no";
var trumpSuit = "";
var roundNumber = JSON.parse(localStorage.getItem("roundNumber"));
var roundii = "no";
var players = JSON.parse(localStorage.getItem("players", players));

makeDeck();
function makeDeck(){
	hands = [];
	for (var i = 0; i < 4; i++){
		for (var x = 0; x < 13; x++){
			var y = new makeCard(suits[i],values[x]);
			deck.push(y);
		}
	}
	for (var i = 0; i < 52; i++){
		shuffle();
	}
	for (var i = 0; i < players; i++){
		hands.push([]);
	}
	console.log(roundNumber);
	for (i = 0; i < 7 - roundNumber; i++){
		console.log(players);
		for (x = 0; x < players; x++){
			hands[x].push(shuffleDeck[0]);
			shuffleDeck.splice(0,1);
		}
	}
	localStorage.setItem("trumpSuit", shuffleDeck[0].suit);
	console.log(localStorage.getItem("trumpSuit"));
	console.log(hands);
	localStorage.setItem("hands", JSON.stringify(hands));
	localStorage.setItem("roundii", "yes");
}

function makeCard(suit, value) {
	this.suit = suit;
	this.value = value;
}

function shuffle(){
	var foo = randomNum(deck.length);
	shuffleDeck.push(deck[foo]);
	deck.splice(foo,1);
}

function randomNum(upper) {
	var foo = Math.random();
	foo *= upper;
	var bar = Math.floor(foo);
	return bar;
}

waitWinner();
function waitWinner(){
	console.log(players);
	console.log(JSON.parse(localStorage.getItem("play")).length);
	setTimeout(function(){
		if(players != JSON.parse(localStorage.getItem("play")).length){
			waitWinner();
		}
		else{
			console.log("check6");
			winner();
		}
	},500);
}

var waitW = false;
function waitWinner2(){
	setTimeout(function(){
		for(var i = 0; i < players; i++){
			if("[]" == JSON.stringify(JSON.parse(localStorage.getItem("play"))[i])){
				waitW = true;
			}
		}
		if(waitW == true){
			waitW = false;
			waitWinner2();
		}
		else{
			winner();
		}
	},500);
}

var first = [];
var trump = [];
function winner(){
	console.log("check5");
	for(var i = 0; i < JSON.parse(localStorage.getItem("play")).length; i++){
		console.log("check4");
		if(JSON.parse(localStorage.getItem("play"))[i].suit == localStorage.getItem("trumpSuit")){
			trump.push(JSON.parse(localStorage.getItem("play"))[i]);
		}
		else if(JSON.parse(localStorage.getItem("play"))[i].suit == JSON.parse(localStorage.getItem("leading")).suit){
			first.push(JSON.parse(localStorage.getItem("play"))[i]);
		}
	}
	if(trump.length != 0){
		console.log("check2");
		check(trump);
	}
	else{
		console.log("check3");
		check(first);
	}
}

var winners = [];
function check(type){
	setTimeout(function(){
		highest = 0;
		index = checkHighest(type);
		console.log("check1");
		for(var i = 0; i < JSON.parse(localStorage.getItem("play")).length; i++){
			console.log("check");
			if(type[index].suit == JSON.parse(localStorage.getItem("play"))[i].suit && type[index].value == JSON.parse(localStorage.getItem("play"))[i].value){
				who = i;
				winners.push(who);
				localStorage.setItem("play", JSON.stringify([]));
				trump = [];
				first = [];
				highest = 0;
				localStorage.setItem("leading", JSON.stringify(null));
				for(var x = 0; x < players ; x++){
					play = JSON.parse(localStorage.getItem("play"));
					play.push([]);
					localStorage.setItem("play", JSON.stringify(play));
				}
				localStorage.setItem("enter", who);
				time = who;
				ctx.fillStyle="blue";
				ctx.fillRect(280, 40+(20*i),10,10);
				ctx.font = "18px Arial";
				ctx.fillText("Press any key to continue", 250, 250);
				console.log(winners);
				waitWinner2();
				if(winners.length == 7 - roundNumber){
					round();
				}
				//else{
					//aiii = 1;
				//}
			}
		}
	},500);
}
var index = 0;
function checkHighest(type){
	for(var i = 0; i < type.length; i++){
		if(type[i].value == "10" && 10 > highest){
			highest = 10;
			index = i;
		}
		else if(type[i].value == "J" && 11 > highest){
			highest = 11;
			index = i;
		}
		else if(type[i].value == "Q" && 12 > highest){
			highest = 12;
			index = i;
		}
		else if(type[i].value == "K" && 13 > highest){
			highest = 13;
			index = i;
		}
		else if(type[i].value == "A" && 14 > highest){
			highest = 14;
			index = i;
		}
		else if(type[i].value > highest){
			highest = type[i].value;
			index = i;
		}
	}
	return(index);
}

var redirectCount = 0;
var redirect = [[],[],[],[],[],[],[]];
var roundWinner = [[],[],[],[],[],[],[]];
var rW = [];
var pRW = [];
function round(){
	redirect = [[],[],[],[],[],[],[]];
	for(var i = 0; i < winners.length; i++){
		for(var x = 0; x < players; x++){
			if(winners[i] == x){
				roundWinner[x].push(winners[i]);
			}
		}
	}
	rW = []
	players = 0;
	for(var x = 0; x < 7; x++){
		console.log(roundWinner[x].length);
		if(roundWinner[x].length != 0){
			players++;
		}
		if(roundWinner[x].length > rW.length){
			rW = roundWinner[x];
		}
	}
	pRW = rW[0];
	for(var x = 0; x < 7; x++){
		if(roundWinner[x].length == 0 && x < pRW){
			rW[0]--;
		}
	}
	redirectCount = 0;
	for(var i = 0; i < 7; i++){
		if(roundWinner[i].length == 0){
			redirect[i].push(8);
			redirectCount++;
		}
		else{
			redirect[i].push(redirectCount);
		}
	}
	localStorage.setItem("players", JSON.stringify(players));
	localStorage.setItem("roundNumber", JSON.stringify(roundNumber));
	
	localStorage.setItem("one", "yes");
	localStorage.setItem("two", "yes");
	localStorage.setItem("three", "yes");
	localStorage.setItem("four", "yes");
	localStorage.setItem("five", "yes");
	localStorage.setItem("six", "yes");
	localStorage.setItem("seven", "yes");
	
	if(redirect [0][0] == 8){localStorage.setItem("one", "gameOver.html");}
	if(redirect [1][0] == 8){localStorage.setItem("two", "gameOver.html");}
	if(redirect [2][0] == 8){localStorage.setItem("three", "gameOver.html");}
	if(redirect [3][0] == 8){localStorage.setItem("four", "gameOver.html");}
	if(redirect [4][0] == 8){localStorage.setItem("five", "gameOver.html");}
	if(redirect [5][0] == 8){localStorage.setItem("six", "gameOver.html");}
	if(redirect [6][0] == 8){localStorage.setItem("seven", "gameOver.html");}
	
	if(redirect [1][0] == 1){localStorage.setItem("two", "newOne.html");}
	if(redirect [2][0] == 1){localStorage.setItem("three", "two.html");}
	if(redirect [3][0] == 1){localStorage.setItem("four", "three.html");}
	if(redirect [4][0] == 1){localStorage.setItem("five", "four.html");}
	if(redirect [5][0] == 1){localStorage.setItem("six", "five.html");}
	if(redirect [6][0] == 1){localStorage.setItem("seven", "six.html");}

	if(redirect [2][0] == 2){localStorage.setItem("three", "newOne.html");}
	if(redirect [3][0] == 2){localStorage.setItem("four", "two.html");}
	if(redirect [4][0] == 2){localStorage.setItem("five", "three.html");}
	if(redirect [5][0] == 2){localStorage.setItem("six", "four.html");}
	if(redirect [6][0] == 2){localStorage.setItem("seven", "five.html");}
	
	if(redirect [3][0] == 3){localStorage.setItem("four", "newOne.html");}
	if(redirect [4][0] == 3){localStorage.setItem("five", "two.html");}
	if(redirect [5][0] == 3){localStorage.setItem("six", "three.html");}
	if(redirect [6][0] == 3){localStorage.setItem("seven", "four.html");}	

	if(redirect [4][0] == 4){localStorage.setItem("five", "newOne.html");}
	if(redirect [5][0] == 4){localStorage.setItem("six", "two.html");}
	if(redirect [6][0] == 4){localStorage.setItem("seven", "three.html");}

	if(redirect [5][0] == 5){localStorage.setItem("six", "newOne.html");}
	if(redirect [6][0] == 5){localStorage.setItem("seven", "two.html");}

	if(redirect [6][0] == 6){localStorage.setItem("seven", "newOne.html");}
	
	console.log(localStorage.getItem("one"));
	console.log(localStorage.getItem("two"));
	console.log(localStorage.getItem("three"));
	console.log(localStorage.getItem("four"));
	console.log(localStorage.getItem("five"));
	console.log(localStorage.getItem("six"));
	console.log(localStorage.getItem("seven"));
	
	/*if(possibleCard.length == 0){
		possible = 1;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "white";
		ctx.font = "72px Arial";
		ctx.fillText("Game Over", 100, 300);
	}*/
	//else{
		/*if(players == 1){
			possible = 1;
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "white";
			ctx.font = "72px Arial";
			ctx.fillText("You Win!", 100, 300);
		}*/
		roundNumber++;
		play = [];
		winners = [];
		who = rW[0];
		time = rW[0];
		localStorage.setItem("enter", who);
		roundWinner = [[],[],[],[],[],[],[]];
		rW = [];
		noTrump = 1;
		//for(var x = 0; x < who ; x++){
			//play.push([]);
		//}
		makeDeck();
		//aii();
	//}
}