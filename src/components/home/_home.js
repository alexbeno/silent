/**
* silent 2017
* [- home js -]
*/

import Vue from 'vue';
import friend from '@/components/partials/friend/friend';
import circles from '@/components/partials/circle/circle';
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
      upCircle.to(".home__circle--bottom .home__point--three", 0.5, {opacity: 0, zIndex: 0, ease:Power2.easeInOut});
      upCircle.to(".home__circle--bottom .home__point--two", 0.5, {opacity: 0, zIndex: 0, ease:Power2.easeInOut}, "-=0.2");
      upCircle.to(".home__circle--bottom .home__point--one", 0.5, {opacity: 0, zIndex: 0, ease:Power2.easeInOut}, "-=0.2");

      /* CIRCLE DRAWING */
      upCircle.to(".home__circle--bottom .circle__svg", 2, {strokeDashoffset: "1500",  ease:Power2.easeInOut});
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

      upCircle.to(".home__lvl", 1.5, {y: "50px", opacity: 0, ease:Power2.easeInOut}, "-=3.5");

    },

    reverseCircle: function(event) {

      // let that = this;
      let upCircle = this.upCircle;

      /* LEAVE POINT */
      upCircle.to(".home__circle--top .home__point--notActive.home__point--three", 0.5, {opacity: 0, zIndex: 0, ease:Power2.easeInOut});
      upCircle.to(".home__circle--top .home__point--notActive.home__point--two", 0.5, {opacity: 0, zIndex: 0, ease:Power2.easeInOut}, "-=0.2");
      upCircle.to(".home__circle--top .home__point--notActive.home__point--one", 0.5, {opacity: 0, zIndex: 0, ease:Power2.easeInOut}, "-=0.2");

      /* CIRCLE DRAWING */
      upCircle.to(".home__circle--top .circle__svg", 2, {strokeDashoffset: "1500",  ease:Power2.easeInOut});
      upCircle.to(".home__circle--bottom .circle__svg", 2, {strokeDashoffset: "0",  ease:Power2.easeInOut}, "-=1.5");
      upCircle.to(".home__circle--top .circle__svg", 0, {rotationY: "0",  ease:Power2.easeInOut});
      upCircle.to(".home__circle--bottom .circle__svg", 0, {rotationY: "180deg",  ease:Power2.easeInOut});

      /* ENTER POINT */
      upCircle.to(".home__circle--bottom .home__point--notActive.home__point--three", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-=1");
      upCircle.to(".home__circle--bottom .home__point--notActive.home__point--two", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-=0.7");
      upCircle.to(".home__circle--bottom .home__point--notActive.home__point--one", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-=0.3");
      upCircle.to(".home__circle--bottom .home__point--active", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-=0.3");


      upCircle.to(".home__circle--top .home__point--one.home__point--active", 1.5, {left: "50%", x:"-22px", scale: 2, ease:Power2.easeInOut}, "-=2");
      upCircle.to(".home__circle--top .home__point--three.home__point--active", 1.5, {right: "50%", x:"22px", scale: 2, ease:Power2.easeInOut}, "-=2");
      upCircle.to(".home__circle--top .home__point--two.home__point--active", 1.5, {top: "80%", scale: 2, ease:Power2.easeInOut}, "-=2");


      upCircle.to(".home__title", 1.5, {height: 50, top: 64, ease:Power2.easeInOut}, "-=2");
      upCircle.to(".homeTitle__txt", 1.5, {scale: 0.6, ease:Power2.easeInOut}, "-=2");
      upCircle.to(".homeTitle__explain", 1.5, {opacity: 0, ease:Power2.easeInOut}, "-=2");

      upCircle.to(".home__circle--top .home__point--one.home__point--active", 1.5, {bottom: "70%", ease:Power2.easeInOut}, "-=0.5");
      upCircle.to(".home__circle--top .home__point--three.home__point--active", 1.5, {bottom: "70%", ease:Power2.easeInOut}, "-=1.5");
      upCircle.to(".home__circle--top .home__point--two.home__point--active", 1.5, {top: "5%", scale: 2, ease:Power2.easeInOut}, "-=1.5");

      upCircle.to(".home__lvl", 1.5, {y: "-120px", opacity: 1, ease:Power2.easeInOut}, "-=1.5");
    },

    drawCircle: function() {
      let that = this;
      let upCircle = this.upCircle;
      upCircle.to(".home__circle--top .circle__svg", 2, {strokeDashoffset: "0",  ease:Power2.easeInOut});
      upCircle.to(".home__circle--top .home__point--three", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-= 1");
      upCircle.to(".home__circle--top .home__point--two", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut}, "-=0.7");
      upCircle.to(".home__circle--top .home__point--one", 0.5, {opacity: 1, zIndex: 2, ease:Power2.easeInOut, onComplete: that.finish = true }, "-=0.3");
      upCircle.to(".home__circle--top .circle__svg", 0, {rotationY: "180deg",  ease:Power2.easeInOut});
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
      if(event.target.classList.contains('home__point--active')) {
        this.reverseCircle();
        this.setLevel(event.target);
      }
      else {
        let activeItem = document.querySelector('.home__point--active');
        if(activeItem != null) {
          activeItem.classList.add('home__point--notActive');
          activeItem.classList.remove('home__point--active');
        }

        event.target.classList.remove('home__point--notActive');
        event.target.classList.add('home__point--active');
        setTimeout(() => {
          if(this.finish === true) {
            this.setLevel(event.target);
            this.reverseCircle();
          }
        }, 250);
      }
    },

    mountainMoving: function(mouseX, mouseY){
      let oneX = mouseX / 20;
      let oneY = mouseY / 20;

      let twoX = mouseX / 35;
      let twoY = mouseY / 40;

      let threeX = mouseX / 40;
      let threeY = mouseY / 30;

      let mountainOne = document.querySelector('.home__mountain--one');
      let mountainTwo = document.querySelector('.home__mountain--two');
      let mountainThree = document.querySelector('.home__mountain--three');

      TweenMax.to(mountainOne, 0.7, {
        x: oneX,
        y: oneY,
        ease: Power0.easeOut
      })

      TweenMax.to(mountainTwo, 1, {
        x: twoX,
        y: twoY,
        ease: Power0.easeOut
      })

      TweenMax.to(mountainThree, 1, {
        x: threeX,
        y: threeY,
        ease: Power0.easeOut
      })
    },

    friendMoving: function(mouseX, mouseY) {
      let eyesR = document.querySelector('.eyesR');
      let eyesG = document.querySelector('.eyesG');
      let head = document.querySelector('.head');

      let eyesX = mouseX / 100;
      let eyesY = mouseY / 100;

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
        ease: Power0.easeOut
      })

      TweenMax.to(eyesG, 1, {
        y: eyesY,
        x: eyesX,
        ease: Power0.easeOut
      })

      TweenMax.to(head, 1, {
        // y: eyesY,
        x: eyesX,
        ease: Power0.easeOut
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
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        this.mountainMoving(mouse.x, mouse.y);
        this.friendMoving(mouse.x, mouse.y);
      });
    },

    circleNavigation: function() {
      let upCircle = new TimelineMax;
      // let that = this;
      this.drawCircle();
      this.revert();
    },
    friendEyes: function() {
      let friend = document.querySelector('.friend__container__svg');
      setInterval(() => {
        friend.classList.remove('friend__eyesAnime')
        setTimeout(() => {
          friend.classList.add('friend__eyesAnime')
        }, 100);
      }, 2000);
    }
  },
  mounted: function() {
    this.upCircle = new TimelineMax;
    this.finish = false;
    setTimeout(() => {
      this.circleNavigation();
      this.mouseEvent();
      this.friendEyes();
    }, 100);
  }
}