import aboutValidation from './validation/aboutValidation'
import emailValidation from './validation/emailValidation'
import nameValidation from './validation/nameValidation'

export default class FormConnect {
  constructor(id) {
    if (!this._checkElems(id)) return

    this.root = document.querySelector(`#${id}`)
    this.invalidClass = 'form__input-group_invalid'

    this.inputName = document.querySelector(`#${id}-name`)
    this.nameWrapper = this.inputName.closest('.form__input-group')

    this.inputEmail = document.querySelector(`#${id}-email`)
    this.emailWrapper = this.inputEmail.closest('.form__input-group')

    this.inputAbout = document.querySelector(`#${id}-about`)
    this.aboutWrapper = this.inputAbout.closest('.form__input-group')

    this.successBlock = document.querySelector(`.form__success`)
    this.btnSend = document.querySelector(`#${id}-submit`)
    this.btnSend.addEventListener('click', this.handleClick.bind(this))
  }

  validation(name, email, about) {
    let res = true
    if (!nameValidation(name)) {
      res = false
      this.nameWrapper.classList.add(this.invalidClass)
      this.nameWrapper.dataset.after = 'Имя состоит только из букв и не менее 2-х символов!'
    }
    if (!emailValidation(email)) {
      res = false
      this.emailWrapper.classList.add(this.invalidClass)
      this.emailWrapper.dataset.after = 'Неккоректный e-mail!'
    }
    if (!aboutValidation(about)) {
      res = false
      this.aboutWrapper.classList.add(this.invalidClass)
      this.aboutWrapper.dataset.after = 'Введите не менее 10 символов!'
    }
    return res
  }

  _clearInvalid() {
    this.nameWrapper.dataset.after = ''
    this.emailWrapper.dataset.after = ''
    this.aboutWrapper.dataset.after = ''
    this.nameWrapper.classList.remove(this.invalidClass)
    this.emailWrapper.classList.remove(this.invalidClass)
    this.aboutWrapper.classList.remove(this.invalidClass)
  }

  handleClick(e) {
    e.preventDefault()
    this._clearInvalid()

    const name = this.inputName.value
    const email = this.inputEmail.value
    const about = this.inputAbout.value

    if (this.validation(name, email, about)) 
      this.send(name, email, about)
  }

  send(name, email, about) {
    //эмуляция отправки
    const send = Promise.resolve({name, email, about})
    send.then(() => {
      this.successBlock.style.left = 0
      this.successBlock.style.opacity = 1

      this.inputName.value = ''
      this.inputEmail.value = ''
      this.inputAbout.value = ''
    })
  }


  _checkElems(id) {
    return (
      document.querySelector(`#${id}`) && 
      document.querySelector(`#${id}-name`) &&
      document.querySelector(`#${id}-email`) &&
      document.querySelector(`#${id}-about`) &&
      document.querySelector(`#${id}-submit`) &&
      document.querySelector(`.form__success`)
    )
  }
}