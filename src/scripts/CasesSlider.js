export default class CasesSlider {
  constructor(className) {
    this.list = document.querySelector(`.${className}__list`)    
    this.controlRoot = document.querySelector(`.${className}__control`)
    this.count = this.list.children.length
    
    console.log(this.width)
    if (this.count > 1) {
      for (let i = 0; i < this.count; i++) {
        this.controlRoot.append(this._createBullet(i, i === 0))
      }
      this.controlRoot.addEventListener('click', this._clickHandle.bind(this))
    }
  }

  _clickHandle(e) {
    if (e.target.tagName !== 'BUTTON') return
    this._removeAllActiveClass()
    
    const btn = e.target 
    const number = btn.dataset.number
    btn.classList.add('cases__bullet_active')
    this.list.children[number].classList.add('cases__item_active')

    const widthItem = this.list.querySelector(`.cases__item`).clientWidth
    const position = (widthItem + 20) * number
    this.list.style.right = `${position}px`
  }

  _removeAllActiveClass() {
    for (let i = 0; i < this.count; i++) {
      this.controlRoot.children[i].classList.remove('cases__bullet_active')
      this.list.children[i].classList.remove('cases__item_active')
    }
  }

  _createBullet(number, isActive = false) {
    const btn = document.createElement('button')
    btn.dataset.number = number
    btn.classList.add('cases__bullet')
    if (isActive)
      btn.classList.add('cases__bullet_active')
    return btn
  }
}