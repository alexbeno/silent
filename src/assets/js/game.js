let canvas = document.querySelector(".game_dot")
let canvasFinal = document.querySelector(".canvas_final")
let check = document.querySelector(".check")
let clear = document.querySelector(".clear")
let play = document.querySelector(".play")
const allSoundGame = document.querySelectorAll("audio.gameNote")
import Perso from '@/assets/js/perso.js';


class Point {
    constructor( x, y, rayon = 2, toleranceArea = 5, offsetX = 30, offsetY = 30) {
        this.offsetX = offsetX
        this.offsetY = offsetY
        this.x = x + this.offsetX
        this.y = y + this.offsetY

        // this.y = y 
        this.toleranceArea = toleranceArea

        this.selectedPoint = false

        this.mouseX
        this.mouseY

        this.rayon = rayon

        this.state = false
    }
    isCloseTo(pointX, pointY){
        if((pointX <= (this.x+ this.toleranceArea)) && (pointX >= (this.x- this.toleranceArea))){
            if((pointY <= (this.y+ this.toleranceArea)) && (pointY >= (this.y- this.toleranceArea))){
                  return true      
            }
        }
    }
}

class Line {
    constructor( startX, startY , goalX, goalY, grid) {
        this.startX = startX
        this.startY = startY

        this.grid = grid
        this.last
        this.progressX = startX
        this.progressY = startY
        this.goalX = goalX
        this.goalY = goalY

        this.velocityY = (goalY-this.progressY)/10
        if(this.goalX-this.progressX == 0){
            this.velocityX = 10
        } else {
            this.velocityX = (goalX-this.progressX)/10 
        }
    } 

    draw(){

        if(this.goalX-this.progressX == 0){
            this.velocityX = 10
        }
        if( this.progressX+this.velocityX < this.goalX){
            this.grid.context.beginPath()
            this.grid.context.moveTo(this.progressX, this.progressY)
            this.progressX += this.velocityX
            this.progressY += this.velocityY
            this.grid.context.lineTo(this.progressX, this.progressY, 6)

            this.grid.context.strokeStyle = '#42d1f4'
            this.grid.context.shadowColor   = '#42d1f4'   // Couleur de l'ombre
            this.grid.context.shadowBlur    = 20       // Largeur du flou
            this.grid.context.shadowOffsetX = 0        // Décalage en X
            this.grid.context.shadowOffsetY = 0       // Décalage en Y
            this.grid.context.stroke()
        }  else {
            this.grid.context.moveTo(this.progressX, this.progressY)
            this.grid.context.lineTo(this.goalX, this.goalY, 6)
            this.grid.context.strokeStyle = '#42d1f4'
            this.grid.context.shadowColor   = '#42d1f4'   // Couleur de l'ombre
            this.grid.context.shadowBlur    = 20       // Largeur du flou
            this.grid.context.shadowOffsetX = 0        // Décalage en X
            this.grid.context.shadowOffsetY = 0       // Décalage en Y
            this.grid.context.stroke()

            cancelAnimationFrame(this.animation)
            if(this.last == 'last'){
                this.grid.validating = 'not'
                this.last = 'not'
            }
        }          
    }
    drawBeginStart(){
        if( this.progressX !== this.goalX){
            this.grid.context.beginPath()
            this.grid.context.moveTo(this.startX, this.startY)
            this.grid.context.lineTo(this.goalX, this.goalY, 6)

            this.grid.context.strokeStyle = '#42d1f4'
            this.grid.context.shadowColor   = '#42d1f4'   // Couleur de l'ombre
            this.grid.context.shadowBlur    = 20       // Largeur du flou
            this.grid.context.shadowOffsetX = 0        // Décalage en X
            this.grid.context.shadowOffsetY = 0       // Décalage en Y
            this.grid.context.stroke()
        }            
    }
    autoDraw(){
        this.grid.validating = 'validating'

        this.animation = requestAnimationFrame(() => this.autoDraw());
        this.draw()
    }  
}

