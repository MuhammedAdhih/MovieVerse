const nameRegex = /^[A-Za-z ]{3,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

// SIGN UP
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

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

    const newAccount = {
      name,
      email,
      password,
    };

    // 1. Save the credentials securely to a holding area called "registeredUser"
    localStorage.setItem("registeredUser", JSON.stringify(newAccount));

    alert("Registration successful! Please log in.");
    window.location.href = "login.html";
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // 2. Fetch the "registeredUser" to check if the credentials match
    const account = JSON.parse(localStorage.getItem("registeredUser"));

    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return;
    }

    if (account && email === account.email && password === account.password) {
      // 3. Match found! Now we create the active "user" session that app.js is looking for
      const activeSession = { name: account.name, email: account.email };
      localStorage.setItem("user", JSON.stringify(activeSession));

      alert("Login successful");
      window.location.href = "../index.html";
    } else {
      alert("Wrong email or password");
    }
  });
}
