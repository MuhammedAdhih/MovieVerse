export function loadGameRows(games) {
  const gameRows = document.getElementById("gameRows");

  if (!gameRows) return;

  const html = games
    .map((game) => {
      const image = game.cover
        ? `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
        : "https://placehold.co/300x400?text=No+Image";

      const rating = game.rating ? Math.round(game.rating) : "N/A";

      const year = game.first_release_date
        ? new Date(game.first_release_date * 1000).getFullYear()
        : "-";

      return `
      <div class="game-card" data-title="${game.name.toLowerCase()}">

        <img src="${image}" alt="${game.name}">

        <div class="game-info">

          <h5>${game.name}</h5>

          <div class="game-meta">

            <span>⭐ ${rating}</span>

            <span>${year}</span>

          </div>

        </div>

      </div>
    `;
    })
    .join("");

  gameRows.innerHTML = html;
}
