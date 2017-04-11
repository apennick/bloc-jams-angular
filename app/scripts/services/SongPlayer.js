(function() {
  /**
    How to document??
  */
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
    
    var currentAlbum = Fixtures.getAlbum();
    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;
    
    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    *@param {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
        }
        
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      SongPlayer.currentSong = song;
    };
    
    /**
      * @function playSong
      * @desc Plays currently selected song
      * @param {Object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };
    
    /**
    * @function getSongIndex
    * @desc Gets index of songs from currently playing album
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };
    
    /**
    * @desc Active song object from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;
    
    /**
    * @function SongPlayer.play
    * @desc Checks whether user is selecting the song that is already playing. If it is, assumes song is Paused so starts playing when function called.
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
          if (currentBuzzObject.isPaused()) {
            playSong(song);
          }
      }
    };
    
    /**
      * @function SongPlayer.pause
      * @desc Fires when pause button is clicked. No song playing.
      * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    
    /**
    * @function SongPlayer.previous
    * @desc Goes back to previous song by index unless on the first song of the album then stays on first song.
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      
      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
      }
    };
    
    return SongPlayer; 
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
  
})();