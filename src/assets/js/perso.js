class Perso {
  constructor(grid, path) {
    this.posX = 0;
    this.posY = path[0];
    this.newPosX = 0;
    this.newPosY = path[0];
    this.incX = 0;
    this.incY = 0;
    this.imageRatio = 1;

    this.path = path;
    this.currentStep = 0;
    this.personage = new Image();
    this.personage.src = "../../../static/image/level/Pers.png";
    this.personageWidth = 42 / this.imageRatio;
    this.personageHeight = 88 / this.imageRatio;

    this.context = grid.contextFinal;
    this.grid = grid;
    this.numFrame = 70;
    this.currentAnimeFrame = 0;
    this.floatingPerso = this.personageHeight;
    this.win = (path.indexOf(5) == -1 ? true : false);
    this.begin = 0;
    this.fall = false;
    this.fallB = false;
    this.falling = false;

  }

  drawPerso() {
    this.grid.draw()
    //this.grid.drawLevel()
    // drawFinal
    // arctan(y / x)
    // let adjacentX = grid.points[this.newPosX][this.newPosY].x - grid.points[this.posX][this.posY].x;
    // let opositeY = grid.points[this.newPosX][this.newPosY].y - grid.points[this.posX][this.posY].y;
    // let angle = Math.atan(opositeY / adjacentX);
    // this.context.rotate(Math.PI / 180 * angle) // rotate by 1 degree
    if ((this.newPosY != 5) && (this.begin > 1)) {
      this.context.clearRect(0, 0, this.grid.canvasFinal.width, this.grid.canvasFinal.height)

      let x = this.grid.points[this.posX][this.posY].x + this.incX * this.currentAnimeFrame - this.floatingPerso / 4;
      let y = this.grid.points[this.posX][this.posY].y + this.incY * this.currentAnimeFrame - this.floatingPerso;
      this.context.drawImage(this.personage, x, y, this.personageWidth, this.personageHeight);
    } else if (((this.incX * this.currentAnimeFrame) <= this.grid.points[this.posX][this.posY].x) && (this.begin <= 1)){
      this.context.clearRect(0, 0, this.grid.canvasFinal.width, this.grid.canvasFinal.height)

      let x = this.incX * this.currentAnimeFrame - this.floatingPerso / 4;
      let y = this.grid.points[this.posX][this.posY].y - this.floatingPerso;
      this.context.drawImage(this.personage, x, y, this.personageWidth, this.personageHeight);
    }
    else if (this.begin > 1){
      this.context.clearRect(0, 0, this.grid.canvasFinal.width, this.grid.canvasFinal.height)

      let x = this.grid.points[this.posX][this.posY].x + this.floatingPerso / 4;
      let y = this.grid.points[this.posX][this.posY].y + this.incY * this.currentAnimeFrame - this.floatingPerso;
      this.context.drawImage(this.personage, x, y, this.personageWidth, this.personageHeight);
    }
    this.grid.drawLevel()
    if(this.begin > 1){
      this.grid.drawFinal()
    }
  }
  changePos() {
    this.currentAnimeFrame = 0;

    this.posX = parseInt(this.newPosX);
    this.posY = parseInt(this.newPosY);
    this.newPosX++;
    this.newPosY = this.path[this.currentStep];
    if ((this.newPosY != 5) && (this.currentStep < this.path.length)) {
      this.incX = parseFloat((this.grid.points[this.newPosX][this.newPosY].x - this.grid.points[this.posX][this.posY].x) / this.numFrame);
      this.incY = parseFloat((this.grid.points[this.newPosX][this.newPosY].y - this.grid.points[this.posX][this.posY].y) / this.numFrame);
    } else if (this.begin <= 1) {
      this.incY = 0;
      this.incX = (this.grid.points[this.posX][this.posY].x) / this.numFrame;
    } else if (this.win) {
      this.incY = 0;
      this.incX = (this.grid.canvasFinal.width - this.grid.points[this.posX][this.posY].x) / this.numFrame;
    } else {
      this.falling = true;
      this.incY = (this.grid.canvasFinal.height - this.grid.points[this.posX][this.posY].y) / this.numFrame;
      this.incX = 0;
    }
  }

  movePerso() {
    if (this.continueAnime()) {
      this.drawPerso();
      if(this.begin <=1){
        if(this.currentAnimeFrame < 60 ) {
          this.currentAnimeFrame++;
        }
        else {
          let footStart = document.querySelector('.footStart');
          if(footStart != null) {
            let fadeAudio = setInterval(function () {
              // Only fade if past the fade out point or not at zero already
              if (footStart.volume > 0.1) {
                  footStart.volume -= 0.1;
              }
              // When volume at zero stop all the intervalling
              if (footStart.volume <= 0.1) {
                  footStart.pause();
                  footStart.currentTime = 0;
                  clearInterval(fadeAudio);
              }
            }, 10);
          }
        }
      }
      else if(!this.win && this.begin > 1 && this.fall === false) {
        if(this.falling === true) {
          this.fall = true;
          if(this.fall === true) {
              let footFall =  document.querySelector('.footFall');
                footFall.currentTime = 1;
                footFall.play();
              setTimeout(() => {
                let fadeAudioC = setInterval(function () {
                // Only fade if past the fade out point or not at zero already
                if (footFall.volume > 0.1) {
                    footFall.volume -= 0.1;
                }
                // When volume at zero stop all the intervalling
                if (footFall.volume <= 0.1) {
                    footFall.pause();
                    footFall.currentTime = 0;
                    clearInterval(fadeAudioC);
                }
              }, 10);
            }, 4500);
          }
        }
      }
      else if(this.win && this.fall === false ) {
        this.fall = true;
        if(this.fall === true) {
          let footWin =  document.querySelector('.footWin');
          footWin.play();
          setTimeout(() => {
            let fadeAudioB = setInterval(function () {
              // Only fade if past the fade out point or not at zero already
              if (footWin.volume > 0.1) {
                  footWin.volume -= 0.1;
              }
              // When volume at zero stop all the intervalling
              if (footWin.volume <= 0.1) {
                  footWin.pause();
                  footWin.currentTime = 0;
                  clearInterval(fadeAudioB);
              }
            }, 10);
          }, 3500);
        }r
      }
      if(!this.win && this.begin > 1 && this.fallB === false) {
        this.fallB = true;
        if(this.fallB === true) {
          let footWinB =  document.querySelector('.footWin');
          footWinB.play();
          setTimeout(() => {
            let fadeAudioD = setInterval(function () {
              // Only fade if past the fade out point or not at zero already
              if (footWinB.volume > 0.1) {
                  footWinB.volume -= 0.1;
              }
              // When volume at zero stop all the intervalling
              if (footWinB.volume <= 0.1) {
                  footWinB.pause();
                  footWinB.currentTime = 0;
                  clearInterval(fadeAudioD);
              }
            }, 10);
          }, 3500);
        }
      }
      if(!this.win && this.begin > 1) {
        this.currentAnimeFrame++;
      }
      if(this.win && this.begin > 1) {
        this.currentAnimeFrame++;
      }
      requestAnimationFrame(() => this.movePerso());
    } else if ((this.currentStep < this.path.length) && (this.begin > 1)){
      this.nextStep();
    }
  }

  continueAnime() {
    let currentY
    let currentX
    if(this.begin <=1){
      currentY = this.grid.points[this.posX][this.posY].y + (this.currentAnimeFrame * this.incY);
      currentX = (this.currentAnimeFrame * this.incX);
    } else {
      currentY = this.grid.points[this.posX][this.posY].y + (this.currentAnimeFrame * this.incY);
      currentX = this.grid.points[this.posX][this.posY].x + (this.currentAnimeFrame * this.incX);
    }
    let boolX = false;
    let boolY = true;
    if (this.newPosY < 5  ) {
      boolX = (currentX < this.grid.points[this.newPosX][this.newPosY].x);
    } else if (this.grid.canvasFinal.height >= this.grid.points[this.posX][this.posY].y) {
      boolX = true
    }
    return (boolX);
  }

  nextStep() {
    // console.log(this.path)
    if (this.begin <= 1) {
      this.currentStep = 0;
      this.begin++;
      this.newPosX = 0;
    }
    if (this.begin > 1) {
      this.currentStep++;
      this.changePos();
      this.movePerso();
    } else {
        this.changePos();
        this.movePerso();
    }
  }

}
export default Perso;
// let tab = [1, 0, 1, 5, 2];
// let bob = new perso(grid, tab);
// bob.init();
