/* Calculate */
function CalculateAll() {
	CalculateExpPool();
	CalculateEPPool()
	CalculateProperties();
	CalculateLP();
	CalculateOhS();

	const skillValues = document.querySelectorAll('.skill-value');

	skillValues.forEach((skillValue) => {
		let skillPoints = parseInt(skillValue.textContent);
		if (!isNaN(skillPoints)) {
			if (skillPoints >= 70) {
				epValue += 8;
			}
			else if (skillPoints >= 30) {
				epValue += 3;
			}

			expValue -= skillPoints;
		}
	});

	console.log("CALC");
	DisplayAll();
}

function CalculateExpPool() {
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

function CalculateEPPool() {
	let epPool = 0;

	const valueElements = document.querySelectorAll('.event-ep');
	for (const valueElement of valueElements) {
		let value = parseInt(valueElement.textContent);
		if (!isNaN(value)) {
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

function CalculateLP() {
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

function CalculateOhS() {
	ohsValue = Math.max(Math.floor(lpValue / 10) + 5 - wisBonus, 10);
}