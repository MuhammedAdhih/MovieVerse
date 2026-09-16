
export function updateAuthUI() {
  const auth = document.getElementById("authSection");

  if (!auth) return;

  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    auth.innerHTML = `
      <span class="text-white me-2">Hi, ${user.name}</span>
      <button class="btn btn-danger btn-sm" id="logoutBtn">
        Logout
      </button>
    `;

    document.getElementById("logoutBtn").onclick = () => {
      localStorage.removeItem("user");
      location.reload();
    };
  } else {
    auth.innerHTML = `
      <a href="./HTML/login.html" class="btn btn-outline-light btn-sm">
        Login
      </a>

      <a href="./HTML/signup.html" class="btn btn-primary btn-sm">
        Sign Up
      </a>
    `;

  }
}

