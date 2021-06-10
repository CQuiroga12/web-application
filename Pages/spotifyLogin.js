const redirect_uri = "http://127.0.0.1:5500/Pages/index.html";

const client_id = "d0992046a3e246b09e04a0086bbd2e27";

const AUTHORIZE = "https://accounts.spotify.com/authorize";

const playlist_endpoint = "https://api.spotify.com/v1/me/playlists";

var playlists = [];
var albums = [];

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
  makeBoxes(playlists);
}

function callApi(method, url) {
  let req = new XMLHttpRequest();
  req.open(method, url, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("accessToken")
  );
  console.log(req);
  req.send(null);
  req.onload = () => {
    if (req.status == 200) {
      var data = JSON.parse(req.responseText);
      // consoreturle.log(data);
      console.log(data);
      playlists = data.items;
      //  console.log(playlists);
    } else {
      console.log(req.responseText);
      console.log("WTFFF");
    }
  };
}

function getAlbums(playlist) {
  var playlistTracks = playlist.tracks;
  var albums = [];
  for (let i = 0; i < playlistTracks.length; i++) {
    var rawTrack = playlistTracks[i];
    var trackObject = rawTrack.track;
    var album = trackObject.album;
    for (let j = 0; j < playlistTracks.length; j++) {
      currentAlbum = playlistTracks[j].trackObject.album;
      if (album != currentAlbum) {
        var albumName = album.name;
        var albumImages = album.images;
        albums[i] = new Album(albumName, albumImages);
      }
    }
  }
  console.log("here");
  return albums;
}

function makeBoxes(playlists) {
  var boxes = []; //array of boxes
  var div = document.createElement("div");
  div.className = "parent";
  document.body.appendChild(div); //parent button
  for (let i = 0; i < playlists.length; i++) {
    var playlistName = playlists[i].name;
    var playlistDescription = playlists[i].description;
    var playlistTracks = playlists[i].tracks;
    console.log(playlistName);
    console.log(playlistDescription);
    currentPlaylist = new Playlist(
      playlistName,
      playlistDescription,
      playlistTracks
    );
    boxes[i] = new Box(currentPlaylist, "playlist" + " " + i);
  }
  for (let i = 0; i < boxes.length; i++) {
    var currentButton = document.createElement("button");
    var currentPlaylist = boxes[i].playlist;
    currentButton.id = boxes[i].id;
    currentButton.innerText =
      currentPlaylist.name + "\n\n" + currentPlaylist.description;
    document.body.appendChild(currentButton);
    currentButton.addEventListener("click", (event) => {
      var songAlbums = getAlbums(currentPlaylist);
      for (let j = 0; j < songAlbums.length; j++) {
        var albumName = songAlbums[j].name;
        var albumImages = songAlbums[j].images;
        albums[j] = new Album(albumName, albumImages);
        console.log("albums are filled");
      }
    });
  }
}
