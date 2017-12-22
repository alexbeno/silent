/**
* silent 2017
* [- header js -]
*/

import Vue from 'vue';

export default {
  name: 'about',
  methods: {
    closes: function() {
      let section = document.querySelector('.about');
      section.style.opacity ="0";
      setTimeout(() => {
        section.classList.remove('about--active');
      }, 100);
    }
  },
  mounted: function() {
  }
}