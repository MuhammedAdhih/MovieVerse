export function loadHero(game) {
  const hero = document.getElementById("heroCarousel");

  const image = game.cover
    ? `https:${game.cover.url.replace("t_thumb", "t_1080p")}`
    : "https://placehold.co/1200x600?text=No+Image";

  hero.innerHTML = `
    <div class="hero">

      <img src="${image}" alt="${game.name}">

      <div class="hero-content">
        <h1>${game.name}</h1>
        <p>Discover, track and explore your favorite games.</p>
      </div>

    </div>
  `;
}
