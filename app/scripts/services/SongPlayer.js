//Left off on Revisit wishful coding chekpoint 7
(function() {
     function SongPlayer(Fixtures) {
         var SongPlayer = {};
         
         var currentAlbum = Fixtures.getAlbum();
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;
         
         /**
         * @function playSong
         * @desc Plays the currentBuzzObject and sets the song playing condition to true
         * @param {Object} song
         */
         var playSong = function(){
            currentBuzzObject.play();
            song.playing = true;
         };
         
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         
         var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            SongPlayer.currentSong = song;
         };
         
         
         /**
         * @function getSongIndex
         * @desc Returns the index of the specified song 
         * @param {Object} song
         */
         var getSongIndex = function(song){
             return currentAlbum.songs.indexOf(song);
         };
         
         /**
         * @function stopSong
         * @desc 
         */
         var stopSong = function(){
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
         };
         
         SongPlayer.currentSong = null;
         
         /**
         * @function SongPlayer.play
         * @desc Checks conditions for currently playing song, sets the song, and then plays the current song. Also checks if the song is already playing
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if(SongPlayer.currentSong !== song){
                setSong(song);
                playSong();
             } else if(SongPlayer.currentSong === song){
                 if(currentBuzzObject.isPaused()){
                     currentBuzzObject.play();
                 }
             } 
         };
         
         /**
         * @function SongPlayer.pause
         * @desc Pauses the currently playing song
         * @param {Object} song
         */
         SongPlayer.pause = function(song){
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };
         
         /**
         * @function SongPlayer.previous
         * @desc Allows the user to move to the previously played song
         */
         SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
             
            if (currentSongIndex < 0) {
                stopSong();
            } else{
                var song = currentAlbum.song[currentSongIndex];
                setSong(song);
                playSong(song);
            }
         };
         
         /**
         * @function SongPlayer.next
         * @desc Allows the user to move to the next song within the current album
         */
         SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
             
            if (currentSongIndex > currentAlbum.song.length) {
                stopSong();
            } else{
                var song = currentAlbum.song[currentSongIndex];
                setSong(song);
                playSong(song);
            }
         };
         
         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();