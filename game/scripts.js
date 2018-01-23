var screenX = window.innerWidth;
var screenY = window.innerHeight;
var difficulty;

function playShoot (aud) {
	var sound = document.createElement("audio");
	var sound_source;

	switch (aud) {
		case 0: sound_source = "miss.mp3";
			break;
		case 1: sound_source = "shoot.mp3";
	}

	sound.setAttribute("src", sound_source);
	sound.play();

	//sound.remove();
}

function restartGame () {
	document.getElementById("score").innerHTML = "0:0";
	document.getElementById("html").setAttribute("onclick", "refreshScore(1,0)");
	startGame();
}

function endGame () {
	var scorebox = document.getElementById("score");
	score = scorebox.innerHTML.split(":");
	var htmldoc = document.getElementById("html");

	scorebox.innerHTML = (score[1]/score[0] * 100).toFixed(0) + "pts";

	htmldoc.setAttribute("onclick", "restartGame();");
}

function refreshScore (miss, target) {
	var score = document.getElementById("score").innerHTML.split(":");

	playShoot( (miss == 1) ? (0) : (1) );
	document.getElementById("score").innerHTML = (Number(score[0]) + miss)
							+ ":" + (Number(score[1]) + target);
	if (score[1] == difficulty) {
		endGame();
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function killedBox (id) {
	var box = document.getElementById(id)

	box.style.backgroundColor = "#a00";
	box.removeAttribute("onclick");
	await sleep(100);
	document.getElementById("body").removeChild(box);
}

function createBox (num_id) {
	var sprites = ["tank.gif", "copter.gif"];
	var box = document.createElement("DIV");
	var side = Math.floor(Math.sqrt(screenX*screenY*0.1*0.1));

	box.classList.add("box");
	box.id = "box_no" + num_id;
	box.setAttribute("onclick", "refreshScore(0,1);killedBox('" + box.id + "');");
	box.style.backgroundImage = "url('" + sprites[Math.floor(Math.random() * 2)] + "')";

	box.style.width = side + "px";
	box.style.height = side + "px";
	box.style.left = Math.floor(Math.random() * (screenX - side) ) + "px";
	box.style.top = Math.floor(Math.random() * (screenY - side)) + "px";


	return box;
}

function startGame () {
	difficulty = prompt("Introduce numero de caixas a xerar:");

	if (Number(difficulty) > 0) {
		difficulty = Number(difficulty);
	} else {
		alert("Entrada non válida. Xeraranse 10 caixas.");
		difficulty = 10;
	}

	for (var i = 0; i < difficulty; i++) {
		document.getElementById("body").appendChild(createBox(i));
	}
}
