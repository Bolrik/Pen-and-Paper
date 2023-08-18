// EXP / EP
let expValue = 0;
let epValue = 0;

// LP / OHS
let lpValue = 0;
let ohsValue = 0;

// Properties
let strValue = 0;
let dexValue = 0;
let staValue = 0;
let wisValue = 0;
let intValue = 0;
let chaValue = 0;

// Properties > Bonus
let strBonus = 0;
let dexBonus = 0;
let staBonus = 0;
let wisBonus = 0;
let intBonus = 0;
let chaBonus = 0;


/* Display */
function DisplayAll() {

	// Initialanzeige
	// CalculateAll();
	DisplayProperties();
	DisplayExp();
	DisplayEP();
	DisplayLP();
	DisplayOhS();
}

function DisplayProperties() {
	const properties = [
		{ id: 'str', value: strValue, bonus: strBonus },
		{ id: 'dex', value: dexValue, bonus: dexBonus },
		{ id: 'sta', value: staValue, bonus: staBonus },
		{ id: 'wis', value: wisValue, bonus: wisBonus },
		{ id: 'int', value: intValue, bonus: intBonus },
		{ id: 'cha', value: chaValue, bonus: chaBonus }
	];

	for (const prop of properties) {
		const propId = prop.id;
		document.getElementById(`${propId}PropValue`).textContent = prop.value;
		document.getElementById(`${propId}PropCalc`).textContent = prop.value;
		document.getElementById(`${propId}BonusValue`).textContent = prop.bonus;
	}
}

function DisplayExp() {
	const expElement = document.getElementById('expValue');
	if (expElement) {
		expElement.textContent = expValue;
	} else {
		console.error("Element with ID 'expValue' not found.");
	}
}

function DisplayEP() {
	const epElement = document.getElementById('epValue');
	if (epElement) {
		epElement.textContent = epValue;
	} else {
		console.error("Element with ID 'epValue' not found.");
	}
}

function DisplayLP() {
	const lpPropCalcElement = document.getElementById('LPPropCalc');
	const lpValueElement = document.getElementById('LPValue');

	lpPropCalcElement.textContent = lpValue;
	lpValueElement.textContent = lpValue;
}

function DisplayOhS() {
	const ohsValueElement = document.getElementById('OhSValue');
	ohsValueElement.textContent = ohsValue;
}


/* Calculate */
function CalculateAll() {
    // Berechne EP-Bonus basierend auf Fähigkeiten
	let lehrEPValue = 0;
    let meisterEPValue = 0;
    let lehrCountValue = 0;
    let meisterCountValue = 0;

	CalculateExpPool();
	CalculateEPPool()
	CalculateProperties();
	CalculateLP();
	CalculateOhS();
	
    const skillValues = document.querySelectorAll('.skill-value');
	
    skillValues.forEach((skillValue) => {
        let skillPoints = parseInt(skillValue.textContent);
        if (!isNaN(skillPoints))
		{
            if (skillPoints >= 70) {
				meisterEPValue += 8; // 3 EP + 5 EP Bonus
				epValue += 8;
				meisterCountValue++;
			}
			else if (skillPoints >= 30)
			{
				lehrEPValue += 3; // 3 EP
				epValue += 3;
				lehrCountValue++;
			}
			
			expValue -= skillPoints;
        }
	});

	const lehrEPElement = document.getElementById('lehrEPValue');
	const meisterEPElement = document.getElementById('meisterEPValue');
	const lehrCountElement = document.getElementById('lehrCountValue');
	const meisterCountElement = document.getElementById('meisterCountValue');

	lehrEPElement.textContent = lehrEPValue;
	meisterEPElement.textContent = meisterEPValue;
	lehrCountElement.textContent = lehrCountValue;
	meisterCountElement.textContent = meisterCountValue;

	console.log("CALC");
	DisplayAll();
}

function CalculateExpPool()
{
	let expPool = 0;

	const valueElements = document.querySelectorAll('.event-exp');
	valueElements.forEach((valueElement) => {
		const value = parseInt(valueElement.textContent);
		if (!isNaN(value)) {
			expPool += value;
		}
	});
	
	expValue = expPool;
}

function CalculateEPPool()
{
	let epPool = 0;
	
	const valueElements = document.querySelectorAll('.event-ep');
	for (const valueElement of valueElements) {
        let value = parseInt(valueElement.textContent);
        if (!isNaN(value))
		{
			epPool += value;
        }
	}

	epValue = epPool;
}

function UpdateStatValues(baseId, epId, expId, expCostId) {
	const baseElementValue = parseInt(document.getElementById(baseId).textContent);
	const epElementValue = parseInt(document.getElementById(epId).textContent);
	const expElementValue = parseInt(document.getElementById(expId).textContent);

	let totalValue = isNaN(baseElementValue) ? 25 : baseElementValue;
	if (!isNaN(epElementValue)) {
		totalValue += epElementValue;
		epValue -= epElementValue;
	}
	totalValue += isNaN(expElementValue) ? 0 : expElementValue;

	const step = 10;
	const stepMax = 50;
	let cost = 0;

	if (!isNaN(expElementValue)) {
		for (let i = 1; i <= expElementValue; i++) {
			cost += (i <= 4 ? i * step : stepMax);
		}
	}

	document.getElementById(expCostId).textContent = cost;
	expValue -= cost;

	return totalValue;
}

