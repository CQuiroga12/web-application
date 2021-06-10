const playlist_endpoint = "https://api.spotify.com/v1/me/playlists";

function getPlaylists() {
  var token = "";
  var data = {};
  console.log(localStorage.getItem("accessToken"));
  if (localStorage.getItem("accessToken")) {
    token = localStorage.getItem("accessToken");
    console.log(token + "WOOOOOOOOOOOOOOW");
    fetch(playlist_endpoint + " Authorization: Bearer " + token)
      .then((response) => {
        data = response;
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// BQDgcQeLH7PEZvFJYxQJyXMn5SoEkj8RzBBaUIJbKknyfdRxnTkUFyzGZHfuQs1SEBikZ-ULTQ1nBdaqugYxPBYEC4yNj0q7UGoO0gXIF7gf8vrqxu52gytB4M5rD-Drfa6MhRP2rL3iKX6On4vcz3XRdNyHDEHtXW50n_VLtJoCKgmWIISDxufL8Z42LfrXAg7FzSix7cnxG17QOPjdlf6KhA