class Grid {
    constructor(numberColumn, numberLine, canvas, canvasFinal, tuto, numberTry, allSoundGame) {
        this.numberColumn = numberColumn +1
        this.numberLine = numberLine 
        this.validating = 'not'
        this.points = new Array(numberColumn)
        this.lines = new Array()
        this.combinaison = new Array(numberColumn)
        this.playerCombinaison = new Array(numberColumn)

        this.spaceLine = 80
        if(this.numberLine == '3'){
            this.spaceLine = this.spaceLine*2
        }
        this.numberSelected = 0

        this.allSoundGame = allSoundGame
        this.canvas = canvas
        this.context = canvas.getContext( '2d' )

        this.canvasFinal = canvasFinal
        this.contextFinal = canvasFinal.getContext( '2d' )

        this.rayonPoint = 2

        this.try = numberTry
        this.life = numberTry
        this.startingPoint = Math.floor(this.numberLine*0.5)


        this.tuto = tuto
        this.offsetY = (window.innerHeight - ((this.numberLine-1)*this.spaceLine + 2*2))*0.60
        this.offsetX = window.innerWidth*0.20

        this.spaceColumn = (2*this.offsetX-window.innerWidth-2*2)/(-this.numberColumn+1)

    }

    init() {
        for (let i = 0 ; i < this.numberColumn; i++ ) {
            let _x = this.spaceColumn*i
            this.points[i] = new Array(this.numberLine)
            for (let j = 0 ; j < this.numberLine; j++ ){
                let _y = j*this.spaceLine
                this.points[i][j] = new Point(_x, _y, 2, 5, this.offsetX, this.offsetY)  
            }
        }
        this.points[0][this.startingPoint].state = 'selected'
        this.numberSelected = 1
        this.playerCombinaison[0] = this.startingPoint
        if(this.tuto){
            this.compteurTuto = 1
            this.numberColumn = this.numberLine +1
            this.combinaison = new Array(this.numberColumn)
            this.setTuto()
        } 
        this.generateCombinaison()

        this.draw()
    }
    resize(){
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.canvasFinal.width = window.innerWidth
      this.canvasFinal.height = window.innerHeight
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for(let i = 1; i< this.numberSelected; i++ ) {
            let _prevX = this.points[i-1][this.playerCombinaison[i-1]].x
            let _prevY = this.points[i-1][this.playerCombinaison[i-1]].y
            let _nextX = this.points[i][this.playerCombinaison[i]].x
            let _nextY = this.points[i][this.playerCombinaison[i]].y

            this.context.beginPath()
            this.context.moveTo(_prevX, _prevY)
            this.context.lineTo(_nextX, _nextY)
            this.context.strokeStyle = 'white';
            this.context.shadowColor   = 'white';   // Couleur de l'ombre
            this.context.shadowBlur    = 20;       // Largeur du flou
            this.context.shadowOffsetX = 0;        // Décalage en X
            this.context.shadowOffsetY = 0;       // Décalage en Y
            this.context.stroke()
        }
        for (let i = 0 ; i < this.numberColumn; i++ ) {
            for (let j = 0 ; j < this.numberLine; j++ ){
                if(i !== 0 || j== this.startingPoint){
                    let _point = this.points[i][j]
                    this.context.beginPath()
                    this.context.arc( _point.x, _point.y, _point.rayon, 0, Math.PI*2 )
                    switch (_point.state) {
                      case false:
                        this.context.fillStyle = 'white';
                        this.context.shadowColor   = '#fff';   // Couleur de l'ombre
                        this.context.shadowBlur    = 40;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 50;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 60;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 80;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 30;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        break;
                      case 'highlight':
                        this.context.fillStyle = 'purple';
                        this.context.shadowColor   = '#fff';   // Couleur de l'ombre
                        this.context.shadowBlur    = 40;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 30;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        break;
                      case 'selected':
                        this.context.fillStyle = 'white';
                        this.context.shadowColor   = '#white';   // Couleur de l'ombre
                        this.context.shadowBlur    = 60;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 75;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 130;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 150;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 100;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 90;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 40;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 30;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 25;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 25;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 20;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 60;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 75;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 130;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 150;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 100;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 90;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 40;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 30;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 25;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 25;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 20;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 20;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 20;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 20;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        break;
                      case 'find':
                        this.context.fillStyle = 'white';
                        this.context.shadowColor   = '#42d1f4';   // Couleur de l'ombre
                        this.context.shadowBlur    = 60;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 75;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 40;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 30;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 30;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 20;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 20;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 20;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 20;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 80;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        break;
                      case 'wrong':
                        this.context.fillStyle = 'white';
                        this.context.shadowColor   = '#fcc9e1';   // Couleur de l'ombre
                        this.context.shadowBlur    = 60;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 75;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 40;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 30;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 30;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 20;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 20;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 20;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 20;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        this.context.shadowBlur    = 80;       // Largeur du flou
                        this.context.shadowOffsetX = 0;        // Décalage en X
                        this.context.shadowOffsetY = 0;       // Décalage en Y
                        this.context.fill()
                        break;
                    }
                    this.context.fill()
                }
            }
        }
        //draw line between point
        for(let i = 0; i<this.lines.length; i++){
            this.lines[i].progressY = this.lines[i].startY
            this.lines[i].progressX = this.lines[i].startX
            this.lines[i].drawBeginStart()
        }
    }
    setTuto(){
        if(this.compteurTuto < this.numberColumn){
            let _point = this.points[this.compteurTuto][this.compteurTuto-1]
            _point.state = 'highlight'
        }
    }
    clickTuto(e){
        let clickX = e.offsetX
        let clickY = e.offsetY

        let columnClicked = Math.round((this.mouseX- this.offsetX)/(this.spaceColumn ))
        let lineClicked = Math.round((this.mouseY- this.offsetY)/(this.spaceLine))
        let _closerPoint = this.points[columnClicked][lineClicked]
        if(_closerPoint.state == "highlight"){
            _closerPoint.state = false
            this.compteurTuto = this.compteurTuto + 1
            this.setTuto()
        }        
    }

