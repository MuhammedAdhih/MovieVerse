import { getTrendingMovies, getMovies } from "./api.js";

import { updateAuthUI } from "./auth.js";
import { setupScrollButton } from "./ui.js";
import { loadHero, initHeroCarousel } from "./hero.js";
import { loadMovieRows, setupMovieSliders } from "./movies.js";
import { setupSearch } from "./search.js";
import { setupTrailer } from "./trailer.js";

document.addEventListener("DOMContentLoaded", async () => {
  updateAuthUI();
  setupScrollButton();

  try {
    const trending = await getTrendingMovies();
    const topRated = await getMovies("/movie/top_rated");
    const popular = await getMovies("/movie/popular");

    // Hero
    loadHero(trending.results);
    initHeroCarousel();

    // Movie sections
    loadMovieRows("trendingMovies", trending.results);
    loadMovieRows("topRatedMovies", topRated.results);
    loadMovieRows("popularMovies", popular.results);

    setupMovieSliders();

    // Search
    setupSearch();

    // Trailer
    setupTrailer();

    // Hide loader
    const loader = document.getElementById("loader");

    if (loader) {
      loader.style.display = "none";
    }
  } catch (error) {
    console.error(error);

    const trendingContainer = document.getElementById("trendingMovies");

    if (trendingContainer) {
      trendingContainer.innerHTML = `
        <div class="text-center py-5">
          <h2>Unable to load movies.</h2>
          <p>Please try again later.</p>
        </div>
      `;
    }
  }
});
