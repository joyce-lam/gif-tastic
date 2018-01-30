var characterKey = ["Harry Potter", "Hermione Granger", "Ron Weasley", "Lord Voldemort", "Albus Dumbledore", "Severus Snape", "Rubeus Hagrid", "Draco Malfoy"];


function createButtons() {
	$("#buttons").empty();

	for (var i = 0; i < characterKey.length; i++) {
		var btn = $("<button>");
		btn.addClass("character");
		btn.data("name", characterKey[i]);
		btn.text(characterKey[i]);
		$("#buttons").append(btn);
	}
}

createButtons();

