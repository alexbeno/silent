/**
* silent 2017
* [- globalLvl js -]
*/
import Vue from 'vue';
import router from '@/router';

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
    goHome: function() {
      let game = document.querySelector('.game');
      game.style.opacity = "0";
      setTimeout(() => {
        router.push({ path: '/home' });
      }, 1000);
    },
  },
  mounted: function() {

  }
}