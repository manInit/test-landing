import checkImg from '../images/check.png'
import emailValidation from './validation/emailValidation'

export default class Email {
  constructor(id) {
    if (!this._checkElems(id)) return

    this.input = document.querySelector(`#${id}`)
    this.root = this.input.closest('.input-btn')
    this.btn = document.querySelector(`#btn-${id}`)
    this.btn.addEventListener('click', this.clickHandler.bind(this))
  }

  clickHandler() {
    this.root.classList.remove('input-btn_invalid')
    const value = this.input.value

    if (emailValidation(value)) this.send(value)
    else {
      this.root.classList.add('input-btn_invalid')
      this.root.setAttribute('data-after', 'Некоректный email')
    }
  }

  send(email) {
    //эмуляция отправки
    const send = Promise.resolve(email)
    send.then(() => {
      this.root.classList.add('input-btn_success')
      const width = this.root.clientWidth

      const img = document.createElement('img')
      img.src = checkImg

      this.root.innerHTML = ''
      this.root.append(img)
      this.root.append('Проверьте e-mail!')
      this.root.style.width = `${width}px`
      
    })
  }

  _checkElems(id) {
    return (
      document.querySelector(`#${id}`) && 
      document.querySelector(`#btn-${id}`)
    )
  }
} 