    playSong(){
        let index = this.compteurTuto-1
        if(this.numberLine == "3"){
            index = index*2
        }
        this.allSoundGame[index].volume = 1
        this.allSoundGame[index].currentTime = 0
        this.allSoundGame[index].play()
    }

    playASong(index){
        if(this.numberLine == "3"){
            index = index*2
        }
        this.allSoundGame[index].volume = 1
        this.allSoundGame[index].currentTime = 0
        this.allSoundGame[index].play()        
    }

    brume() {
        let brume = document.querySelector('.game__brume');
        let dote = document.querySelector('.game_dot');
        brume.classList.add('game__brume--active')
        dote.classList.add('game_dot--active')
      }

    drawValidation(){
        // let timer = 1000
        // for( let i = 0; i<this.numberColumn; i++ ){
        //     setTimeout(()=> {
        //         let _point = this.points[i][this.playerCombinaison[i]]
        //         this.context.beginPath()
        //         this.context.arc( _point.x, _point.y, _point.rayon, 0, Math.PI*2 )
        //         if(_point.state == 'wrong'){
        //             this.context.fillStyle = 'red'
        //             this.context.fill()
        //         }
        //         if(_point.state == 'find'){
        //             this.context.fillStyle = 'green'
        //             this.context.fill()

        //         }
        //     }, timer*i)
        // }
        
        this.validating = 'validating'
        this.lines = new Array()
        this.line = 0
        //this.draw()
        for( let i = 1; i<this.numberColumn; i++ ){
            let timer = 800

            setTimeout(()=> {
                let _point = this.points[i][this.playerCombinaison[i]]
                let _pointPrev = this.points[i-1][this.playerCombinaison[i-1]]
                this.playASong(this.combinaison[i])

                if(_point.state == 'find' && _pointPrev.state == 'find'){
                    let line = new Line(_pointPrev.x, _pointPrev.y, _point.x, _point.y, this)
                    this.lines.push(line)
                    line.autoDraw()
                    if(i == this.numberColumn-1){
                        line.last = 'last'
                        this.validating = 'not'
                    }else {
                        line.last = 'not'

                    }
                } else {
                    if(i == this.numberColumn-1){
                        this.validating = 'not'
                    }
                    if(i == this.numberColumn-1  && _point.state == 'find'){
                        this.context.beginPath()
                        this.context.arc( _point.x, _point.y, _point.rayon, 0, Math.PI*2 )    
                        this.context.fillStyle = 'white'
                        this.context.fill() 
                    } else {
                        if(_point.state == 'find'){
                            this.context.beginPath()
                            this.context.arc( _point.x, _point.y, _point.rayon, 0, Math.PI*2 )    
                            this.context.fillStyle = 'white'
                            
                            this.context.shadowColor   = '#42d1f4';   // Couleur de l'ombre
                            this.context.shadowBlur    = 40;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill()
                            this.context.shadowBlur    = 50;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill() 
                            this.context.shadowBlur    = 60;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill()
                            this.context.shadowBlur    = 70;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill()
                            this.context.shadowBlur    = 20;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill() 
                            this.context.shadowBlur    = 20;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill()
                            this.context.shadowBlur    = 80;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill()
                            this.context.fill()                             
                        } else {
                            this.context.beginPath()
                            this.context.arc( _point.x, _point.y, _point.rayon, 0, Math.PI*2 )    
                            this.context.fillStyle = 'white'
                            this.context.shadowColor   = 'red';   // Couleur de l'ombre
                            this.context.shadowBlur    = 40;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill()
                            this.context.shadowBlur    = 50;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill()
                            this.context.shadowBlur    = 80;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill() 
                            this.context.shadowBlur    = 60;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill()
                            this.context.shadowBlur    = 70;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill()
                            this.context.shadowBlur    = 20;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill() 
                            this.context.shadowBlur    = 20;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            this.context.fill()                                  
                        }
                       
                    }
               
                }
            }, timer*i)
        }
    }

