/**
* silent 2017
* [- oneOne js -]
*/

import Vue from 'vue';
import globalLvl from '@/components/partials/globalLvl/globalLvl';
import Grid from '@/assets/js/game.js';

export default {
  name: 'oneOne',
  components: {
    globalLvl
  },
  data: function() {
    return {
      number: '1',
      title: 'Your first step',
      univers: 'Awake in the clearing',
    }
  },
  methods: {
    initGame: function() {
      let canvas = document.querySelector(".game_dot")
      // let check = document.querySelector(".check")
      // let clear = document.querySelector(".clear")
      // let play = document.querySelector(".play")

      let grid = new Grid(6,3, canvas)
      grid.init()

      canvas.addEventListener('mousemove', function(e){
          grid.mousemoveInteraction(e)
      })

      canvas.addEventListener('mousedown', function(e){
          grid.startDragLine(e)
      })

      canvas.addEventListener('mouseup', function(e){
          grid.stopDragLine(e)
      })
    
      window.addEventListener('resize', grid.resize())

      // check.addEventListener('click', function(e){
      //     grid.checkValidation()
      // })
    }
  },
  mounted: function() {
    let ink = document.querySelector('.cd-transition-layer');
    let game = document.querySelector('.game');
    this.initGame();

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