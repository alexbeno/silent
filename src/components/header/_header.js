/**
* silent 2017
* [- header js -]
*/

import Vue from 'vue';

export default {
  name: 'headers',
  methods: {
    opens: function() {
      let section = document.querySelector('.about');
      section.classList.add('about--active');
      setTimeout(() => {
        section.style.opacity ="1";
      }, 100);
    }
  },
  mounted: function() {
  }
}