    mousemoveInteraction(e){
        //if(this.validating == 'not'){
            console.log('coucou')
            this.draw()
            this.mouseX = e.offsetX
            this.mouseY = e.offsetY
            let columnClicked = Math.round((this.mouseX- this.offsetX)/(this.spaceColumn ))
            let lineClicked = Math.round((this.mouseY- this.offsetY)/(this.spaceLine))
            let isSelected = true
            if((columnClicked< this.numberColumn && columnClicked >= 0 )&& (lineClicked<this.numberLine && lineClicked >=0)){
                if(typeof(this.playerCombinaison[columnClicked]) == 'undefined'){
                    isSelected = false
                } else {
                    if(this.points[columnClicked][this.playerCombinaison[columnClicked]].state !== 'find'){
                        isSelected = false
                    }
                }
                let _closerPoint = this.points[columnClicked][lineClicked]
                if(_closerPoint.isCloseTo(this.mouseX, this.mouseY)){
                    if((!isSelected)){
                        this.context.beginPath()
                        this.context.arc( _closerPoint.x, _closerPoint.y, 3, 0, Math.PI*2 ) 
                        switch (_closerPoint.state) {
                          case false:
                            this.context.fillStyle = 'white';
                            this.context.shadowColor   = '#fff';   // Couleur de l'ombre
                            this.context.shadowBlur    = 40;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y

                            break;
                          case 'selected':
                            this.context.fillStyle = 'white';
                            this.context.shadowColor   = '#42d1f4';   // Couleur de l'ombre
                            this.context.shadowBlur    = 40;       // Largeur du flou
                            this.context.shadowOffsetX = 0;        // Décalage en X
                            this.context.shadowOffsetY = 0;       // Décalage en Y
                            break;
                        }
                        this.context.fill() 

                        this.canvas.style.cursor = "pointer"
                    } else {
                        this.canvas.style.cursor = "auto" 

                    }   
                } else {
                    this.canvas.style.cursor = "auto" 
                }            
            }
            if(this.selectedPoint) {
                this.drawPath(this.closerPoint, this.mouseX, this.mouseY)
            }
        //}
    }

