/**
* silent 2017
* [- circle js -]
*/

import Vue from 'vue';
import router from '@/router';
import map from '@/assets/js/map.js';

export default {
  name: 'drag',

  data() {
    return {
      el: {
        cursor: null,
        line: null,
      },
      cursorPosition: 0,
      lineWidth: 0,
      leftLimit: 0,
      rightLimit: 0,
      cursorActive: false,
      tempMove: 0,
    }
  },

  mounted() {
    setTimeout(() => {
      let page = document.querySelector('.preHome');
      page.style.opacity="1";
    }, 100)
    this.init()
  },

  methods: {

    init() {
      this.el.cursor = this.$el.querySelector('.preHomeDrag__dragLine__pointContainer')
      this.el.line = this.$el.querySelector('.preHomeDrag__dragLine__line')
      this.leftLimit = Math.round(this.el.line.getBoundingClientRect().left)
      this.rightLimit = Math.round(this.el.line.getBoundingClientRect().left + this.el.line.getBoundingClientRect().width)
      this.lineWidth = Math.round(this.el.line.getBoundingClientRect().width)
    },

    panStart(event) {
      this.cursorActive = true
    },

    panMove(event) {
      this.cursorPosition = Math.round(this.el.cursor.getBoundingClientRect().left) + (this.el.cursor.offsetWidth / 2)
      this.tempMove = event.deltaX

      let value = map(this.cursorPosition, this.leftLimit, this.rightLimit, 0, 1);
      this.updateCursorPosition(value)
    },

    panEnd() {
      let value = Math.round(this.el.line.getBoundingClientRect().width / 2)
      this.endCursorPosition(value)
    },

    updateCursorPosition(value) {
      if (this.cursorActive) {
        if (value >= 0 && value <= 1) {
          TweenMax.to(this.el.cursor, 0.3, {
              x: this.tempMove,
              ease: Power0.easenone
          })
        }
      }
    },

    endCursorPosition(value) {
      if (this.tempMove >= 0 && this.tempMove >= value) {
        TweenMax.to(this.el.cursor, 1.2, {
          x: this.lineWidth,
          ease: Power3.easeOut
        })
        this.changePage()

      } else if (this.tempMove < value) {
        TweenMax.to(this.el.cursor, 1.2, {
          x: 0,
          ease: Power3.easeOut
        })
      }
    },
    fadeAmbiance() {
      let sound = document.querySelector('.preHomeAudio');
      let fadePoint = sound.duration - 10;
      let fadeAudio = setInterval(function () {
        // Only fade if past the fade out point or not at zero already
        if ((sound.currentTime >= fadePoint) && (sound.volume > 0.1)) {
            sound.volume -= 0.1;
        }
        // When volume at zero stop all the intervalling
        if (sound.volume <= 0.1) {
            clearInterval(fadeAudio);
        }
      }, 100);
    },

    changePage() {
      this.fadeAmbiance()
      let page = document.querySelector('.preHome');
      page.style.opacity="0";
      setTimeout(() => {
        router.push({ path: '/home'})
      }, 1000)
    },

    resize() {

    }

  }
}