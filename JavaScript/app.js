import {
  getTrendingMovies,
  getMovies,
  searchMoviesFromAPI,
  getMovieTrailer,
} from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  updateAuthUI();
  setupScrollButton();

  try {
    const trending = await getTrendingMovies();
    const topRated = await getMovies("/movie/top_rated");
    const popular = await getMovies("/movie/popular");

    // Load UI Elements
    loadHero(trending.results);
    initHeroCarousel();

    loadMovieRows("trendingMovies", trending.results);
    loadMovieRows("topRatedMovies", topRated.results);
    loadMovieRows("popularMovies", popular.results);

    setupMovieSliders();

    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
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

  // Setup Live Search
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
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

        if (topRatedSection)
          topRatedSection.parentElement.style.display = "none";
        if (popularSection) popularSection.parentElement.style.display = "none";

        const trendingHeader = document
          .getElementById("trendingMovies")
          .parentElement.querySelector("h2");
        if (trendingHeader) {
          trendingHeader.textContent = `Search Results for "${query}"`;
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  // --- PROTECTED TRAILER POPUP LOGIC ---
  document.addEventListener("click", async (e) => {
    const card = e.target.closest(".movie-card");
    if (!card) return;

    // 1. Authentication Check
    const activeUser = JSON.parse(localStorage.getItem("user"));
    if (!activeUser) {
      alert("You must be logged in to watch trailers!");
      window.location.href = "./HTML/login.html";
      return;
    }

    // 2. Load and display trailer if logged in
    const movieId = card.dataset.id;
    const trailerContainer = document.getElementById("trailerContainer");

    if (!trailerContainer) {
      console.error("Modal HTML is missing from index.html");
      return;
    }

    try {
      const data = await getMovieTrailer(movieId);
      const trailer =
        data.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube",
        ) || data.results.find((v) => v.site === "YouTube");

      if (trailer) {
        trailerContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${trailer.key}?autoplay=1" allowfullscreen allow="autoplay"></iframe>`;
        const trailerModal = new bootstrap.Modal(
          document.getElementById("trailerModal"),
        );
        trailerModal.show();
      } else {
        alert("No trailer available for this movie.");
      }
    } catch (error) {
      console.error("Failed to load trailer:", error);
    }
  });

  // --- STOP VIDEO WHEN POPUP CLOSES ---
  const trailerModalEl = document.getElementById("trailerModal");
  if (trailerModalEl) {
    trailerModalEl.addEventListener("hidden.bs.modal", () => {
      document.getElementById("trailerContainer").innerHTML = "";
    });
  }
});

// --- UI FUNCTIONS ---

function loadHero(movies) {
  const hero = document.getElementById("heroCarousel");
  if (!hero) return;

  hero.innerHTML =
    movies
      .slice(0, 5)
      .map((movie, index) => {
        const image = movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
          : "https://placehold.co/1600x700?text=No+Image";
        return `
      <div class="hero-slide ${index === 0 ? "active" : ""}">
        <img src="${image}" alt="${movie.title}">
        <div class="hero-content">
          <h1>${movie.title}</h1>
          <p>⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
          <button class="btn btn-primary">Explore</button>
        </div>
      </div>
    `;
      })
      .join("") +
    `
    <button class="prev">&#10094;</button>
    <button class="next">&#10095;</button>
  `;
}

function initHeroCarousel() {
  const slides = document.querySelectorAll(".hero-slide");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  if (!slides.length || !next || !prev) return;

  let current = 0;
  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  next.addEventListener("click", () => {
    current = current >= slides.length - 1 ? 0 : current + 1;
    showSlide(current);
  });

  prev.addEventListener("click", () => {
    current = current <= 0 ? slides.length - 1 : current - 1;
    showSlide(current);
  });

  setInterval(() => {
    current = current >= slides.length - 1 ? 0 : current + 1;
    showSlide(current);
  }, 5000);
}

function loadMovieRows(containerId, movies) {
  const movieRows = document.getElementById(containerId);
  if (!movieRows) return;

  const html = movies
    .map((movie) => {
      const image = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://placehold.co/300x450?text=No+Image";
      const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
      const year = movie.release_date
        ? movie.release_date.substring(0, 4)
        : "-";

      return `
      <div class="movie-card" data-title="${movie.title.toLowerCase()}" data-id="${movie.id}">
        <img src="${image}" alt="${movie.title}">
        <div class="movie-info">
          <h5>${movie.title}</h5>
          <div class="movie-meta">
            <span>⭐ ${rating}</span>
            <span>${year}</span>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  movieRows.innerHTML = `<div class="movie-row">${html}</div>`;
}

function setupMovieSliders() {
  document.querySelectorAll(".movie-section").forEach((section) => {
    const row = section.querySelector(".movie-row");
    const prev = section.querySelector(".prev-btn");
    const next = section.querySelector(".next-btn");
    if (!row || !prev || !next) return;

    next.onclick = () => row.scrollBy({ left: 800, behavior: "smooth" });
    prev.onclick = () => row.scrollBy({ left: -800, behavior: "smooth" });
  });
}

function updateAuthUI() {
  const auth = document.getElementById("authSection");
  if (!auth) return;
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    auth.innerHTML = `<span class="text-white me-2">Hi, ${user.name}</span><button class="btn btn-danger btn-sm" id="logoutBtn">Logout</button>`;
    document.getElementById("logoutBtn").onclick = () => {
      localStorage.removeItem("user");
      location.reload();
    };
  } else {
    auth.innerHTML = `
      <a href="./HTML/login.html" class="btn btn-outline-light btn-sm">Login</a>
      <a href="./HTML/signup.html" class="btn btn-primary btn-sm">Sign Up</a>
    `;
  }
}

function setupScrollButton() {
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (!scrollBtn) return;
  window.addEventListener(
    "scroll",
    () => (scrollBtn.style.display = window.scrollY > 300 ? "block" : "none"),
  );
  scrollBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}
