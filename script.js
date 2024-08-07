document.addEventListener("DOMContentLoaded", function() {
  const API_URL = "https://api.alquran.cloud/v1/surah";
  const tabsContainer = document.getElementById("tabs");
  const surahContent = document.getElementById("surah-content");

  // Fetch and display Surah names
  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const surahs = data.data;
      surahs.forEach((surah, index) => {
        const tabButton = document.createElement("button");
        tabButton.textContent = `${surah.englishName} (${surah.number})`;
        tabButton.addEventListener("click", () => displaySurah(surah.number, tabButton));
        tabsContainer.appendChild(tabButton);

        // Load the first Surah by default
        if (index === 0) {
          tabButton.classList.add("active");
          displaySurah(surah.number, tabButton);
        }
      });
    })
    .catch(error => console.error("Error fetching Surahs:", error));

  function displaySurah(surahNumber, tabButton) {
    // Highlight the active tab
    const tabButtons = document.querySelectorAll("#tabs button");
    tabButtons.forEach(button => button.classList.remove("active"));
    tabButton.classList.add("active");

    // Fetch and display Surah content with translation
    fetch(`${API_URL}/${surahNumber}/editions/quran-simple,en.sahih`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const surahArabic = data.data[0];
        const surahTranslation = data.data[1];

        surahContent.innerHTML = `
          <h2>${surahArabic.englishName} (${surahArabic.englishNameTranslation})</h2>
          <p>${surahArabic.revelationType}</p>
          <div>
            ${surahArabic.ayahs.map((ayah, index) => `
              <p><strong>${ayah.numberInSurah}. ${ayah.text}</strong></p>
              <p>${surahTranslation.ayahs[index].text}</p>
            `).join("")}
          </div>
        `;
      })
      .catch(error => console.error("Error fetching Surah:", error));
  }
});
