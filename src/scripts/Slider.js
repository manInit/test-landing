export default class Slider {
  constructor(className) {
    if (!this._checkElements(className)) return
    this.className = className

    this.list = document.querySelector(`.${className}__list`)  
    this.listItem = this.list.querySelector(`.${className}__item`)
    this.controlRoot = document.querySelector(`.${className}__control`)

    this.classItemActive = `${this.className}__item_active`
    this.classBtnActive = `${this.className}__bullet_active`
    
    this.count = this.list.children.length
    this.mouseX = 0
    this.activeNumber = 0
    
    if (this.count > 1) {
      for (let i = 0; i < this.count; i++) {
        this.controlRoot.append(this._createBullet(i, i === 0))
      }
      this.controlRoot.addEventListener('click', this._clickHandle.bind(this))
      this.list.addEventListener('mousedown', this._mouseDownHandle.bind(this))
      this.list.addEventListener('mouseup', this._mouseUpHandle.bind(this))
    }
  }

  showSlide(number) {
    this._removeAllActiveClass()
    this.list.children[number].classList.add(this.classItemActive)
    this.controlRoot.children[number].classList.add(this.classBtnActive)

    const widthItem = this.listItem.clientWidth
    const style = window.getComputedStyle(this.list.children[1])

    const position = (widthItem + parseInt(style.marginLeft)) * number
    this.list.style.right = `${position}px`
  }

  _checkElements(className) {
    return (document.querySelector(`.${className}__list`) &&
        document.querySelector(`.${className}__item`) &&
        document.querySelector(`.${className}__control`)) 
  }

  _mouseDownHandle(e) {
    e.preventDefault()
    this.mouseX = e.clientX
  }

  _mouseUpHandle(e) {
    e.preventDefault()
    const deltaX = e.clientX - this.mouseX
    if (deltaX < -5) {
      if (this.activeNumber === this.count - 1) return
      this.activeNumber++
    } else if (deltaX > 5) {
      if (this.activeNumber === 0) return 
      this.activeNumber--
    }

    this.showSlide(this.activeNumber)
  }

  _clickHandle(e) {
    if (e.target.tagName !== 'BUTTON') return
    
    const btn = e.target 
    const number = btn.dataset.number

    this.activeNumber = number
    this.showSlide(number)
  }

  _removeAllActiveClass() {
    for (let i = 0; i < this.count; i++) {
      this.controlRoot.children[i].classList.remove(this.classBtnActive)
      this.list.children[i].classList.remove(this.classItemActive)
    }
  }

  _createBullet(number, isActive = false) {
    const btn = document.createElement('button')
    btn.dataset.number = number
    btn.classList.add(`${this.className}__bullet`)
    if (isActive) {
      btn.classList.add(this.classBtnActive)
    }
    return btn
  }
}