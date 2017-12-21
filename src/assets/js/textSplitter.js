class TextSplitter {
  constructor(el, options) {
    this.$el           = {}
    this.$el.container = el
    this.options       = options
    this.string        = this.$el.container.innerText
    this.$words        = []

    this.initParts()
  }
  /**
   * Get the board off the screen on z axis according to
   * @method initParts()
   * call in init()
   */
  initParts() {
    if (this.options.type == 'letter') {
        const words = this.string.split('')
        this.$el.container.innerText = ''
        words.forEach(
            (word, index) => {
                const $word = document.createElement('span')
                const $wordInner = document.createElement('div')

                $word.classList.add('text-word')
                $wordInner.classList.add('text-word__inner')
                $wordInner.innerText = word

                if (this.options.inner) {
                    this.$words.push($wordInner)
                    this.$words.push($word)
                } else {
                    this.$words.push($word)
                }

                $word.appendChild($wordInner)
                this.$el.container.appendChild($word)
            }
        )
    } else if (this.options.type == 'word') {
        const words = this.string.split(' ')
        this.$el.container.innerText = ''
        words.forEach(
            (word, index) => {
                const $word = document.createElement('span')
                const $wordInner = document.createElement('div')

                $word.classList.add('text-word')
                $wordInner.classList.add('text-word__inner')
                $wordInner.innerText = word

                if (this.options.inner) {
                    this.$words.push($wordInner)
                    this.$words.push($word)
                } else {
                    this.$words.push($word)
                }

                $word.appendChild($wordInner)
                this.$el.container.appendChild($word)
            }
        )
    }
    
    return this.$words
  }
}

export default TextSplitter