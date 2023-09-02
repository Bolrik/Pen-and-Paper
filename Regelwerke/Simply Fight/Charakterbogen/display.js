/* Display */
function DisplayAll() {
	DisplayProperties();
	DisplaySpecialSkills();
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

function DisplaySpecialSkills() {
	let lehrEPValue = 0;
	let meisterEPValue = 0;
	let lehrCountValue = 0;
	let meisterCountValue = 0;

	const skillValues = document.querySelectorAll('.skill-value');

	skillValues.forEach((skillValue) => {
		let skillPoints = parseInt(skillValue.textContent);
		if (!isNaN(skillPoints)) {
			if (skillPoints >= 70) {
				meisterEPValue += 8;
				meisterCountValue++;
			}
			else if (skillPoints >= 30) {
				lehrEPValue += 3;
				lehrCountValue++;
			}
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