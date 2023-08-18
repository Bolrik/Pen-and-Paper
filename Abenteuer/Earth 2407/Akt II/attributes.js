// JavaScript-Code für die Eigenschaften
document.addEventListener("DOMContentLoaded", () => {
  function updateEP() {
    const attributeInputs = document.querySelectorAll("#attributes-tab .attribute");
    let totalEP = 0;
    attributeInputs.forEach(input => {
      const attributeValue = parseInt(input.value);
      if (attributeValue > 70) {
        totalEP += attributeValue - 70 + 8;
      } else if (attributeValue > 30) {
        totalEP += attributeValue - 30 + 3;
      }
    });

    const skillInputs = document.querySelectorAll("#skills-tab input[name='skill-value']");
    skillInputs.forEach(input => {
      const skillValue = parseInt(input.value);
      if (skillValue > 70) {
        totalEP += 8;
      } else if (skillValue > 30) {
        totalEP += 3;
      }
    });

    document.getElementById("ep-points").textContent = totalEP;
  }

  const attributeInputs = document.querySelectorAll("#attributes-tab .attribute");
  attributeInputs.forEach(input => {
    input.addEventListener("input", () => {
      const attributeValue = parseInt(input.value);
      if (attributeValue < 25) {
        input.value = 25;
      }
      updateEP();
    });
  });

  // Initialisiere die EP beim Laden der Seite
  updateEP();
});
