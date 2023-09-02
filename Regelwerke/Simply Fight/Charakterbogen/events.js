/* Button_Click */
function OpenOverlay() {
	var overlay = document.getElementById("overlay");
	overlay.style.display = "block";
}

function CloseOverlay() {
	var overlay = document.getElementById("overlay");
	overlay.style.display = "none";
}

function OnClickAddSkill() {
	AddSkill();
}

function OnClickAddEvent() {
	AddEvent()
}

function OnClickAddItem() {
	AddItem()
}

function OnClickPageButton(event) {

	let page = GetParentWithClass(event.target, "page");

	if (!page)
		return;

	if (page.classList.contains('page-collapsed')) {
		page.classList.remove('page-collapsed');
	}
	else {
		page.classList.add('page-collapsed');
	}
}

/* Overlay File Selector */
function HandleFileSelect(event) {
	const selectedFile = event.target.files[0];

	if (selectedFile && selectedFile.type === 'application/json') {
		const reader = new FileReader();

		reader.onload = function (event) {
			const content = event.target.result;
			document.getElementById('save-content').value = content;
		};

		reader.readAsText(selectedFile);
	} else {
		alert('Bitte eine JSON-Datei auswählen.');
	}
}

/* Image Selector */
function HandleImageSelect(event) {
	const imageElement = document.getElementById('characterImage');

	var img = new Image();

	// Laden Sie das Bild aus dem input-Element
	img.src = URL.createObjectURL(event.target.files[0]);
	var canvas = document.createElement("canvas");

	// Erhalten Sie den Kontext des Canvas
	var ctx = canvas.getContext("2d");

	// Warten Sie, bis das Bild geladen ist
	img.onload = function () {
		// Setzen Sie die Breite und Höhe des Canvas auf die gewünschte Größe
		let size = 184;
		canvas.height = size;
		canvas.width = size * img.width / img.height;

		// Zeichnen Sie das Bild auf dem Canvas mit der angegebenen Größe
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

		// Konvertieren Sie das Canvas in einen base64-String
		imageData = canvas.toDataURL("image/jpeg");

		// Speichern Sie den base64-String in json
		var json = JSON.stringify({ image: imageData });

		// Setzen Sie die Quelle des img-Elements auf das generierte Bild
		imageElement.src = imageData;
	}
}

function GetParentWithClass(origin, className) {

	if (!origin)
		return null;

	if (origin.classList.contains(className)) {
		return origin;
	}

	var parent = origin.parentNode;

	if (!parent || parent.tagName === "BODY") {
		return null;
	}

	return GetParentWithClass(parent, className);
}

function LinkEvents() {
	const pageButtons = document.querySelectorAll('.page-button');

	pageButtons.forEach((pageButton) => {
		pageButton.addEventListener('click', OnClickPageButton);
	});

	document.addEventListener('input', () => { CalculateAll(); });

	document.getElementById('addSkillButton').addEventListener('click', OnClickAddSkill);
	document.getElementById('addEventButton').addEventListener('click', OnClickAddEvent);
	document.getElementById('addItemButton').addEventListener('click', OnClickAddItem);
	document.getElementById('save-file-input').addEventListener('input', HandleFileSelect);
	document.getElementById('charakterPreview').addEventListener('change', HandleImageSelect);
}

LinkEvents();