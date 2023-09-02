function SaveJSON() {
	// Bestätigungsdialog anzeigen
	const confirmed = confirm("Wirklich speichern?");
	if (!confirmed) {
		return; // Falls der Benutzer nicht bestätigt hat, wird die Funktion beendet
	}

	const skillElements = document.querySelectorAll(".skill");
	const eventElements = document.querySelectorAll(".event");
	const itemElements = document.querySelectorAll(".item");
	const skills = [];
	const events = [];
	const items = [];

	// Iteriere über alle Listenelemente mit der Klasse "skill"
	skillElements.forEach(element => {
		const skillValue = element.querySelector(".skill-value").textContent;
		const skillName = element.querySelector(".skill-name").textContent;

		skills.push({
			name: skillName,
			value: skillValue
		});
	});

	// Iteriere über alle Listenelemente mit der Klasse "event"
	eventElements.forEach(element => {
		const eventName = element.querySelector(".event-name").textContent;
		const eventDesc = element.querySelector(".event-desc").textContent;
		const eventExp = element.querySelector(".event-exp").textContent;
		const eventEp = element.querySelector(".event-ep").textContent;

		events.push({
			name: eventName,
			desc: eventDesc,
			exp: eventExp,
			ep: eventEp
		});
	});

	// Iteriere über alle Listenelemente mit der Klasse "event"
	itemElements.forEach(element => {
		const itemName = element.querySelector(".item-name").textContent;
		const itemDesc = element.querySelector(".item-desc").textContent;
		const itemDice = element.querySelector(".item-dice").textContent;
		const itemAmount = element.querySelector(".item-amount").textContent;

		items.push({
			name: itemName,
			desc: itemDesc,
			dice: itemDice,
			amount: itemAmount
		});
	});

	const name = document.getElementById('inName').textContent;

	const data = {
		skills: skills,
		events: events,
		items: items,

		name: name,
		age: document.getElementById('inAge').textContent,
		gender: document.getElementById('inGender').textContent,
		body: document.getElementById('inBody').textContent,
		c1Head: document.getElementById('inC1Head').textContent,
		c1Value: document.getElementById('inC1Value').textContent,
		c2Head: document.getElementById('inC2Head').textContent,
		c2Value: document.getElementById('inC2Value').textContent,

		strEXP: parseInt(document.getElementById('strPropExp').textContent),
		dexEXP: parseInt(document.getElementById('dexPropExp').textContent),
		staEXP: parseInt(document.getElementById('staPropExp').textContent),
		intEXP: parseInt(document.getElementById('intPropExp').textContent),
		wisEXP: parseInt(document.getElementById('wisPropExp').textContent),
		chaEXP: parseInt(document.getElementById('chaPropExp').textContent),

		strBase: parseInt(document.getElementById('strPropBase').textContent),
		dexBase: parseInt(document.getElementById('dexPropBase').textContent),
		staBase: parseInt(document.getElementById('staPropBase').textContent),
		intBase: parseInt(document.getElementById('intPropBase').textContent),
		wisBase: parseInt(document.getElementById('wisPropBase').textContent),
		chaBase: parseInt(document.getElementById('chaPropBase').textContent),

		strEP: parseInt(document.getElementById('strPropEP').textContent),
		dexEP: parseInt(document.getElementById('dexPropEP').textContent),
		staEP: parseInt(document.getElementById('staPropEP').textContent),
		intEP: parseInt(document.getElementById('intPropEP').textContent),
		wisEP: parseInt(document.getElementById('wisPropEP').textContent),
		chaEP: parseInt(document.getElementById('chaPropEP').textContent),

		lpPropBase: parseInt(document.getElementById('LPPropBase').textContent),
		lpProp: parseInt(document.getElementById('LPProp').textContent),

		image: imageData
	};

	const jsonData = JSON.stringify(data);
	const blob = new Blob([jsonData], { type: "application/json" });
	const url = URL.createObjectURL(blob);

	// Erstellen eines Download-Links für das JSON-File
	const downloadLink = document.createElement("a");
	downloadLink.href = url;
	downloadLink.download = "SF_" + name + ".json";
	document.body.appendChild(downloadLink);
	downloadLink.click();

	// Löschen des temporären Links
	URL.revokeObjectURL(url);
	downloadLink.remove();
}

function LoadJSON() {
	const confirmed = confirm("Diesen Inhalt laden?");
	if (!confirmed) {
		return; // Falls der Benutzer nicht bestätigt hat, wird die Funktion beendet
	}

	const jsonData = document.getElementById('save-content').value;
	const data = JSON.parse(jsonData);

	const inEventContainer = document.querySelector('.events-container');
	const inSkillContainer = document.querySelector('.skills-container');
	const inItemContainer = document.querySelector('.items-container');

	document.getElementById('inName').textContent = data.name;
	document.getElementById('inAge').textContent = data.age;
	document.getElementById('inGender').textContent = data.gender;
	document.getElementById('inBody').textContent = data.body;
	document.getElementById('inC1Head').textContent = data.c1Head;
	document.getElementById('inC1Value').textContent = data.c1Value;
	document.getElementById('inC2Head').textContent = data.c2Head;
	document.getElementById('inC2Value').textContent = data.c2Value;

	document.getElementById('strPropExp').textContent = data.strEXP ?? 0;
	document.getElementById('dexPropExp').textContent = data.dexEXP ?? 0;
	document.getElementById('staPropExp').textContent = data.staEXP ?? 0;
	document.getElementById('intPropExp').textContent = data.intEXP ?? 0;
	document.getElementById('wisPropExp').textContent = data.wisEXP ?? 0;
	document.getElementById('chaPropExp').textContent = data.chaEXP ?? 0;

	document.getElementById('strPropBase').textContent = data.strBase ?? 25;
	document.getElementById('dexPropBase').textContent = data.dexBase ?? 25;
	document.getElementById('staPropBase').textContent = data.staBase ?? 25;
	document.getElementById('intPropBase').textContent = data.intBase ?? 25;
	document.getElementById('wisPropBase').textContent = data.wisBase ?? 25;
	document.getElementById('chaPropBase').textContent = data.chaBase ?? 25;

	document.getElementById('strPropEP').textContent = data.strEP ?? 0;
	document.getElementById('dexPropEP').textContent = data.dexEP ?? 0;
	document.getElementById('staPropEP').textContent = data.staEP ?? 0;
	document.getElementById('intPropEP').textContent = data.intEP ?? 0;
	document.getElementById('wisPropEP').textContent = data.wisEP ?? 0;
	document.getElementById('chaPropEP').textContent = data.chaEP ?? 0;

	document.getElementById('LPPropBase').textContent = data.lpPropBase ?? 100;
	document.getElementById('LPProp').textContent = data.lpProp ?? 0;

	imageData = data.image;
	document.getElementById('characterImage').src = imageData;

	inEventContainer.innerHTML = "";
	inSkillContainer.innerHTML = "";
	inItemContainer.innerHTML = "";

	CreateSkills(data.skills);
	CreateEvents(data.events);
	CreateItems(data.items);

	CalculateAll();
}