    selectPoints(e){
        let clickX = e.offsetX
        let clickY = e.offsetY
            let columnClicked = Math.round((this.mouseX- this.offsetX)/(this.spaceColumn ))
            let lineClicked = Math.round((this.mouseY- this.offsetY)/(this.spaceLine))
        let _closerPoint = this.points[columnClicked][lineClicked]
        
        if (columnClicked <= this.numberSelected){
            if(_closerPoint.isCloseTo(clickX, clickY)){
                if(columnClicked == this.numberSelected){
                    this.numberSelected ++
                } else {
                    //the point of the column which was elected become false
                    this.points[columnClicked][this.playerCombinaison[columnClicked]].state = false
                }
                //new point become selected
                _closerPoint.state = 'selected'
                this.playerCombinaison[columnClicked] = lineClicked

                this.draw()
            }            
        }
    }

    generateCombinaison() {
        this.combinaison[0] = this.startingPoint
        for (let i = 1 ; i < this.numberColumn; i++ ) {
            let chosenNumber
            if(this.tuto){
                chosenNumber = i-1
            } else {
                chosenNumber = random(0, this.numberLine)
            }
            this.combinaison[i] = chosenNumber
        }
        this.perso = new Perso(this, this.combinaison)
        this.perso.nextStep()
        return this.combinaison ;
    }

    drawLevel(){
        this.contextFinal.beginPath()
        this.contextFinal.moveTo(0, this.points[0][this.startingPoint].y)
        this.contextFinal.lineTo(this.points[0][this.startingPoint].x, this.points[0][this.startingPoint].y)
        this.contextFinal.lineTo(this.points[0][this.startingPoint].x, this.canvasFinal.height)
        this.contextFinal.lineTo(0, this.canvasFinal.height)
        this.contextFinal.lineTo(0, this.points[0][this.startingPoint].y)
        this.contextFinal.fillStyle = 'black'
        this.contextFinal.fill()     
    }

