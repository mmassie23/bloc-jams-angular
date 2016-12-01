//Left off on Revisit wishful coding chekpoint 7
(function() {
     function SongPlayer() {
         var SongPlayer = {};
         
         var currentSong = null;
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;
         
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            currentSong = song;
        };
         
         /**
         * @function SongPlayer.play
         * @desc Checks conditions for currently playing song, sets the song, and then plays the current song. Also checks if the song is already playing
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
             if(currentSong !== song){
                setSong(song);
                playSong();
             } else if(currentSong === song){
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
             currentBuzzObject.pause();
             song.playing = false;
         };
         
         /**
         * @function playSong
         * @desc Plays the currentBuzzObject and sets the song playing condition to true
         * @param {Object} song
         */
         var playSong = function(){
            currentBuzzObject.play();
            song.playing = true;
         };
         
         return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();