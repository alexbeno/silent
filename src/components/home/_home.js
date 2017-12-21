/**
* silent 2017
* [- home js -]
*/

import Vue from 'vue';
import router from '@/router';
import friend from '@/components/partials/friend/friend';
import circles from '@/components/partials/circle/circle';
import TextSplitter from '@/assets/js/textSplitter.js';
import { TweenMax, Power2, TimelineLite } from "gsap";

export default {
  name: 'home',
  components: {
    friend,
    circles
  },
  methods: {

    reverseCircleB: function( ) {
      // let that = this;
      let upCircle = this.upCircle;
      /* LEAVE POINT */
      upCircle.to(".home__circle--bottom .home__point--three", 0.3, {opacity: 0, zIndex: 0, ease:Power2.easeInOut});
      upCircle.to(".home__circle--bottom .home__point--two", 0.3, {opacity: 0, zIndex: 0, ease:Power2.easeInOut}, "-=0.2");
      upCircle.to(".home__circle--bottom .home__point--one", 0.3, {opacity: 0, zIndex: 0, ease:Power2.easeInOut}, "-=0.2");

      /* CIRCLE DRAWING */
      upCircle.to(".home__circle--bottom .circle__svg", 2, {strokeDashoffset: "1500",  ease:Power2.easeInOut}, "-=1");
      upCircle.to(".home__circle--top .circle__svg", 2, {strokeDashoffset: "0",  ease:Power2.easeInOut}, "-=1.5");

      upCircle.to(".home__circle--bottom .circle__svg", 0, {rotationY: "0",  ease:Power2.easeInOut});
      upCircle.to(".home__circle--top .circle__svg", 0, {rotationY: "180deg",  ease:Power2.easeInOut});

      /* ENTER POINT */
      upCircle.to(".home__circle--top .home__point--three", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-=1");
      upCircle.to(".home__circle--top .home__point--two", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-=0.7");
      upCircle.to(".home__circle--top .home__point--one", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-=0.3");


      upCircle.to(".home__circle--top .home__point--one.home__point--active", 1.5, {bottom: "-11px", ease:Power2.easeInOut}, "-=2.5");
      upCircle.to(".home__circle--top .home__point--three.home__point--active", 1.5, {bottom: "-11px", ease:Power2.easeInOut}, "-=2.5");

      upCircle.to(".home__title", 1.5, {height: "100vh" , top: 0, ease:Power2.easeInOut}, "-=2");
      upCircle.to(".homeTitle__txt", 1.5, {scale: 1, ease:Power2.easeInOut}, "-=2");
      upCircle.to(".homeTitle__explain", 1.5, {opacity: 1, ease:Power2.easeInOut}, "-=2");

      upCircle.to(".home__circle--top .home__point--one.home__point--active", 1.5, {left: "-17px", x:"0", scale: 1, ease:Power2.easeInOut}, "-=2");
      upCircle.to(".home__circle--top .home__point--three.home__point--active", 1.5, {right: "-17px", x:"0", scale: 1, ease:Power2.easeInOut}, "-=2");
      upCircle.to(".home__circle--top .home__point--two.home__point--active", 1.5, {top: "-18px", scale: 1, ease:Power2.easeInOut}, "-=2");

      // const $levelTitle = new TextSplitter(
      //   this.$el.querySelector('.homeLvl__txt'), {
      //     inner: true,
      //     type: 'word'
      //   }
      // )

      upCircle.to(".home__lvl", 1.5, {y: "50px", opacity: 0, ease:Power2.easeInOut}, "-=2.5");
      // upCircle.staggerTo($levelTitle.$words, 1.4, {
      //   y: 100,
      //   opacity: 0,
      //   ease: Power3.easeOut
      // }, 0.008, "-=2.5")

    },

    reverseCircle: function(event) {

      // let that = this;
      let upCircle = this.upCircle;

      /* LEAVE POINT */
      upCircle.to(".home__circle--top .home__point--notActive.home__point--three", 0.3, {opacity: 0, zIndex: 0, ease:Power2.easeInOut});
      upCircle.to(".home__circle--top .home__point--notActive.home__point--two", 0.3, {opacity: 0, zIndex: 0, ease:Power2.easeInOut}, "-=0.2");
      upCircle.to(".home__circle--top .home__point--notActive.home__point--one", 0.3, {opacity: 0, zIndex: 0, ease:Power2.easeInOut}, "-=0.2");

      /* CIRCLE DRAWING */
      upCircle.to(".home__circle--top .circle__svg", 2, {strokeDashoffset: "1500",  ease:Power2.easeInOut}, "-=1");
      upCircle.to(".home__circle--bottom .circle__svg", 2, {strokeDashoffset: "0",  ease:Power2.easeInOut}, "-=1.5");
      upCircle.to(".home__circle--top .circle__svg", 0, {rotationY: "0",  ease:Power2.easeInOut});
      upCircle.to(".home__circle--bottom .circle__svg", 0, {rotationY: "180deg",  ease:Power2.easeInOut});

      /* ENTER POINT */
      upCircle.to(".home__circle--bottom .home__point--notActive.home__point--three", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-=1");
      upCircle.to(".home__circle--bottom .home__point--notActive.home__point--two", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-=0.7");
      upCircle.to(".home__circle--bottom .home__point--notActive.home__point--one", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-=0.3");
      upCircle.to(".home__circle--bottom .home__point--active", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-=0.3");


      upCircle.to(".home__title", 1.5, {height: 50, top: 64, ease:Power2.easeInOut}, "-=2");
      upCircle.to(".homeTitle__txt", 1.5, {scale: 0.6, ease:Power2.easeInOut}, "-=2");
      upCircle.to(".homeTitle__explain", 1.5, {opacity: 0, ease:Power2.easeInOut}, "-=2");

      upCircle.to(".home__circle--top .home__point--one.home__point--active", 1.5, {left: "50%", x:"-22px", scale: 2, ease:Power2.easeInOut}, "-=2");
      upCircle.to(".home__circle--top .home__point--three.home__point--active", 1.5, {right: "50%", x:"22px", scale: 2, ease:Power2.easeInOut}, "-=2");
      upCircle.to(".home__circle--top .home__point--two.home__point--active", 1.5, {top: "80%", scale: 2, ease:Power2.easeInOut}, "-=2");

      upCircle.to(".home__circle--top .home__point--one.home__point--active", 1.5, {bottom: "70%", ease:Power2.easeInOut}, "-=1.5");
      upCircle.to(".home__circle--top .home__point--three.home__point--active", 1.5, {bottom: "70%", ease:Power2.easeInOut}, "-=1.5");
      upCircle.to(".home__circle--top .home__point--two.home__point--active", 1.5, {top: "5%", scale: 2, ease:Power2.easeInOut}, "-=1.5");

      const $levelTitle = new TextSplitter(
        this.$el.querySelector('.homeLvl__txt'), {
          inner: true,
          type: 'word'
        }
      )
      upCircle.to(".home__lvl", 1.2, {y: "-120px", opacity: 1, ease:Power2.easeInOut}, "-=1.5");
      upCircle.staggerFrom($levelTitle.$words, 1.4, {
        y: 100,
        opacity: 0,
        ease: Power3.easeOut
      }, 0.008, '-=1.1')
    },

    drawCircle: function() {
      let that = this;
      let upCircle = this.upCircle;
      upCircle.to(".home__circle--top .circle__svg", 2, {strokeDashoffset: "0",  ease:Power2.easeInOut});
      upCircle.to(".home__circle--top .home__point--three", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-= 1");
      upCircle.to(".home__circle--top .home__point--two", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-=0.7");
      upCircle.to(".home__circle--top .home__point--one", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut, onComplete: that.updateFinish() }, "-=0.3");
      upCircle.to(".home__circle--top .circle__svg", 0, {rotationY: "180deg",  ease:Power2.easeInOut});
    },

    updateFinish: function() {
      this.finish = true
    },

    setLevel: function(targetElement) {
      // set level one
      let lvlOneName = targetElement.getAttribute('lvl-one');
      let lvlOne = document.querySelector('.lvlName--one');
      lvlOne.setAttribute('data-lvl', lvlOneName);

      // set level two
      let lvlTwoName = targetElement.getAttribute('lvl-Two');
      let lvlTwo = document.querySelector('.lvlName--two');
      lvlTwo.setAttribute('data-lvl', lvlTwoName);

      // set level three
      let lvlThreeName = targetElement.getAttribute('lvl-three');
      let lvlThree = document.querySelector('.lvlName--three');
      lvlThree.setAttribute('data-lvl', lvlThreeName);

      //set parts name
      let partsName = document.querySelector('.homeLvl__txt');
      let partsNameAttr = targetElement.getAttribute('part-name')
      partsName.innerHTML = partsNameAttr;
    },

    clickEventLevel: function(event) {
      let element = event.target;
      if(element.classList.contains('home__point__content')) {
        element = element.parentElement;
      }
      if(element.classList.contains('home__point--active')) {
        this.reverseCircle();
        this.setLevel(element);
      }
      else {
        let activeItem = document.querySelector('.home__point--active');
        if(activeItem != null) {
          activeItem.classList.add('home__point--notActive');
          activeItem.classList.remove('home__point--active');
        }

        element.classList.remove('home__point--notActive');
        element.classList.add('home__point--active');
        setTimeout(() => {
          if(this.finish === true) {
            this.setLevel(element);
            this.reverseCircle();
          }
        }, 100);
      }
    },

    friendMoving: function(mouseX, mouseY) {
      let eyesR = document.querySelector('.eyesR');
      let eyesG = document.querySelector('.eyesG');
      let head = document.querySelector('.head');

      let eyesX = mouseX / 200;
      let eyesY = mouseY / 200;

      if(eyesY < 4) {
        eyesY = - eyesY;
      }
      else if(eyesY > 6.3) {
        eyesY = 6;
      }

      if(eyesX < 6) {
        eyesX = - eyesX;
      }
      else if(eyesX > 5.3) {
        eyesX = 5;
      }

      TweenMax.to(eyesR, 1, {
        y: eyesY,
        x: eyesX,
        ease: Power0.easeNone
      })

      TweenMax.to(eyesG, 1, {
        y: eyesY,
        x: eyesX,
        ease: Power0.easeNone
      })

      TweenMax.to(head, 1, {
        // y: eyesY,
        x: eyesX,
        ease: Power0.easeNone
      })

    },

    revert: function() {
      let returns = document.querySelector('.homeTitle__txt');
      returns.addEventListener('click', event => {
        this.reverseCircleB();
      })
    },

    mouseEvent: function(){
      // [---] event on the mouse position  [---]
      const mouse = { x: 0.5, y: 1 };
      window.addEventListener('mousemove', event => {
        if(router.history.current.name === "home") {
          mouse.x = event.clientX;
          mouse.y = event.clientY;
          this.friendMoving(mouse.x, mouse.y);
        }
      });
    },

    circleNavigation: function() {
      let upCircle = new TimelineMax;
      // let that = this;
      this.drawCircle();
      this.revert();
    },

    friendEyes: function() {
      let friend = document.querySelector('.friend__container__svg')
      setInterval(() => {
        friend.classList.remove('friend__eyesAnime')
        setTimeout(() => {
          friend.classList.add('friend__eyesAnime')
        }, 100);
      }, 2000);
    },

    notif: function() {
      const timeline = new TimelineLite()
      const $container = document.querySelector('.home__tutorial')
      const buble = document.querySelector('.homeFriend__button')
      const link = document.querySelector('.homeTutorial__containerLink')

      timeline
        .from($container, 0.6, {
          opacity: 0,
          ease: Power3.easeOut
        }, '#start')
        .staggerFrom(this.$description.$words, 1.4, {
          y: 100,
          opacity: 0,
          ease: Power3.easeOut
        }, 0.008, '#start +=0.2')
        .from(link, 1.4, {
          y: 100,
          opacity: 0,
          ease: Power3.easeOut
        }, '#start +=0.4')

      buble.style.opacity = "0"
      $container.style.display = "flex";
    },
    closeNotif: function() {
      let container = document.querySelector('.home__tutorial');
      let buble = document.querySelector('.homeFriend__button');

      buble.style.display ="none";

      TweenMax.to(container, 0.9, {
        opacity: 0,
        ease: Power3.easeOut
      })
      // container.classList.remove('home__tutorial--active');
      setTimeout(() => {
        container.style.display = "none";
      }, 1000);
    },

    fadeAmbiance: function() {
      let sound = document.querySelector('.homeAudio');

      // Set the point in playback that fadeout begins. This is for a 2 second fade out.
      let fadePoint = sound.duration - 2;

      let fadeAudio = setInterval(function () {

          // Only fade if past the fade out point or not at zero already
          if ((sound.currentTime >= fadePoint) && (sound.volume != 0.0)) {
              sound.volume -= 0.1;
          }
          // When volume at zero stop all the intervalling
          if (sound.volume === 0.0) {
              clearInterval(fadeAudio);
          }
      }, 200);
    },
    soundFirfly: function() {
      let sound = document.querySelector('.homeFirflyAudio');
      let fadePoint = sound.duration - 1.5;
      sound.play();
      sound.volume = 0.3;
      let fadeAudio = setInterval(function () {
        // Only fade if past the fade out point or not at zero already
        if ((sound.currentTime >= fadePoint) && (sound.volume > 0.1)) {
            sound.volume -= 0.1;
        }
        // When volume at zero stop all the intervalling
        if (sound.volume <= 0.1) {
            sound.pause();
            sound.currentTime = 0;
            clearInterval(fadeAudio);
        }
      }, 10);
    },

    soundButton: function() {
      let sound = document.querySelector('.homeButtonAudio');
      sound.play();
      sound.volume = 0.3;
      setTimeout(() => {
        sound.pause();
        sound.currentTime = 0;
      }, 1600);
    },

    goTo: function(event) {
      let element = event.target;
      let home = document.querySelector('.home');

      if(!event.target.classList.contains('home__point')) {
        element = element.parentElement;
      }
      let link = element.getAttribute('data-lvl');
      this.fadeAmbiance();

      home.style.opacity ="0";

      setTimeout(() => {
        router.push({ path: '/' + link });
      }, 1000);
      return;
    },
  },


  mounted: function() {
    let ink = document.querySelector('.cd-transition-layer');
    let sound = document.querySelector('.homeAudio');
    let page = document.querySelector('.home');

    this.upCircle = new TimelineMax;
    this.finish = false;
    setTimeout(() => {
      this.circleNavigation();
      this.mouseEvent();
      this.friendEyes();
      page.style.opacity="1";

      this.$description = new TextSplitter(
        this.$el.querySelector('.homeTutorial__text'), {
          inner: true,
          type: 'word'
        }
      )
    }, 100);


    // $Theo
    const timeline = new TimelineLite()
    const $circle = this.$el.querySelector('.home__circle--top .circle__svg')
    const $headline = new TextSplitter(
      this.$el.querySelector('.homeTitle__txt'), {
        inner: true,
        type: 'letter'
      }
    )

    const $description = new TextSplitter(
      this.$el.querySelector('.homeTitle__explain'), {
        inner: true,
        type: 'word'
      }
    )

    timeline
      .staggerFrom($headline.$words, 1.4, {
        y: 100,
        opacity: 0,
        ease: Power3.easeOut
      }, 0.03, '#start')
      .staggerFrom($description.$words, 1.4, {
        y: 100,
        opacity: 0,
        ease: Power3.easeOut
      }, 0.008, '#start')
    }
}