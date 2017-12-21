class Perso {
  constructor(grid, path) {
    this.posX = 0;
    this.posY = path[0];
    this.newPosX = 0;
    this.newPosY = path[0];
    this.incX = 0;
    this.incY = 0;
    this.imageRatio = 2;

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
    this.floatingPerso = this.personageHeight + 6;
    this.win = (path.indexOf(5) == -1 ? true : false);
    this.begin = 0;

  }

  drawPerso() {
    console.log(this.grid)
    //this.grid.drawFinal();
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
      console.log(this.incX* this.currentAnimeFrame)
      console.log(this.grid.points[this.posX][this.posY].x)
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
      this.incY = (this.grid.canvasFinal.height - this.grid.points[this.posX][this.posY].y) / this.numFrame;
      this.incX = 0;
    }
    console.log("posX : " + this.posX);
    console.log("incX : " + this.incX);
    console.log("incY : " + this.incY);
    
  }

  movePerso() {
    if (this.continueAnime()) {
      this.drawPerso();
      this.currentAnimeFrame++;
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

    console.log(this.posX)
    console.log(this.posY)
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
