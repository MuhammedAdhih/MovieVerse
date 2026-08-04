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

      loadHero(games[0]);

    loadGameRows(games);
  } catch (error) {
    console.log(error);
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
