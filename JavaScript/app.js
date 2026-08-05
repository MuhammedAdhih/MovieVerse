import { getTrendingMovies, getMovies, searchMoviesFromAPI } from "./api.js";

import { loadMovieRows } from "./rows.js";
import { loadHero, initHeroCarousel } from "./carousel.js";
import { updateAuthUI } from "./UI.js";
import { setupScrollButton } from "./scroll.js";
import {  } from "./validation.js";

document.addEventListener("DOMContentLoaded", async () => {
  updateAuthUI();

  await loadMovies();

  setupSearch();

  setupScrollButton();
});

async function loadMovies() {
  try {
    const trending = await getTrendingMovies();
    const topRated = await getMovies("/movie/top_rated");
    const popular = await getMovies("/movie/popular");

    // Hero Carousel
    loadHero(trending.results);
    initHeroCarousel();

    // Movie Sections
    loadMovieRows("trendingMovies", trending.results);
    loadMovieRows("topRatedMovies", topRated.results);
    loadMovieRows("popularMovies", popular.results);

    setupMovieSliders();

    document.getElementById("loader").style.display = "none";
  } catch (error) {
    console.error(error);

    document.getElementById("trendingMovies").innerHTML = `
      <div class="text-center py-5">
        <h2>Unable to load movies.</h2>
        <p>Please try again later.</p>
      </div>
    `;
  }
}

function setupSearch() {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", async (e) => {
    const query = e.target.value.trim();

    try {
      if (query === "") {
        await loadMovies();
        return;
      }

      const data = await searchMoviesFromAPI(query);

      // Show search results in the Trending section
      loadMovieRows("trendingMovies", data.results);

      // Hide the other sections while searching
      document.getElementById("topRatedMovies").innerHTML = "";
      document.getElementById("popularMovies").innerHTML = "";
    } catch (error) {
      console.error(error);
    }
  });
}

function setupMovieSliders() {
  document.querySelectorAll(".movie-section").forEach((section) => {
    const row = section.querySelector(".movie-row");
    const prev = section.querySelector(".prev-btn");
    const next = section.querySelector(".next-btn");

    if (!row) return;

    next.onclick = () => {
      row.scrollBy({
        left: 800,
        behavior: "smooth",
      });
    };

    prev.onclick = () => {
      row.scrollBy({
        left: -800,
        behavior: "smooth",
      });
    };
  });
}