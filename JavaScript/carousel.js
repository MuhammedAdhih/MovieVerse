export function loadHero(movies) {
  const hero = document.getElementById("heroCarousel");

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

            <p>
              ⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </p>

            <button class="btn btn-primary">
              Explore
            </button>
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
export function initHeroCarousel() {
  const slides = document.querySelectorAll(".hero-slide");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");

  let current = 0;

  function showSlide(index) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    slides[index].classList.add("active");
  }

  next.addEventListener("click", () => {
    current++;

    if (current >= slides.length) {
      current = 0;
    }

    showSlide(current);
  });

  prev.addEventListener("click", () => {
    current--;

    if (current < 0) {
      current = slides.length - 1;
    }

    showSlide(current);
  });
  // AUTO SLIDE
  setInterval(() => {
    current++;

    if (current >= slides.length) {
      current = 0;
    }

    showSlide(current);
  }, 5000);
}