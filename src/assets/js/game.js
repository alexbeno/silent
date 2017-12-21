let canvas = document.querySelector(".game_dot")
let check = document.querySelector(".check")
let clear = document.querySelector(".clear")
let play = document.querySelector(".play")
const allSoundGame = document.querySelectorAll("audio.gameNote")
// import { Point } from './src/js/point.js';
// import { Grid } from './src/js/grid.js';
let playListLevel = function(playList) {
    this.order = playList
    this.waitTime = 2000

    this.playAll = function(timer){
        timer = timer*1000
        for( let i = 0; i<this.order.length; i++ ){
            setTimeout(()=> {
                this.playCurrent(i)
            }, timer*i)
        }
    }

    this.playCurrent = function(pos) {
        if(this.order[pos] >= this.order.length){
            this.oder[pos] = allSoundGame.length -1
        }
        allSoundGame[this.order[pos]].volume = 1
        allSoundGame[this.order[pos]].currentTime = 0
        allSoundGame[this.order[pos]].play()
    }

    this.pause = function() {
        for(let i = 0 ; i < allSoundGame.length; i++){
            allSoundGame[i].pause()
        }
    }
}


class Point {
    constructor( x, y, rayon = 2, toleranceArea = 5, offset = 30) {
        this.offset = offset
        this.x = x + this.offset
        this.y = y + this.offset
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
    constructor( progressX, progressY , goalX, goalY) {
        this.progressX = progressX
        this.progressY = progressY

        this.velocityX = (goalX-progressX)/10
        this.velocityY = (goalY-progressY)/10

        // console.log(this.velocityY)
        // console.log(this.velocityY)

        this.goalX = goalX
        this.goalY = goalY
    } 

    draw(){
        if(this.progressX !== this.goalX && this.progressY !== this.goalY){
            console.log('draw')
            grid.context.beginPath()
            grid.context.moveTo(this.progressX, this.progressY)
            this.progressX += this.velocityX
            this.progressY += this.velocityY
            grid.context.lineTo(this.progressX, this.progressY, 6)

            grid.context.strokeStyle = '#42d1f4'
            grid.context.shadowColor   = '#42d1f4'   // Couleur de l'ombre
            grid.context.shadowBlur    = 20       // Largeur du flou
            grid.context.shadowOffsetX = 0        // Décalage en X
            grid.context.shadowOffsetY = 0       // Décalage en Y
            grid.context.stroke()
        }            
    }
    autoDraw(){
        requestAnimationFrame(() => this.autoDraw());
        this.draw()
    }  
}

class Grid {
    constructor(numberColumn, numberLine, canvas) {
        this.numberColumn = numberColumn
        this.numberLine = numberLine

        this.points = new Array(numberColumn)
        this.lines = new Array()
        this.combinaison = new Array(numberColumn)
        this.playerCombinaison = new Array(numberColumn)

        this.spaceColumn = 100
        this.spaceLine = 100
        this.numberSelected = 0

        this.canvas = canvas
        this.context = canvas.getContext( '2d' )
        this.rayonPoint = 2

        this.startingPoint = random(0, this.numberLine)
        
    }

    init() {
        console.log('grid')
        for (let i = 0 ; i < this.numberColumn; i++ ) {
            let _x = this.spaceLine*i
            this.points[i] = new Array(this.numberLine)
            for (let j = 0 ; j < this.numberLine; j++ ){
                let _y = j*this.spaceColumn
                this.points[i][j] = new Point(_x, _y)  
            }
        }
        this.points[0][this.startingPoint].state = 'selected'
        this.numberSelected = 1
        this.playerCombinaison[0] = this.startingPoint
        this.generateCombinaison()

        this.draw()
    }
    resize(){
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if(!this.validation){
            //draw line between point
            for(let i = 1; i< this.numberSelected; i++ ) {
                let _prevX = this.points[i-1][this.playerCombinaison[i-1]].x
                let _prevY = this.points[i-1][this.playerCombinaison[i-1]].y
                let _nextX = this.points[i][this.playerCombinaison[i]].x
                let _nextY = this.points[i][this.playerCombinaison[i]].y

                this.context.beginPath()
                this.context.moveTo(_prevX, _prevY)
                this.context.lineTo(_nextX, _nextY)
                this.context.strokeStyle = '#42d1f4';
                this.context.shadowColor   = '#42d1f4';   // Couleur de l'ombre
                this.context.shadowBlur    = 20;       // Largeur du flou
                this.context.shadowOffsetX = 0;        // Décalage en X
                this.context.shadowOffsetY = 0;       // Décalage en Y
                this.context.stroke()
            }
        }
        for (let i = 0 ; i < this.numberColumn; i++ ) {
            for (let j = 0 ; j < this.numberLine; j++ ){
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
                    this.context.shadowBlur    = 30;       // Largeur du flou
                    this.context.shadowOffsetX = 0;        // Décalage en X
                    this.context.shadowOffsetY = 0;       // Décalage en Y
                    this.context.fill()


                    break;
                  case 'selected':
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
                    break;
                  case 'find':
                    this.context.fillStyle = 'green';
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
                  case 'wrong':
                    this.context.fillStyle = 'red';
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
                }
                this.context.fill()
            }
        }
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

