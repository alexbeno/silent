class PlayListLevel {
    constructor(playList, allSoundGame){
        this.order = playList
        this.allSoundGame = allSoundGame
        this.waitTime = 2000
    }

    playAll(timer){
        timer = timer*1000
        for( let i = 1; i<this.order.length; i++ ){
            setTimeout(()=> {
                this.playCurrent(i)
            }, timer*i)
        }
    }

    playCurrent(pos) {
        // if(this.order[pos] >= this.order.length){
        //     this.oder[pos] = allSoundGame.length -1
        // }
        this.allSoundGame[this.order[pos]].volume = 1
        this.allSoundGame[this.order[pos]].currentTime = 0
        this.allSoundGame[this.order[pos]].play()
    }

    pause() {
        for(let i = 0 ; i < allSoundGame.length; i++){
            this.allSoundGame[i].pause()
        }
    }
}

export default PlayListLevel;