/**
* silent 2017
* [- oneOne js -]
*/

import Vue from 'vue';
import globalLvl from '@/components/partials/globalLvl/globalLvl';

export default {
  name: 'oneOne',
  components: {
    globalLvl
  },
  mounted: function() {
    let ink = document.querySelector('.cd-transition-layer');
    let game = document.querySelector('.game');
    setTimeout(() => {
      ink.classList.add('closing');
      game.style.opacity = "1";
    }, 100);

    setTimeout(() => {
      ink.classList.remove('visible');
      ink.classList.remove('opening');
    }, 2000);
  }
}