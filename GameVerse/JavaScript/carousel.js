export function loadHero(game) {
  const hero = document.getElementById("heroCarousel");

  hero.innerHTML = getGames
    .slice(0, 5)
    .map((game, index) => {
      const image = game.cover
        ? `https:${game.cover.url.replace("t_thumb", "t_1080p")}`
        : "https://placehold.co/1600x700?text=No+Image";

      return `
     <div class="hero-slide ${index === 0 ? "active" : ""}">

      <img src="${image}" alt="${game.name}">

      <div class="hero-content">

        <h1>${game.name}</h1>

        <p>
          ⭐ ${game.rating ? Math.round(game.rating) : "N/A"}
        </p>

        <button class="btn btn-primary">
          Explore
        </button>

      </div>

    </div>
  `;
    })
    .join("");
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