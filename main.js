var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "white";
ctx.font = "72px Arial";
ctx.fillText("Game Over", 100, 300);