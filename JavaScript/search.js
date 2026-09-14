import { searchMoviesFromAPI } from "./api.js";
import { loadMovieRows } from "./movies.js";

export function setupSearch() {
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) return;

  searchInput.addEventListener("input", async (e) => {
    const query = e.target.value.trim();

    try {
      if (query === "") {
        location.reload();
        return;
      }

      const data = await searchMoviesFromAPI(query);

      loadMovieRows("trendingMovies", data.results);

      const topRatedSection = document.getElementById("topRatedMovies");

      const popularSection = document.getElementById("popularMovies");

      if (topRatedSection) {
        topRatedSection.parentElement.style.display = "none";
      }

      if (popularSection) {
        popularSection.parentElement.style.display = "none";
      }

      const trendingContainer = document.getElementById("trendingMovies");

      if (trendingContainer) {
        const trendingHeader =
          trendingContainer.parentElement.querySelector("h2");

        if (trendingHeader) {
          trendingHeader.textContent = `Search Results for "${query}"`;
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
}
