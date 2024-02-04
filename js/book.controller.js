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
    removeBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId){
    const newPrice = prompt('Enter updated price')
    updatePrice(bookId, newPrice)
    renderBooks()
}

function onAddBook(){
    const bookTitle = prompt('Enter book title')
    const bookPrice = prompt('Enter book price')
    addBook(bookTitle, bookPrice)
    renderBooks()
}

function onReadBook(bookId) {
    const elModal = document.querySelector('.book-details')
    const elTxt = elModal.querySelector('h2 span')
    const elPre = elModal.querySelector('pre')

    const book = readBook(bookId)
    const bookStr = JSON.stringify(book, null, 4)
    
    elTxt.innerText = book.title
    elPre.innerText = bookStr

    elModal.showModal()
}