    drawFinal(){
        this.drawLevel()
        let startIndex = 0
        let pointStart = this.points[0][this.playerCombinaison[0]]
        this.contextFinal.beginPath()

        for( let i = 1; i<this.numberColumn; i++ ){
            let _point = this.points[i][this.playerCombinaison[i]]
            let _pointPrev = this.points[i-1][this.playerCombinaison[i-1]]

            if(_point.state == 'find' && _pointPrev.state == 'find'){
                this.contextFinal.moveTo(_pointPrev.x, _pointPrev.y)
                this.contextFinal.lineTo(_point.x, _point.y)
                this.contextFinal.lineTo(_point.x, this.canvasFinal.height)
                this.contextFinal.lineTo(_pointPrev.x, this.canvasFinal.height)
                this.contextFinal.lineTo(_pointPrev.x, _pointPrev.y)
                this.contextFinal.fillStyle = 'black'
                this.contextFinal.fill()

            }
        }
        let pointLast = this.points[this.numberColumn-1][this.playerCombinaison[this.numberColumn-1]]
        // this.contextFinal.moveTo(pointLast.x, pointLast.y)
        // this.contextFinal.lineTo(pointLast.x, this.canvasFinal.height)
        // this.contextFinal.lineTo(this.canvasFinal.width, this.canvasFinal.height)
        // this.contextFinal.lineTo(pointStart.x, pointStart.y)
        // this.contextFinal.fillStyle = 'red'
        // this.contextFinal.fill()
        this.contextFinal.moveTo(pointLast.x, pointLast.y)
        this.contextFinal.lineTo(this.canvasFinal.width, pointLast.y)
        this.contextFinal.lineTo(this.canvasFinal.width, this.canvasFinal.height)
        this.contextFinal.lineTo(pointLast.x, this.canvasFinal.height)
        this.contextFinal.lineTo(pointLast.x, pointLast.y)
        this.contextFinal.fillStyle = 'black'
        this.contextFinal.fill()        
    }
    checkValidation(){
        this.try--
        let numberRight = 0
        if(this.numberSelected == this.numberColumn){
            this.validation = true
            this.draw()
            for(let i = 0; i < this.numberColumn; i++){
                let _lineSelected = this.playerCombinaison[i]
                //if the choice of the player and the generate note are the same
                if(_lineSelected == this.combinaison[i]){
                    this.points[i][_lineSelected].state = 'find'
                    numberRight ++
                } else {
                    this.points[i][_lineSelected].state = 'wrong'
                }
            }

            if(this.try > 0){
                if(numberRight < this.numberColumn){
                    console.log('encore des essai, pas bonne combinaison')
                    this.drawValidation()
                    this.validating = 'not'
                    //this.drawFinal()
                }
                if(numberRight == this.numberColumn){
                    console.log('encore des essai, bonne combinaison')
                    //validation finale 
                    //this.drawValidation()
                    this.checkCombinaison = new Array()
                    for(let i =0; i<this.combinaison.length; i++){
                        let _point = this.combinaison[i]
                        let state = this.points[i][_point].state
                        if(state == false){
                            this.checkCombinaison[i] = 5
                            this.perso.win = false
                        } else {
                            this.checkCombinaison[i] = this.combinaison[i]
                        }
                    }
                    this.perso.path = this.checkCombinaison
                    this.brume();
                    setTimeout(()=> {
                        console.log('plus d\'essai bonne combi')
                        //validation final
                        this.drawValidation()
                        this.perso.nextStep()
                        this.drawFinal()
    
                        this.success = true
                    }, 300)

                }
            } else {
                this.checkCombinaison = new Array()
                for(let i =0; i<this.combinaison.length; i++){
                    let _point = this.combinaison[i]
                    let state = this.points[i][_point].state
                    if(state == false){
                        this.checkCombinaison[i] = 5
                        this.perso.win = false
                    } else {
                        this.checkCombinaison[i] = this.combinaison[i]
                    }
                }
                //console.
                this.perso.path = this.checkCombinaison
                this.brume();
                setTimeout(()=> {
                    if(numberRight == this.numberColumn){
                        console.log('plus d\'essai bonne combi')
                        //validation final
                        this.drawValidation()
                        this.perso.nextStep()
                        this.drawFinal()
    
                        this.success = true
                    } else {
                        console.log('plus d\'essai maauvaise combi')
                        //validation final
                        this.drawValidation()
                        this.perso.nextStep()
                        this.drawFinal()
    
                    }
                }, 300)
            }

        } else {
            console.log('vous n\'avez pas tout renseigner')
        }
    }

