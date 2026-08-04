import { getGames } from "./api.js";
import { loadGameRows } from "./rows.js";
import { loadHero } from "./carousel.js";
import { updateAuthUI } from "./UI.js";
import { setupScrollButton } from "./scroll.js";
import { searchGames } from "./search.js";

document.addEventListener("DOMContentLoaded", async () => {
  updateAuthUI();



  try {
    const games = await getGames();

      const heroGame = games[Math.floor(Math.random() * games.length)];

      loadHero(games);
      initHeroCarousel();

    loadGameRows(games);
    loader.style.display = "none";
  } catch (error) {
    document.getElementById("gameRows").innerHTML = `
    <div class="text-center py-5">

        <h2>Unable to load games.</h2>

        <p>Please try again later.</p>

    </div>
`;
  }

  setupSearch();

  setupScrollButton();
});

function setupSearch() {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", (e) => {
    searchGames(e.target.value);
  });
}
