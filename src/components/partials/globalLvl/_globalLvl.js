/**
* silent 2017
* [- globalLvl js -]
*/
import Vue from 'vue';

export default {
  name: 'globalLvl',
  props:['number', 'title', 'univers'],
  methods:  {
    soundButton: function() {
      let sound = document.querySelector('.homeButtonAudio');
      sound.play();
      sound.volume = 0.3;
      setTimeout(() => {
        sound.pause();
        sound.currentTime = 0;
      }, 1100);
    },
  },
  mounted: function() {

  }
}