/**
* silent 2017
* [- twoTwo js -]
*/

import Vue from 'vue';
import globalLvl from '@/components/partials/globalLvl/globalLvl';
import PlayListLevel from '@/assets/js/playlistlevel.js';
import Grid from '@/assets/js/game.js';
import router from '@/router';

export default {
  name: 'twoTwo',
  components: {
    globalLvl
  },
  data: function() {
    return {
      number: '2',
      title: 'Apprendre',
      univers: 'Awake in the clearing',
    }
  },
  methods: {
    initGame: function() {
      let canvas = document.querySelector(".game_dot")
      const sound = document.querySelector(".levelAudio")
      let canvasFinal = document.querySelector(".canvas_final")
      let check = document.querySelector(".globalLvl__containerLink")
      let play = document.querySelector(".globalLvl__play")
      const allSoundGame = document.querySelectorAll("audio.gameNote")
      const fadePoint = sound.duration - 1.5;


      //#ALEX : affiche infos
      // const life = document.querySelector(".life")
      // const lifeTotal = document.querySelector(".lifeTotal")
      //nombre de colonne, nombre de ligne, canvas, canvasFinal, tuto ou pas, nombre de vie
      const grid = new Grid(4,5, canvas, canvasFinal, false, 3, allSoundGame, "twoThree")

      grid.init()
      grid.draw()
      //#ALEX
      // life.innerHTML = grid.try
      // lifeTotal.innerHTML = grid.life
      canvas.addEventListener('mousemove', function(e){
          if(router.history.current.name === "twoTwo") {
            grid.mousemoveInteraction(e)
          }
      })

      canvas.addEventListener('mousedown', function(e){
          if(grid.tuto){
              grid.clickTuto(e)
          }
          grid.startDragLine(e)

      })

      canvas.addEventListener('mouseup', function(e){
          grid.stopDragLine(e)
      })

      check.addEventListener('click', function(e){
            e.preventDefault();
          grid.checkValidation()

          //#ALEX : affiche infos
          // life.innerHTML = grid.try
          // lifeTotal.innerHTML = grid.life
      })

      // clear.addEventListener('click', function(e){
      //     grid.clear()
      //     if(grid.numberLine == '3'){
      //         let playCombinaison = grid.combinaison.map(x => x * 2)
      //         var playList = new playListLevel(playCombinaison , allSoundGame)
      //     } else {
      //         var playList = new playListLevel(grid.combinaison , allSoundGame)
      //     }
      // })
      window.addEventListener('resize', grid.resize())

      play.addEventListener('click', function(e){
        e.preventDefault();
        sound.play();
        let fadeAudio = setInterval(function () {
          // Only fade if past the fade out point or not at zero already
          if (sound.volume > 0.1) {
              sound.volume -= 0.1;
          }
          // When volume at zero stop all the intervalling
          if (sound.volume <= 0.1) {
              sound.pause();
              sound.currentTime = 0;
              clearInterval(fadeAudio);
          }
        }, 10);
          if(grid.numberLine == '3' && (grid.tuto == false)){
              let playCombinaison = grid.combinaison.map(x => x * 2);
              var playList = new PlayListLevel(playCombinaison, allSoundGame)
          } else {
              var playList = new PlayListLevel(grid.combinaison, allSoundGame)
          }
          if(grid.tuto){
              grid.playSong()
          } else {
              playList.playAll(2)
          }
      })

      // check.addEventListener('click', function(e){
      //     grid.checkValidation()
      // })
    }
  },
  mounted: function() {
    let game = document.querySelector('.game');
    let footStart = document.querySelector('.footStart');
    let footWin =  document.querySelector('.footWin');
    this.initGame();

    setTimeout(() => {
      game.style.opacity = "1";
      footStart.volume = 0.3;
      footWin.volume = 0.3;
    }, 100);

  }
}