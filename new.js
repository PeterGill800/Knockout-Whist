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

var players = 0;
while(players < 2 || players > 7 || players != parseInt(players, 10))
players = prompt("Please enter number of players between 2 and 7:");
var who = 0;

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
for (i = 0; i < 7; i++){
	for (x = 0; x < players; x++){
		hands[x].push(shuffleDeck[0]);
		shuffleDeck.splice(0,1);
	}
}
trumpSuit = shuffleDeck[0].suit;
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

localStorage.setItem("players", JSON.stringify(players));
localStorage.setItem("hands", JSON.stringify(hands));
localStorage.setItem("possible", possible);
localStorage.setItem("ai", ai);
localStorage.setItem("play", JSON.stringify(play));
localStorage.setItem("leading", JSON.stringify(leading));
localStorage.setItem("enter", JSON.stringify(enter));
localStorage.setItem("renderNow", renderNow);
localStorage.setItem("trumpSuit", trumpSuit);

waitWinner();
function waitWinner(){
	setTimeout(function(){
		if(players != JSON.parse(localStorage.getItem("play")).length){
			waitWinner();
		}
		else{
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
	for(var i = 0; i < JSON.parse(localStorage.getItem("play")).length; i++){
		if(JSON.parse(localStorage.getItem("play"))[i].suit == trumpSuit){
			trump.push(JSON.parse(localStorage.getItem("play"))[i]);
		}
		else if(JSON.parse(localStorage.getItem("play"))[i].suit == JSON.parse(localStorage.getItem("leading")).suit){
			first.push(JSON.parse(localStorage.getItem("play"))[i]);
		}
	}
	if(trump.length != 0){
		check(trump);
	}
	else{
		check(first);
	}
}

var winners = [];
function check(type){
	setTimeout(function(){
		highest = 0;
		index = checkHighest(type);
		for(var i = 0; i < JSON.parse(localStorage.getItem("play")).length; i++){
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
				console.log(who);
				waitWinner2();
				//if(winners.length == 7 - roundNumber){
					//roundi = 1;
				//}
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

var roundNumber = 0;
var roundWinner = [[],[],[],[],[],[],[]];
var rW = [];
var pRW = [];
function round(){
	for(var i = 0; i < winners.length; i++){
		for(var x = 0; x < players; x++){
			if(winners[i] == x){
				roundWinner[x].push(winners[i]);
			}
		}
		rW = []
		players = 0;
		for(var x = 0; x < 7; x++){
			if(roundWinner[x].length != 0){
				players++;
			}
			if(roundWinner[x].length > rW.length){
				rW = roundWinner[x];
			}
		}
	}
	pRW = rW[0];
	for(var x = 0; x < 7; x++){
		if(roundWinner[x].length == 0 && x < pRW){
			rW[0]--;
		}
	}
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