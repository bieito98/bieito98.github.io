function colorizeLine (line) {
	var newSpan;
	var i;
	var colorIndex;
	var chr;
	var colors = ['red', 'green', 'blue', 'yellow'];

	function newColorIndex (lastColor) {
		var newC;

		// Avoid repetition of a color
		do {
			// Get random color
			newC = Math.floor(Math.random() * colors.length);
		} while (lastColor == newC);

		return(newC);
	}

	// Create line
	newSpan = document.createElement("DIV");
	newSpan.setAttribute("class", "line");

	// Iterate over chars
	for (i=0; i<line.length; i++) {
		colorIndex = newColorIndex(colorIndex);

		chr = document.createElement("SPAN");
		chr.classList.add("char", colors[colorIndex]);
		chr.innerHTML = (line[i] == " ") ? ("\u00A0") : (line[i]);

		newSpan.appendChild(chr);
	}

	return newSpan;

}

function formatText (text) {
	var content = text;
	var lines;

	if (content == null || content == "") {
		content="Made by\\@bieito98";
	}

	lines = content.split("\\");

	for (var l in lines) {
		document.getElementById("box").appendChild(colorizeLine(lines[l]));
	}
}