        for( let i = 1; i<this.numberColumn; i++ ){
            let timer = 800
            setTimeout(()=> {
                let _point = this.points[i][this.playerCombinaison[i]]
                let _pointPrev = this.points[i-1][this.playerCombinaison[i-1]]
                // console.log(_point)
                if(_point.state == 'find' && _pointPrev.state == 'find'){
                    //console.log('Line')
                    let line = new Line(_pointPrev.x, _pointPrev.y, _point.x, _point.y)
                    line.autoDraw()
                } else {
                    this.context.beginPath()
                    this.context.arc( _point.x, _point.y, _point.rayon, 0, Math.PI*2 )    
                    this.context.fillStyle = 'red'
                    this.context.fill()                
                }
            }, timer*i)
        }
    }

    mousemoveInteraction(e){
        if(!this.validation){
            this.draw()

            this.mouseX = e.offsetX
            this.mouseY = e.offsetY
            let columnClicked = Math.round(this.mouseX/this.spaceColumn)
            let lineClicked = Math.round(this.mouseY/this.spaceLine)

            if(columnClicked< this.numberColumn && lineClicked<this.numberLine){
                let _closerPoint = this.points[columnClicked][lineClicked]

                if(_closerPoint.isCloseTo(this.mouseX, this.mouseY)){
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
                      case 'find':
                        this.context.fillStyle = 'green';
                        break;
                      case 'wrong':
                        this.context.fillStyle = 'red';
                        break;
                    }
                    this.context.fill() 

                    this.canvas.style.cursor = "pointer"    
                } else {
                    this.canvas.style.cursor = "auto" 
                }            
            }
            if(this.selectedPoint) {
                this.drawPath(this.closerPoint, this.mouseX, this.mouseY)
            }
        }
    }

    selectPoints(e){
        let clickX = e.offsetX
        let clickY = e.offsetY
        let columnClicked = Math.round(clickX/this.spaceColumn)
        let lineClicked = Math.round(clickY/this.spaceLine)
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
            let chosenNumber = random(0, this.numberLine)
            this.combinaison[i] = chosenNumber
        }
        return this.combinaison ;
    }

    checkValidation(){
        if(this.numberSelected == this.numberColumn){
            this.validation = true
            this.draw()
            for(let i = 0; i < this.numberColumn; i++){
                let _lineSelected = this.playerCombinaison[i]
                //if the choice of the player and the generate note are the same
                if(_lineSelected == this.combinaison[i]){
                    this.points[i][_lineSelected].state = 'find'
                } else {
                    this.points[i][_lineSelected].state = 'wrong'
                }
                this.drawValidation()
            }
        } else {
            console.log('vous n\'avez pas tout renseigner')
        }
    }

    startDragLine(e) {
        let clickX = e.offsetX
        let clickY = e.offsetY
        let columnClicked = Math.round(clickX/this.spaceColumn)
        let lineClicked = Math.round(clickY/this.spaceLine)
        let _closerPoint = this.points[columnClicked][lineClicked]
        //if we drag line from the last point select
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

    }

    stopDragLine(e){
        let clickX = e.offsetX
        let clickY = e.offsetY
        let columnClicked = Math.round(clickX/this.spaceColumn)
        let lineClicked = Math.round(clickY/this.spaceLine)
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

    drawPath(startPoint, pointX, pointY){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.draw()

        this.context.beginPath()
        this.context.moveTo(startPoint.x, startPoint.y)
        this.context.lineTo(pointX, pointY, 6)

        this.context.strokeStyle = '#42d1f4';
        this.context.shadowColor   = '#42d1f4';   // Couleur de l'ombre
        this.context.shadowBlur    = 20;       // Largeur du flou
        this.context.shadowOffsetX = 0;        // Décalage en X
        this.context.shadowOffsetY = 0;       // Décalage en Y
        this.context.stroke()
    }

    loop(){
        requestAnimationFrame(loop)
        drawPath()
    }

    clear(){
        this.validation = false
        this.numberSelected = 0
        for(let i= 0; i< this.numberColumn; i++){
            this.playerCombinaison[i] = null
            this.combinaison[i] = null
            for (let j = 0 ; j < this.numberLine; j++ ){
                this.points[i][j].state = false
            }
        }
        this.startingPoint = random(0, this.numberLine)
        this.points[0][this.startingPoint].state = 'selected'
        this.numberSelected = 1
        this.playerCombinaison[0] = this.startingPoint
        grid.generateCombinaison()
        grid.draw()
    }
}

function random(min, max)
{
    return Math.floor((Math.random() * max) + min);
}

export default Grid;