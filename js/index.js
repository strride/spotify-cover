const SPOTIFY_OEMBED_URL = "https://embed.spotify.com/oembed";

async function fetchSpotifyData(url) {
  try {
    const response = await fetch(
      `${SPOTIFY_OEMBED_URL}?url=${encodeURIComponent(url)}`
    );
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    if (data && data.thumbnail_url) {
      document.getElementById("cover").src = data.thumbnail_url;
    } else {
      console.error("Cover URL not found in the response");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.getElementById("submit").addEventListener("click", function () {
  var url = document.getElementById("input").value;
  if (url) {
    fetchSpotifyData(url);
  } else {
    alert("Please enter a valid Spotify URL");
  }
});
