export function loadGameRows(games) {
  const gameRows = document.getElementById("gameRows");

  gameRows.innerHTML = "";

  games.forEach((game) => {
    const image = game.cover
      ? `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
      : "https://placehold.co/300x400?text=No+Image";

    gameRows.innerHTML += `
      <div class="game-card" data-title="${game.name}">

        <img src="${image}" alt="${game.name}">

        <div class="game-info">

          <h5>${game.name}</h5>

          <div class="game-meta">

            <span class="rating">
              ⭐ ${game.rating ? Math.round(game.rating) : "N/A"}
            </span>

          </div>

        </div>

      </div>
    `;
  });
}
