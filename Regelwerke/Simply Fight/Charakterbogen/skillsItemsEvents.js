function AddSkill(name = "Fähigkeitsname", value = "0") {
	const container = document.querySelector('.skills-container');

	const div = CreateDiv("", "skill");

	const nameDiv = CreateDiv(name, "skill-name", true);

	nameDiv.addEventListener('blur', function () {
		if (nameDiv.textContent.trim() === "") {
			div.remove();
			CalculateAll();
		}
	});

	div.appendChild(nameDiv);
	div.appendChild(CreateDiv(value, "skill-value", true));

	container.appendChild(div);
}

function AddItem(name = "Gegenstand", desc = "Beschreibung", dice = "Schaden?", amount = "Anz.") {
	const container = document.querySelector('.items-container');

	const div = CreateDiv("", "item");

	const nameDiv = CreateDiv(name, "item-name", true);

	nameDiv.addEventListener('blur', function () {
		if (nameDiv.textContent.trim() === "") {
			div.remove();
		}
	});

	div.appendChild(nameDiv);
	div.appendChild(CreateDiv(desc, "item-desc", true));
	div.appendChild(CreateDiv(dice, "item-dice", true));
	div.appendChild(CreateDiv(amount, "item-amount", true));

	container.appendChild(div);
}

function AddEvent(name = "Name", desc = "Beschreibung", ep = "EP", exp = "EXP") {
	const container = document.querySelector('.events-container');

	const div = CreateDiv("", "event");

	const nameDiv = CreateDiv(name, "event-name", true);

	nameDiv.addEventListener('blur', function () {
		if (nameDiv.textContent.trim() === "") {
			div.remove();
		}
	});

	div.appendChild(nameDiv);
	div.appendChild(CreateDiv(desc, "event-desc", true));
	div.appendChild(CreateDiv(ep, "event-ep", true));
	div.appendChild(CreateDiv(exp, "event-exp", true));

	container.appendChild(div);
}

function CreateDiv(content = "", classes = "", edit = false) {
	const div = document.createElement('div');

	if (Array.isArray(classes)) {
		div.classList.add(...classes);
	} else if (typeof classes === 'string') {
		div.classList.add(classes);
	}

	if (content instanceof HTMLElement) {
		div.appendChild(content);
	} else {
		div.textContent = content;
	}

	div.contentEditable = edit;

	return div;
}

function CreateSkills(skillsData) {
	if (!Array.isArray(skillsData)) {
		return;
	}

	skillsData.forEach(skill => {
		AddSkill(skill.name, skill.value);
	});
}

function CreateEvents(eventsData) {
	if (!Array.isArray(eventsData)) {
		return;
	}

	eventsData.forEach(event => {
		AddEvent(event.name, event.desc, event.ep, event.exp);
	});
}

function CreateItems(itemsData) {
	if (!Array.isArray(itemsData)) {
		return;
	}

	itemsData.forEach(item => {
		AddItem(item.name, item.desc, item.dice, item.amount);
	});
}