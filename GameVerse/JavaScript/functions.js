
export function loadGameRows(gameList = games) {
  const gameRows = document.getElementById("gameRows");
  if (!gameRows) return;

  if (gameList.length === 0) {
    gameRows.innerHTML = `<p class="text-white text-center fs-5">No games found.</p>`;
    return;
  }

  const cardsHTML = gameList
    .map(
      (game) => `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card bg-dark text-white border-secondary h-100 game-card" data-title="${game.title}">
          <img src="${game.img}" class="card-img-top" alt="${game.title}" style="height: 200px; object-fit: cover;" />
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 class="card-title">${game.title}</h5>
              <p class="card-text text-secondary mb-1">Genre: ${game.category}</p>
              <p class="card-text text-warning">⭐ ${game.rating}</p>
            </div>
            <button class="btn btn-outline-light btn-sm w-100 mt-2" onclick="addToMyList(${game.id})">+ Add to My List</button>
          </div>
        </div>
      </div>
    `,
    )
    .join("");

  gameRows.innerHTML = `<div class="row">${cardsHTML}</div>`;
}

/**
 * 3. Search Filter Logic
 */
export function searchGames(query) {
  const filtered = games.filter(
    (game) =>
      game.title.toLowerCase().includes(query.toLowerCase()) ||
      game.category.toLowerCase().includes(query.toLowerCase()),
  );
  loadGameRows(filtered);
}

/**
 * 4. Authentication UI State Manager
 */
export function updateAuthUI() {
  const authSection = document.getElementById("authSection");
  if (!authSection) return;

  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    authSection.innerHTML = `
      <span class="text-white me-2">Hi, ${user.name}</span>
      <button id="logoutBtn" class="btn btn-outline-danger btn-sm">Logout</button>
    `;
    document.getElementById("logoutBtn")?.addEventListener("click", () => {
      localStorage.removeItem("user");
      updateAuthUI();
    });
  } else {
    authSection.innerHTML = `
      <a href="login.html" class="btn btn-outline-light btn-sm me-1">Login</a>
      <a href="#" class="btn btn-primary btn-sm">Sign Up</a>
    `;
  }
}

/**
 * 5. Toast Message Utility
 */
export function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/**
 * 6. Scroll To Top Button Logic
 */
export function setupScrollButton() {
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
