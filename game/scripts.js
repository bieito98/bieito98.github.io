var screenX = window.innerWidth;
var screenY = window.innerHeight;
var difficulty;
var killed;

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
	document.getElementById("score").innerHTML = "0";
	document.getElementById("html").setAttribute("onclick", "refreshScore(1,0)");
	startGame();
}

function endGame () {
	var scorebox = document.getElementById("score");
	var score = scorebox.innerHTML;
	var htmldoc = document.getElementById("html");

	scorebox.innerHTML = score + "pts";

	htmldoc.setAttribute("onclick", "restartGame();");
}

function refreshScore (miss, target) {
	var score = document.getElementById("score").innerHTML;

	playShoot( (miss == 1) ? (0) : (1) );
	document.getElementById("score").innerHTML = (Number(score) + target);
	if (target == 1) {
		console.log(killed++);
	};
	if (killed == difficulty) {
		endGame();
	};
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

function getPoints () {
	return 10;
}

function createBox (num_id) {
	var sprites = ["tank.gif", "copter.gif"];
	var box = document.createElement("DIV");
	var side = Math.floor(Math.sqrt(screenX*screenY*0.1*0.1));

	box.classList.add("box");
	box.id = "box_no" + num_id;
	box.setAttribute("onclick", "refreshScore(0,getPoints());killedBox('" + box.id + "');");
	box.style.backgroundImage = "url('" + sprites[Math.floor(Math.random() * 2)] + "')";

	box.style.width = side + "px";
	box.style.height = side + "px";
	box.style.left = Math.floor(Math.random() * (screenX - side) ) + "px";
	box.style.top = Math.floor(Math.random() * (screenY - side)) + "px";


	return box;
}

var attackers = [];
function startGame () {
	/*difficulty = prompt("Introduce numero de caixas a xerar:");

	if (Number(difficulty) > 0) {
		difficulty = Number(difficulty);
	} else {
		alert("Entrada non válida. Xeraranse 10 caixas.");
		difficulty = 10;
	}*/
	difficulty = 20;
	killed = 0;
	document.getElementById("html").removeAttribute("onclick");

	var sprites = ["tank.gif", "copter.gif"];
	for (var i = 0; i < difficulty; i++) {
		attackers[i] = new Attacker(sprites[Math.floor(Math.random()*2)], i, 64);
		attackers[i].placeAttacker();
	}
}

/**********************            VERSION OO            **********************/

/* SCORES */
function Score (name) {
	this.puntuacion = 0;

	this.update = function() {
		document.getElementById(name).innerHTML = this.puntuacion;
	};

	this.addPoint = function (point) {
		this.puntuacion += point;
		this.update();
		if (killed == difficulty) {
			max_current_score.decideMax(this.puntuacion);
			this.resetScore();
			document.getElementById("html").setAttribute("onclick", "startGame();");
		};
	};

	this.resetScore = function () {
		this.puntuacion = 0;
		this.update();
	};
}

function MaxScore (name) {
	this.puntuacion = 0;

	this.update = function() {
		document.getElementById(name).innerHTML = this.puntuacion;
	};

	this.decideMax = function(last) {
		if (last > this.puntuacion) {
			this.puntuacion = last;
			this.update();
		};
	};

	this.resetScore = function () {
		this.puntuacion = 0;
		this.update();
	};
}

var current_score = new Score ("score");
var max_current_score = new MaxScore("max_score");

/* BOXES */
function Attacker (image_url, nid, ssize) {
	this.image = image_url;
	this.nid = nid;
	this.ssize = Math.floor(Math.sqrt(screenX*screenY*0.1*0.1));
	this.position = {
		w: Math.floor(Math.random() * (screenX - this.ssize) ),
		h: Math.floor(Math.random() * (screenY - this.ssize) )
	};

	this.placeAttacker = function() {
		var box = document.createElement("DIV");

		box.classList.add("box");
		box.id = "box_no" + this.nid;
		box.setAttribute("onclick", "attackers[" + this.nid + "].killAttacker(event);");
		box.style.backgroundImage = "url('" + this.image + "')";

		box.style.width = this.ssize + "px";
		box.style.height = this.ssize + "px";
		box.style.left = this.position.w + "px";
		box.style.top = this.position.h + "px";

		document.getElementById("body").appendChild(box);
	};

	this.removeAttacker = function() {
		document.getElementById("body").removeChild(document.getElementById("box_no" + this.nid));
	}

	this.killAttacker = function(ev) {
		killed++;
		var x = Math.abs(ev.clientX - (this.position.w + Math.floor(this.ssize/2)));
		var y = Math.abs(ev.clientY - (this.position.h + Math.floor(this.ssize/2)));

		current_score.addPoint(this.ssize-x-y);
		this.removeAttacker();
	}
};
