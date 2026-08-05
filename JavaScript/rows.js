export function loadMovieRows(containerId,movies) {
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
      <div class="movie-card" data-title="${movie.title.toLowerCase()}">

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
movieRows.innerHTML = `
  <div class="movie-row">
    ${html}
  </div>
`;
  }
