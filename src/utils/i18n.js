let currentLang = localStorage.getItem("lang") || "es";
let translations = {};

async function loadLang(lang) {
  const res = await fetch(`/locales/${lang}.json`);
  translations = await res.json();
}

function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}

export async function initI18n() {
  await loadLang(currentLang);
  translatePage();

  const toggle = document.getElementById("langToggle");
  if (toggle) {
    toggle.addEventListener("click", async () => {
      currentLang = currentLang === "es" ? "en" : "es";
      localStorage.setItem("lang", currentLang);
      await loadLang(currentLang);
      translatePage();
    });
  }
}
