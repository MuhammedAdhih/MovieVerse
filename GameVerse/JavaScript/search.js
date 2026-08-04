export function searchGames(query) {
  const cards = document.querySelectorAll(".game-card");

  cards.forEach((card) => {
    const title = card.dataset.title.toLowerCase();

    card.style.display = title.includes(query.toLowerCase()) ? "block" : "none";
  });
}
