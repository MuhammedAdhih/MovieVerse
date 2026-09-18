const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const confirmError = document.getElementById("confirmError");

        // Clear previous errors
        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmError.textContent = "";

        let valid = true;

        // Name validation
        if (name === "") {
            nameError.textContent = "Please enter your name";
            valid = false;
        }

        // Email validation
        if (email === "") {
            emailError.textContent = "Please enter your email";
            valid = false;
        }

        // Password validation
        if (password === "") {
            passwordError.textContent = "Please enter a password";
            valid = false;
        }

        // Confirm password validation
        if (confirmPassword === "") {
            confirmError.textContent = "Please confirm your password";
            valid = false;
        } else if (password !== confirmPassword) {
            confirmError.textContent = "Passwords do not match";
            valid = false;
        }

        if (!valid) {
            return;
        }

        // Get existing users
        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        // Check if email already exists
        const existingUser = users.find(
            user => user.email === email
        );

        if (existingUser) {
            emailError.textContent = "Email already registered";
            return;
        }

        // Create new user
        const newUser = {
            name: name,
            email: email,
            password: password
        };

        // Save user
        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        // Login user automatically
        localStorage.setItem(
            "registeredUser",
            JSON.stringify(newUser)
        );

        alert("Account created successfully!");

        // Go to home page
        window.location.href = "../index.html";
    });
}


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const emailError =
            document.getElementById("emailError");

        const passwordError =
            document.getElementById("passwordError");

        // Clear previous errors
        emailError.textContent = "";
        passwordError.textContent = "";

        // Get registered users
        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        // Find matching user
        const user = users.find(
            user =>
                user.email === email &&
                user.password === password
        );

        // Invalid login
        if (!user) {
            emailError.textContent =
                "Invalid email or password";
            return;
        }

        // Save logged-in user
        localStorage.setItem(
            "registeredUser",
            JSON.stringify(user)
        );

        alert("Login successful!");

        // Go to home page
        window.location.href = "../index.html";
    });
}


// ===============================
// UPDATE AUTH UI
// ===============================

export function updateAuthUI() {

    const auth = document.getElementById("authSection");

    if (!auth) return;

    const currentUser =
        JSON.parse(localStorage.getItem("registeredUser"));

    if (currentUser) {

        auth.innerHTML = `
            <span class="text-white me-2">
                Hi, ${currentUser.name}
            </span>

            <button
                class="btn btn-danger btn-sm"
                id="logoutBtn">
                Logout
            </button>
        `;

        document.getElementById("logoutBtn").onclick = () => {

            localStorage.removeItem("registeredUser");

            location.reload();
        };

    } else {

        auth.innerHTML = `
            <a
                href="./HTML/login.html"
                class="btn btn-outline-light btn-sm">
                Login
            </a>

            <a
                href="./HTML/signup.html"
                class="btn btn-primary btn-sm">
                Sign Up
            </a>
        `;
    }
}