function CalculateProperties() {
	strValue = UpdateStatValues('strPropBase', 'strPropEP', 'strPropExp', 'strPropExpCost');
	dexValue = UpdateStatValues('dexPropBase', 'dexPropEP', 'dexPropExp', 'dexPropExpCost');
	staValue = UpdateStatValues('staPropBase', 'staPropEP', 'staPropExp', 'staPropExpCost');
	intValue = UpdateStatValues('intPropBase', 'intPropEP', 'intPropExp', 'intPropExpCost');
	wisValue = UpdateStatValues('wisPropBase', 'wisPropEP', 'wisPropExp', 'wisPropExpCost');
	chaValue = UpdateStatValues('chaPropBase', 'chaPropEP', 'chaPropExp', 'chaPropExpCost');

	strBonus = Math.trunc(strValue / 5);
	dexBonus = Math.trunc(dexValue / 5);
	staBonus = Math.trunc(staValue / 5);
	intBonus = Math.trunc(intValue / 5);
	wisBonus = Math.trunc(wisValue / 5);
	chaBonus = Math.trunc(chaValue / 5);
}

function CalculateLP()
{
	const lpBaseElement = document.getElementById('LPPropBase');
	const lpExpElement = document.getElementById('LPProp');
	const lpValueElement = document.getElementById('LPValue');
	const lpCostElement = document.getElementById('LPPropCost');

	lpValue = parseInt(lpBaseElement.textContent) || 100;
	const lpExp = parseInt(lpExpElement.textContent);

	const step = 2;
	const stepMax = 10;

	if (!isNaN(lpExp)) {
		lpValue += lpExp;

		let cost = 0;

		for (let i = 1; i <= lpExp; i++) {
			cost += (i <= 4 ? i * step : stepMax);
		}

		lpCostElement.textContent = cost;
		expValue -= cost;
	} else {
		lpCostElement.textContent = 0;
	}

	lpValueElement.textContent = lpValue;
}

function CalculateOhS()
{
	ohsValue = Math.max(Math.floor(lpValue / 10) + 5 - wisBonus, 10);
}


function AddSkill(name = "Fähigkeitsname", value = "0") {
    const skillsContainer = document.querySelector('.skills-container');

    const skillDiv = document.createElement('div');
    skillDiv.classList.add('skill');

    const skillNameDiv = document.createElement('div');
    skillNameDiv.classList.add('skill-name');
    skillNameDiv.contentEditable = 'true';
    skillNameDiv.textContent = name;

    const skillValueDiv = document.createElement('div');
    skillValueDiv.classList.add('skill-value');
    skillValueDiv.contentEditable = 'true';
    skillValueDiv.textContent = value;

    skillDiv.appendChild(skillNameDiv);
    skillDiv.appendChild(skillValueDiv);

    skillsContainer.appendChild(skillDiv);
}

function AddEvent(name = "Name", desc = "Beschreibung", ep = "EP", exp = "EXP") {
    const container = document.querySelector('.events-container');

    const rootDiv = document.createElement('div');
    rootDiv.classList.add('event');

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('event-name');
    nameDiv.contentEditable = 'true';
    nameDiv.textContent = name;
	
    const descDiv = document.createElement('div');
    descDiv.classList.add('event-desc');
    descDiv.contentEditable = 'true';
    descDiv.textContent = desc;

    const epChangeDiv = document.createElement('div');
    epChangeDiv.classList.add('event-ep');
    epChangeDiv.contentEditable = 'true';
    epChangeDiv.textContent = ep;
	
    const expChangeDiv = document.createElement('div');
    expChangeDiv.classList.add('event-exp');
    expChangeDiv.contentEditable = 'true';
    expChangeDiv.textContent = exp;

    rootDiv.appendChild(nameDiv);
    rootDiv.appendChild(descDiv);
    rootDiv.appendChild(epChangeDiv);
    rootDiv.appendChild(expChangeDiv);

    container.appendChild(rootDiv);
}


function CreateSkills(skillsData) {
	skillsData.forEach(skill => {
		AddSkill(skill.name, skill.value);
	});
}

function CreateEvents(eventsData) {
	eventsData.forEach(event => {
		AddEvent(event.name, event.desc, event.ep, event.exp);
	});
}



/* Button_Click */
function OpenOverlay() {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "block";
}

function CloseOverlay() {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "none";
}

function SaveJSON() {
	// Bestätigungsdialog anzeigen
	const confirmed = confirm("Wirklich speichern?");
	if (!confirmed) {
		return; // Falls der Benutzer nicht bestätigt hat, wird die Funktion beendet
	}
	
	const skillElements = document.querySelectorAll(".skill");
	const eventElements = document.querySelectorAll(".event");
	const skills = [];
	const events = [];

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

	const name = document.getElementById('inName').textContent;

	const data = {
		skills: skills,
		events: events,

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
		lpProp: parseInt(document.getElementById('LPProp').textContent)
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

	inEventContainer.innerHTML = "";
	inSkillContainer.innerHTML = "";
	
	CreateSkills(data.skills); // Funktion zum Erstellen der Skill-Elemente aufrufen
	CreateEvents(data.events); // Funktion zum Erstellen der Event-Elemente aufrufen

	CalculateAll();
}

function OnClickAddSkill() {
	AddSkill();
}

function OnClickAddEvent() {
	AddEvent()
}

/* Overlay_File_Selector */
function HandleFileSelect(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === 'application/json') {
        const reader = new FileReader();

        reader.onload = function(event) {
            const content = event.target.result;
			document.getElementById('save-content').value = content;
        };

		reader.readAsText(selectedFile);
    } else {
        alert('Bitte eine JSON-Datei auswählen.');
    }
}


document.addEventListener('input', () => {
	CalculateAll();
});

document.getElementById('addSkillButton').addEventListener('click', OnClickAddSkill);
document.getElementById('addEventButton').addEventListener('click', OnClickAddEvent);
document.getElementById('save-file-input').addEventListener('input', HandleFileSelect);

CalculateAll();