    startDragLine(e) {
        let clickX = e.offsetX
        let clickY = e.offsetY
        let columnClicked = Math.round((this.mouseX- this.offsetX)/(this.spaceColumn ))
        let lineClicked = Math.round((this.mouseY- this.offsetY)/(this.spaceLine))
        if((columnClicked< this.numberColumn && columnClicked >= 0 )&& (lineClicked<this.numberLine && lineClicked >=0)){
            let _closerPoint = this.points[columnClicked][lineClicked]
            //if we drag line from the last point select
            console.log(columnClicked)
            let isSelected = true
            if(typeof(this.playerCombinaison[columnClicked]) == 'undefined'){
                isSelected = false
            } else {
                if(this.points[columnClicked][this.playerCombinaison[columnClicked]].state !== 'find'){
                    isSelected = false
                }
            }
            //console.log(typeof(this.playCombinaison[columnClicked]))
            if(!isSelected){
                if(columnClicked == this.numberSelected-1){
                    if(_closerPoint.state == 'selected'){
                        if (_closerPoint.isCloseTo(clickX, clickY)){
                            this.selectedPoint = true
                            this.closerPoint = _closerPoint
                        }
                    }
                }
                if(columnClicked <= this.numberSelected-1){
                    if(columnClicked>0){
                        if(_closerPoint.state !== 'selected'){
                            this.points[columnClicked][this.playerCombinaison[columnClicked]].state = false
                            _closerPoint.state = 'selected'
                            this.playerCombinaison[columnClicked] = lineClicked
                        }
                    }
                }

                if (columnClicked == this.numberSelected){
                    if(columnClicked > 0){
                        if(_closerPoint.isCloseTo(clickX, clickY)){
                            this.numberSelected ++ 
                            _closerPoint.state = 'selected'
                            this.playerCombinaison[columnClicked] = lineClicked      
                        } 
                    }    
                }                
                
            } else {
                console.log('find')
            }
        }

    }

    stopDragLine(e){
        let clickX = e.offsetX
        let clickY = e.offsetY
        let columnClicked = Math.round((this.mouseX- this.offsetX)/(this.spaceColumn ))
        let lineClicked = Math.round((this.mouseY- this.offsetY)/(this.spaceLine))
        if((columnClicked< this.numberColumn && columnClicked >= 0 )&& (lineClicked<this.numberLine && lineClicked >=0)){

            let _closerPoint = this.points[columnClicked][lineClicked]
            if(this.selectedPoint){
                this.selectedPoint = false

                if (columnClicked == this.numberSelected){
                    if(_closerPoint.isCloseTo(clickX, clickY)){
                        this.numberSelected ++ 
                        _closerPoint.state = 'selected'
                        this.playerCombinaison[columnClicked] = lineClicked      
                    }     
                }
            }
        }

    }

    drawPath(startPoint, pointX, pointY){
        //this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.draw()

        this.context.beginPath()
        this.context.moveTo(startPoint.x, startPoint.y)
        this.context.lineTo(pointX, pointY, 6)

        this.context.strokeStyle = 'white';
        this.context.shadowColor   = 'white';   // Couleur de l'ombre
        this.context.shadowBlur    = 20;       // Largeur du flou
        this.context.shadowOffsetX = 0;        // Décalage en X
        this.context.shadowOffsetY = 0;       // Décalage en Y
        this.context.stroke()
        this.context.shadowBlur    = 80;       // Largeur du flou
        this.context.shadowOffsetX = 0;        // Décalage en X
        this.context.shadowOffsetY = 0;       // Décalage en Y
        this.context.fill()
    }

    isSuccess(){
        return this.success
    }

    clear(){
        this.contextFinal.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.try = 3
        this.validation = false
        this.numberSelected = 0
        for(let i= 0; i< this.numberColumn; i++){
            this.playerCombinaison[i] = undefined
            this.combinaison[i] = null
            for (let j = 0 ; j < this.numberLine; j++ ){
                this.points[i][j].state = false
            }
        }
        this.lines = new Array()
        this.startingPoint = Math.floor(this.numberLine*0.5)
        this.points[0][this.startingPoint].state = 'selected'
        this.numberSelected = 1
        this.playerCombinaison[0] = this.startingPoint
        if(this.tuto){
            this.compteurTuto = 1
            this.numberColumn = this.numberLine +1
            this.combinaison = new Array(this.numberColumn)
            this.setTuto()
        } 
        grid.generateCombinaison()
        grid.draw()
    }
}

function random(min, max)
{
    return Math.floor((Math.random() * max) + min);
}


export default Grid;