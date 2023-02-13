import { dragNdrop } from './dragNdrop.js'

export { workWithForm }

function workWithForm() {
  const placeholders = document.querySelectorAll('.placeholder')
  const addBtn = document.querySelector('.add-btn')
  const form = document.querySelector('.form')
  const cancelBtn = document.querySelector('.cancel-btn')
  const textarea = document.querySelector('.textarea')

  addBtn.addEventListener('click', (e) => {
    form.classList.add('active-form')
    e.target.disabled = true

    if (textarea.value) {
      let newEl = document.createElement('div')
      newEl.classList.add('item')
      newEl.draggable = true
      newEl.textContent = textarea.value
      let tooltip = document.createElement('span')
      tooltip.classList.add('tooltip')
      tooltip.textContent = 'Удалить двойным нажатием левой клавиши мыши'

      textarea.value = ''

      placeholders[0].append(newEl)
      newEl.append(tooltip)
      dragNdrop()
    }
  })

  cancelBtn.addEventListener('click', () => {
    form.classList.remove('active-form')
    addBtn.disabled = false
    addBtn.classList.remove('active-add-btn')
    textarea.value = ''
  })

  textarea.addEventListener('input', (e) => {
    if (e.target.value) {
      addBtn.classList.add('active-add-btn')
      addBtn.disabled = false
    } else {
      addBtn.classList.remove('active-add-btn')
      addBtn.disabled = true
    }
  })
}