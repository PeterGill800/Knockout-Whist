var canvas = document.getElementById("four");
var ctx = canvas.getContext("2d");
var you = 3;
var canvasColour = "#d1f3ff";
var players = JSON.parse(localStorage.getItem("players"));
var hand = localStorage.getItem("hands");
var hands = JSON.parse(hand);
var selected = 0;
var ai = JSON.parse(localStorage.getItem("ai"));
var enter = JSON.parse(localStorage.getItem("enter"));
var play = JSON.parse(localStorage.getItem("play"));
var leading = JSON.parse(localStorage.getItem("leading"));
var pL = 0;
aiii = 0;
render();

waitPlay();

document.addEventListener('keydown', function(event){
		if(event.keyCode == 40){
			selected++;
			if(selected >= hands[you].length){
				selected = 0;
			}
		}
		if(event.keyCode == 38){
			selected--;
			if(selected < 0){
				selected = hands[you].length-1;
			}
		}
		if(event.keyCode == 13 && JSON.parse(localStorage.getItem("enter")) == you && selected < hands[you].length){
			play = JSON.parse(localStorage.getItem("play"));
			if(JSON.parse(localStorage.getItem("leading")) == null){
				localStorage.setItem("leading", JSON.stringify(hands[you][selected]));
				play.splice(JSON.parse(localStorage.getItem("enter")),1,hands[you][selected]);
				hands[you].splice(selected,1);
				time = 1;
				localStorage.setItem("enter", JSON.stringify(JSON.parse(localStorage.getItem("enter"))+1));
				if(JSON.parse(localStorage.getItem("enter")) == players){
					localStorage.setItem("enter", 0);
				}
			}
			else{
				x = choosePlayerCard();
				if(x == true){
					play.splice(JSON.parse(localStorage.getItem("enter")),1,hands[you][selected]);
					hands[you].splice(selected,1);
					time = 1;
					localStorage.setItem("enter", JSON.stringify(JSON.parse(localStorage.getItem("enter"))+1));
					if(JSON.parse(localStorage.getItem("enter")) == players){
						localStorage.setItem("enter", 0);
					}
				}
			}
			//pL = play.length;
			localStorage.setItem("play", JSON.stringify(play));
		}
		if(event.keyCode != null && aiii == 1){
			aiii = 0;
			aii();
		}
		/*if(event.keyCode != null && roundi == 1){
			roundi = 0;
			round();
		}*/
		render();
	}
);
var possibleCard = [];
function choosePlayerCard(){
	if(hands[you][selected].suit == JSON.parse(localStorage.getItem("leading")).suit){
		return(true);
	}
	else{
		for(var i = 0; i < hands[you].length; i++){
			if(hands[you][i].suit == JSON.parse(localStorage.getItem("leading")).suit){
				possibleCard.push(hands[you][i]);
			}
		}
		if(possibleCard.length == 0){
			possibleCard = [];
			return(true);
		}
		else{
			possibleCard = [];
			return(false);
		}
	}	
}

function waitPlay(){
	setTimeout(function(){
		//if(pL != JSON.parse(localStorage.getItem("play")).length){
			render();
		//}
		//if(pL < players){
			waitPlay();
		//}
	},500);
}

function render(){
	if(localStorage.getItem("possible") == "no"){
		ctx.fillStyle = canvasColour;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle="blue";
		ctx.fillRect(10, 40+(20*selected),10,10);
		for(var i = 0; i < hands[you].length; i++){
			if (hands[you][i].suit == "Hearts" || hands[you][i].suit == "Diamonds"){
				ctx.fillStyle = "red";
			}
			else{
				ctx.fillStyle = "black";
			}
			ctx.font = "18px Arial";
			ctx.fillText(""+hands[you][i].value+" of "+hands[you][i].suit, 30, 50+(20*i));
		}
		for(var i = 0; i < JSON.parse(localStorage.getItem("play")).length; i++){
			if(JSON.parse(localStorage.getItem("play"))[i].suit != undefined){
				if(JSON.parse(localStorage.getItem("play"))[i].suit == "Hearts" || JSON.parse(localStorage.getItem("play"))[i].suit == "Diamonds"){
					ctx.fillStyle = "red";
				}
				else{
					ctx.fillStyle = "black";
				}
				ctx.font = "18px Arial";
				ctx.fillText(""+JSON.parse(localStorage.getItem("play"))[i].value+" of "+JSON.parse(localStorage.getItem("play"))[i].suit, 300, 50+(20*i));
			}
		}
		//if(noTrump == 0){
			if(localStorage.getItem("trumpSuit") == "Hearts" || localStorage.getItem("trumpSuit") == "Diamonds"){
				ctx.fillStyle = "red";
			}
			else{
				ctx.fillStyle = "black";
			}
			ctx.font = "18px Arial";
			ctx.fillText("Trump suit:", 30, 550);
			ctx.fillText(""+localStorage.getItem("trumpSuit"), 30, 570);
		//}
	}
}