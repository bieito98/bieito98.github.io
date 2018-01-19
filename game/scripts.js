var screenX = window.innerWidth;
var screenY = window.innerHeight;

function restartGame () {
	document.getElementById("score").innerHTML = "0:0";
	document.getElementById("html").setAttribute("onclick", "refreshScore(1,0);");;
	startGame(10);
}

function endGame () {
	var score = document.getElementById("score").innerHTML.split(":");
	var htmldoc = document.getElementById("html");

	alert("Game ended. Your score:\n\t" + (score[1]/score[0] * 100).toFixed(0) + " points!");

	htmldoc.setAttribute("onclick", "restartGame();");
}

function refreshScore (miss, target) {
	var score = document.getElementById("score").innerHTML.split(":");

	document.getElementById("score").innerHTML = (Number(score[0]) + miss)
							+ ":" + (Number(score[1]) + target);
	if (score[1] == 10) {
		endGame();
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function killedBox (id) {
	var box = document.getElementById(id)

	box.style.backgroundColor = "#a00";
	refreshScore(0,1);
	box.removeAttribute("onclick");
	await sleep(100);
	document.getElementById("body").removeChild(box);
}

function createBox (num_id) {

	var box = document.createElement("DIV");

	box.classList.add("box");
	box.style.left = Math.floor(Math.random() * (screenX-64) ) + "px";
	box.style.top = Math.floor(Math.random() * (screenY-64)) + "px";
	box.id = "box_no" + num_id;
	box.setAttribute("onclick", "killedBox('" + box.id + "');");

	return box;
}

function startGame (num) {
	for (var i = 0; i < num; i++) {
		document.getElementById("body").appendChild(createBox(i));
	}
}
