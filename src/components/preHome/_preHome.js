/**
* silent 2017
* [- pre home js -]
*/

import Vue from 'vue';
import { TweenMax, Power2, TimelineLite } from "gsap";
import drag from '@/components/partials/drag/drag';
import TextSplitter from '@/assets/js/textSplitter.js';

export default {
  name: 'preHome',

  components: {
    drag
  },

  mounted() {
    const timeline = new TimelineLite()
    const $cursor = this.$el.querySelector('.preHomeDrag__dragLine__pointContainer')
    const $dragLine = this.$el.querySelector('.preHomeDrag__dragLine__line')
    const $dragTarget = this.$el.querySelector('.preHomeDrag__dragLine__point--two')
    const $headphones = this.$el.querySelector('.preHomeDrag__headPhone')
    const $text = new TextSplitter(
      this.$el.querySelector('.preHome__explain'), {
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
      .from($cursor, 1.8, {
        x: $dragLine.offsetWidth,
        opacity: 0,
        scale: 0,
        ease: Expo.easeInOut
      }, '#start')
      .from($dragLine, 1.8, {
        transformOrigin: 'right',
        scaleX: 0,
        ease: Expo.easeInOut
      }, '#start')
      .from($dragTarget, 1.8, {
        scale: 0,
        opacity: 0,
        ease: Power3.easeOut
      }, '#start')
      .from($headphones, 4, {
        opacity: 0,
        ease: Power3.easeOut
      }, '-= 0.7')
  },
}