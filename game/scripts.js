function refreshScore (miss, target) {
	var score = document.getElementById("score").innerHTML.split(":");

	document.getElementById("score").innerHTML = (Number(score[0]) + miss)
							+ ":" + (Number(score[1]) + target);
}
