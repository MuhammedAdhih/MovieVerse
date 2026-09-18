export function updateAuthUI() {
  const auth = document.getElementById("authSection");

  if (!auth) return;

  // Change 'users' to 'currentUser' so it matches the if-statement below
  const currentUser = JSON.parse(localStorage.getItem("registeredUser"));

  if (currentUser) {
    auth.innerHTML = `
      <span class="text-white me-2">Hi, ${currentUser.name}</span>
      <button class="btn btn-danger btn-sm" id="logoutBtn">
        Logout
      </button>
    `;

    document.getElementById("logoutBtn").onclick = () => {
      localStorage.removeItem("registeredUser");
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
