const CLIENT_ID = "00y21ojlfqvigq9n0yd88wyd7pw23r";
const ACCESS_TOKEN = "5qy3anrjwuezhoxs4k36fwo1rb4ib0";

export async function getGames() {
  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      Accept: "application/json",
    },
    body: `
      fields
        name,
        cover.url,
        rating,
        first_release_date;
         where
        cover != null;

      sort rating desc;

      limit 24;
    `,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return await response.json();
}
