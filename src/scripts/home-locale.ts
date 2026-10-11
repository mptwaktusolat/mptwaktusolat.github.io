import { homePaths, type HomeLocale } from "../lib/home";

function browserLocale(): HomeLocale {
  const languages = navigator.languages.length
    ? navigator.languages
    : [navigator.language];
  return languages.some((language) => {
    try {
      const locale = new Intl.Locale(language);
      return locale.language === "ms" || locale.region === "MY";
    } catch {
      return false;
    }
  })
    ? "ms"
    : "en";
}

function updateHomeLinks() {
  const currentLocale = document.documentElement.dataset.homeLocale;
  let locale: HomeLocale = currentLocale === "ms" ? "ms" : "en";

  try {
    const savedLocale = localStorage.getItem("home-locale");
    const preferredLocale =
      savedLocale === "en" || savedLocale === "ms"
        ? savedLocale
        : browserLocale();
    // An explicit Malay URL takes priority; the root uses the saved or detected choice.
    locale = currentLocale === "ms" ? "ms" : preferredLocale;
    if (currentLocale === "en" || currentLocale === "ms") {
      localStorage.setItem("home-locale", locale);
    }
    if (currentLocale === "en" && locale === "ms") {
      window.location.replace(
        homePaths.ms + window.location.search + window.location.hash,
      );
      return;
    }
  } catch {
    // Keep navigation available when browser storage is disabled.
  }

  document
    .querySelectorAll<HTMLAnchorElement>("[data-home-link]")
    .forEach((link) => {
      link.href = homePaths[locale];
    });
}

document
  .querySelectorAll<HTMLAnchorElement>("[data-home-language]")
  .forEach((link) => {
    link.addEventListener("click", () => {
      const locale = link.dataset.homeLanguage;
      if (locale !== "en" && locale !== "ms") return;
      try {
        // Save before navigation so choosing English bypasses first-visit detection.
        localStorage.setItem("home-locale", locale);
      } catch {
        // The link still navigates normally without storage.
      }
    });
  });

updateHomeLinks();
// Refresh links when Back/Forward restores a page from the browser cache.
window.addEventListener("pageshow", updateHomeLinks);
