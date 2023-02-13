export { dragNdrop }

let draggedItem = null
let droppedItem = null

function dragNdrop() {
  const placeholders = document.querySelectorAll('.placeholder')
  let items = document.querySelectorAll('.item')

  items.forEach(item => {
    item.addEventListener('dragstart', dragstart)
    item.addEventListener('dragend', dragend)
    item.addEventListener('dblclick', () => {
      item.remove()
    })

    item.addEventListener('dragenter', () => {
      if (draggedItem !== droppedItem) {
        droppedItem = item
      }
    })
    item.addEventListener('dragleave', () => {
      droppedItem = null
    })
  })

  placeholders.forEach(placeholder => {
    // находится над плэйсхолдером
    placeholder.addEventListener('dragover', dragover)
    // заходим на территорию плэйсхолдера
    placeholder.addEventListener('dragenter', dragenter)
    // выходим с территории плэйсхолдера
    placeholder.addEventListener('dragleave', dragleave)
    // отпустили элемент
    placeholder.addEventListener('drop', dragdrop)
  })

  function dragstart(event) {
    draggedItem = event.target
    event.target.classList.add('hold')
    setTimeout(() => {
      event.target.classList.add('hide')
    }, 0)
  }

  function dragend(event) {
    draggedItem = null
    event.target.className = 'item'
  }

  function dragover(event) {
    placeholders.forEach(placeholder =>
      placeholder.classList.add('holdstart'))
    event.preventDefault()
  }

  function dragenter(event) {
    event.target.classList.add('hovered')
  }

  function dragleave(event) {
    event.target.classList.remove('hovered')
  }

  function dragdrop(event) {
    placeholders.forEach(placeholder =>
      placeholder.classList.remove('holdstart'))
    event.target.classList.remove('hovered')

    if (droppedItem) {
      if (droppedItem.parentElement === draggedItem.parentElement) {
        const children = Array.from(droppedItem.parentElement.children)
        const draggedIndex = children.indexOf(draggedItem)
        const droppedIndex = children.indexOf(droppedItem)
        if (draggedIndex > droppedIndex) {
          draggedItem.parentElement.insertBefore(draggedItem, droppedItem)
        } else {
          draggedItem.parentElement.insertBefore(draggedItem, droppedItem.nextElementSibling)
        }
      } else {
        this.insertBefore(draggedItem, droppedItem)
      }
    } else {
      event.target.append(draggedItem)
    }
  }
}