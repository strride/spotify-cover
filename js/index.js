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
      const coverImg = document.getElementById("cover");
      coverImg.src = data.thumbnail_url;
      coverImg.dataset.title = data.title || 'cover';

      coverImg.onload = () => {
        document.querySelector('.download').style.display = 'inline-block';
      };
    } else {
      console.error("Cover URL not found in the response");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

document.querySelector('.download').addEventListener('click', async function() {
  const coverImg = document.getElementById('cover');
  const imageUrl = coverImg.src;
  if (imageUrl) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `cover_${formatString(coverImg.dataset.title)}.jpg`;
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }
});

document.getElementById("submit").addEventListener("click", function () {
  var url = document.getElementById("input").value;
  if (url) {
    fetchSpotifyData(url);
  } else {
    alert("Please enter a valid Spotify URL");
  }
});

function formatString(str) {
  return str.replace(/ \([^)]*\)|'| /g, '_');
}

