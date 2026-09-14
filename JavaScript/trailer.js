import { getMovieTrailer } from "./api.js";

export function setupTrailer() {
  document.addEventListener("click", async (e) => {
    const card = e.target.closest(".movie-card");

    if (!card) return;

    // Authentication Check
    const activeUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!activeUser) {
      alert("You must be logged in to watch trailers!");

      window.location.href = "./HTML/login.html";

      return;
    }

    // Movie ID
    const movieId = card.dataset.id;

    const trailerContainer =
      document.getElementById("trailerContainer");

    if (!trailerContainer) {
      console.error(
        "Modal HTML is missing from index.html"
      );

      return;
    }

    try {
      const data = await getMovieTrailer(movieId);

      const trailer =
        data.results.find(
          (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube"
        ) ||
        data.results.find(
          (video) => video.site === "YouTube"
        );

      if (trailer) {
        trailerContainer.innerHTML = `
          <iframe
            src="https://www.youtube.com/embed/${trailer.key}?autoplay=1"
            allowfullscreen
            allow="autoplay"
          ></iframe>
        `;

        const trailerModalElement =
          document.getElementById("trailerModal");

        if (!trailerModalElement) {
          console.error("Trailer modal is missing.");
          return;
        }

        const trailerModal =
          new bootstrap.Modal(trailerModalElement);

        trailerModal.show();
      } else {
        alert("No trailer available for this movie.");
      }
    } catch (error) {
      console.error("Failed to load trailer:", error);
    }
  });


  // Stop video when popup closes
  const trailerModalEl =
    document.getElementById("trailerModal");

  if (trailerModalEl) {
    trailerModalEl.addEventListener(
      "hidden.bs.modal",
      () => {
        const container =
          document.getElementById("trailerContainer");

        if (container) {
          container.innerHTML = "";
        }
      }
    );
  }
}