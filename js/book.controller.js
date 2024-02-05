'use strict'

function onInit(){
    renderBooks()
}

function renderBooks(){
    const elTable = document.querySelector('table')
    const books = getBooks()

    const strHtmls = books.map(book => `<tr class="header">
        <td class="col1">Title</td>
        <td class="col2">Price</td>
        <td class="col3">Actions</td>
    </tr>
    <tr>
        <td class="col1">${book.title}</td>
        <td class="col2">${book.price}</td>
        <td class="btns">
            <button class="read"   onclick="onReadBook('${book.id}')">Read</button>
            <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
    </tr>`)

    elTable.innerHTML = strHtmls.join('')
}

function onRemoveBook(bookId){
    const strHtml = removeBook(bookId)
    renderBooks()
    onPopUp(strHtml) 
}

function onUpdateBook(bookId){
    const newPrice = prompt('Enter updated price')
    const strHtml = updatePrice(bookId, newPrice)
    onPopUp(strHtml) 
    renderBooks()
}

function onAddBook(){
    const bookTitle = prompt('Enter book title')
    const bookPrice = prompt('Enter book price')
    const strHtml = addBook(bookTitle, bookPrice)
    onPopUp(strHtml) 
    renderBooks()
}

function onReadBook(bookId) {
    const elModal = document.querySelector('.book-details')
    const elTxt = elModal.querySelector('h2 span')
    const elPre = elModal.querySelector('pre')
    const elImg = elModal.querySelector('.img')

    const book = readBook(bookId)
    const bookStr = JSON.stringify(book, null, 4)
    const imgStr = `<img src="${book.img}" alt="">`
    
    elTxt.innerText = book.title
    elPre.innerText = bookStr
    elImg.innerHTML = imgStr

    elModal.showModal()
}

function onSearch(event){
    search(event.data)
}

function onClear(){
    document.querySelector('.search').reset()
    clear()
}

function onPopUp(msg){
    const elPopUp = document.querySelector('.pop-up')
    elPopUp.innerText = msg
    elPopUp.classList.remove('hidden')
    setTimeout(() => {
        elPopUp.classList.add('hidden')
    },2000)
}

