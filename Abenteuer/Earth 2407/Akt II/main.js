// JavaScript-Code für die allgemeine Steuerung und Initialisierung
document.addEventListener("DOMContentLoaded", () => {
  function showTab(tabId) {
    const tabs = document.querySelectorAll(".tab-content");
    tabs.forEach(tab => {
      if (tab.id === tabId) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  }

  // Event Listener für die Tab-Buttons
  const skillsTabBtn = document.getElementById("skills-tab-btn");
  const attributesTabBtn = document.getElementById("attributes-tab-btn");

  skillsTabBtn.addEventListener("click", () => {
    showTab("skills-tab");
  });

  attributesTabBtn.addEventListener("click", () => {
    showTab("attributes-tab");
  });
});
