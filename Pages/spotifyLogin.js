const redirect_uri = "http://127.0.0.1:5500/Pages/index.html";

const client_id = "d0992046a3e246b09e04a0086bbd2e27";

const AUTHORIZE = "https://accounts.spotify.com/authorize";

const playlist_endpoint = "https://api.spotify.com/v1/me/playlists";

function onPageLoad() {
  if (window.location.hash != "") {
    const { access_token, expires_in, token_type } = getToken(
      window.location.hash
    );
    console.log({ access_token });

    localStorage.clear();
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("expiresIn", expires_in);
    localStorage.setItem("tokenType", token_type);
    getPlaylists();
  }
}

function requestAuthorization() {
  let url = AUTHORIZE;
  url += "?client_id=" + client_id;
  url += "&response_type=token";
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  url += "&show_dialog=true";
  url += "&scope=playlist-read-private playlist-read-collaborative";
  window.location.href = url; // Show Spotify's authorization screen
}

const getToken = (hash) => {
  const stringAfterHash = hash.substring(1);
  console.log(stringAfterHash);
  const paramsInURL = stringAfterHash.split("&");
  console.log(paramsInURL);
  const paramsSplitUp = paramsInURL.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

function getPlaylists() {
  callApi("GET", playlist_endpoint);
}

function callApi(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("accessToken")
  );
  console.log(xhr);
  xhr.send(null);
  xhr.onload = () => {
    if (xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      consoreturle.log(data);
    } else {
      console.log(xhr.responseText);
      console.log("WTFFF");
    }
  };
}

