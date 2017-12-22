/**
* silent 2017
* [- pre home js -]
*/

import Vue from 'vue';
import { TweenMax, Power2, TimelineLite } from "gsap";
import TextSplitter from '@/assets/js/textSplitter.js';

export default {
  name: 'levelIntro',

  components: {},

  mounted() {
    const timeline = new TimelineLite()
    const $text = new TextSplitter(
      this.$el.querySelector('.levelTutorial__explain'), {
        inner: true,
        type: 'word'
      }
    )

    timeline
      .staggerFrom($text.$words, 1.4, {
        y: 100,
        opacity: 0,
        ease: Power3.easeOut
      }, 0.008, '#start')
  },
}