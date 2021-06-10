/**
 * Desc:
 * Class for storing info about playlists
 * @author Emily Greetis
 * Modified 6/10/2021
 */
class Playlist{

  constructor(name,description, tracks){
    this.name = name;
    this.description = description;
    this.tracks = tracks;
  }

   getAlbums () {
    playlistTracks = this.tracks;
    var albums = [];
    for(let i = 0; i < playlistTracks.length; i++){
      var rawTrack = playlistTracks[i];
      var trackObject = rawTrack.track;
      var album = trackObject.album;
      for(let j = 0; j < playlistTracks.length; i++){
        currentAlbum = playlistTracks[j].trackObject.album;
        if(album != currentAlbum){
          rawTrack = playlistTracks[i];
        }
      }
    }
    return albums;
  }

}
