export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password) {
  return password.length >= 6;
}

export function validateRequired(value) {
  return value.trim() !== "";
}

export function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}
