const queueList = document.querySelector('.queue')
const addBtn = document.querySelector('.form__button-add')
const removeBtn = document.querySelector('.form__button-remove')
const input = document.querySelector('input')

const newElementStyles = `
    border: 2px solid cornflowerblue;
    border-radius: 10px;
    background-color: rgba(100, 149, 237, 0.24);
    color: cornflowerblue;
    padding: 10px;
    font-weight: bold;
    font-size: 20px;
    width: fit-content;
`

const queue = getQueueFromLocalStorage()

function enqueue(){
    const newElement = createQueueElement(input.value)
    queue.unshift(newElement)
    queue.forEach(element => queueList.append(element))
    input.value = ''
    removeBtn.removeAttribute('disabled')
    if(queue.length === 19){
        addBtn.setAttribute('disabled', 'true')
        input.setAttribute('disabled', 'true')
    }else{
        addBtn.setAttribute('disabled', 'true')
    }
    saveQueueToLocalStorage()
}

function dequeue(){
    queue.splice(queue.length - 1, 1)
    queueList.innerHTML = ''
    queue.forEach(element => queueList.append(element))
    if(queue.length === 0){
        removeBtn.setAttribute('disabled', 'true')
    }else{
        input.removeAttribute('disabled')
    }
    saveQueueToLocalStorage()
}

function createQueueElement(value){
    const newElement = document.createElement('span')
    newElement.textContent = value
    newElement.style = newElementStyles
    return newElement
}

function saveQueueToLocalStorage(){
    if(queue.length === 0){
        localStorage.removeItem('queue')
    }else{
        let items = []
        for(let item of queueList.children){
            items.unshift(item.textContent)
        }
        localStorage.setItem('queue', JSON.stringify(items))
    }
}

function getQueueFromLocalStorage(){
    const queue = localStorage.getItem('queue')
    if(queue){
        const parsedQueue = JSON.parse(queue)
        let newQueue = []
        for(let item of parsedQueue){
            const newElement = createQueueElement(item)
            newQueue.unshift(newElement)
        }
        newQueue.forEach(element => queueList.append(element))
        removeBtn.removeAttribute('disabled')
        if(newQueue.length === 19){
            input.setAttribute('disabled', 'true')
        }
        return newQueue
    }else{
        return []
    }
}

function onInputChange(e){
    if(e.target.value.length === 0){
        addBtn.setAttribute('disabled', 'true')
    }else{
        addBtn.removeAttribute('disabled')
    }
}

function onInputPressEnterKey(e){
    if(e.key === 'Enter' && e.target.value.length !== 0){
        enqueue()
    }
}

function onInputFocus(e) {
    input.style.border = '1px solid gray';
    input.style.backgroundColor = 'whitesmoke';
}

function onInputBlur(e){
    input.style.removeProperty('border');
    input.style.removeProperty('backgroundColor');
}

addBtn.addEventListener('click', enqueue)
removeBtn.addEventListener('click', dequeue)
input.addEventListener('keyup', onInputChange)
input.addEventListener('keypress',  onInputPressEnterKey)
input.addEventListener('focus', onInputFocus)
input.addEventListener('blur', onInputBlur)