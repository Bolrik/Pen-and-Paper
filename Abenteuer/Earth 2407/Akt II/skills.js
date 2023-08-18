// JavaScript-Code für die Fähigkeiten
document.addEventListener("DOMContentLoaded", () => {
  const maxExpPoints = 400;

  function updateExpPoints() {
    const skillInputs = document.querySelectorAll("#skills-tab input[name='skill-value']");
    let usedExp = 0;
    skillInputs.forEach(input => (usedExp += parseInt(input.value)));
    const currentExpPoints = maxExpPoints - usedExp;
    document.getElementById("exp-points").textContent = currentExpPoints;
  }

  function updateEP() {
    const skillInputs = document.querySelectorAll("#skills-tab input[name='skill-value']");
    let totalEP = 0;
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

  function addSkill() {
    // Der restliche Code für das Hinzufügen einer Fähigkeit bleibt unverändert
  }

  document.getElementById("add-skill").addEventListener("click", addSkill);

  const skillInputs = document.querySelectorAll("#skills-tab input[name='skill-value']");
  skillInputs.forEach(input => {
    input.addEventListener("input", () => {
      const skillValue = parseInt(input.value);
      if (skillValue > 100) {
        input.value = 100;
      }
      updateExpPoints();
      updateEP();
    });
  });

  // Initialisiere die EP beim Laden der Seite
  updateExpPoints();
  updateEP();
});
