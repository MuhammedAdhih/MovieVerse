const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTFlMGJhOTgxZmE3OWU1YTJjYThiMWM2MGMyMGI4NiIsIm5iZiI6MTc3ODE2OTE0NS4xMjgsInN1YiI6IjY5ZmNiNTM5NTA1ZTFiNTY0ZWM0ODNlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cIbFIUjv2b84x5GY4wB6i_3M4VwLCq9SXCjVnUUZjSg";



const options = {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    accept: "application/json",
  },
};

export async function getTrendingMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week",
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return await response.json();
}

export async function searchMoviesFromAPI(query) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  return await response.json();
}

export async function getMovies(endpoint) {
  const response = await fetch(
    `https://api.themoviedb.org/3${endpoint}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return await response.json();
}