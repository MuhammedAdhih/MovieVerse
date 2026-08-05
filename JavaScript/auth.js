const nameRegex = /^[A-Za-z ]{3,}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

// SIGN UP

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!nameRegex.test(name)) {
      alert("Name must contain only letters and minimum 3 characters");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Enter a valid email");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain 8 characters, uppercase, lowercase, number and special character",
      );
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful");

    window.location.href = "login.html";
  });
}

// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();

    const password = document.getElementById("loginPassword").value.trim();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("Invalid password format");
      return;
    }

    if (user && email === user.email && password === user.password) {
      localStorage.setItem("loggedIn", "true");

      alert("Login successful");

      window.location.href = "index.html";
    } else {
      alert("Wrong email or password");
    }
  });
}
