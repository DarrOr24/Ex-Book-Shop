'use strict'

var gFilterBy = ''

function onInit(){
    renderBooks()
}

function renderBooks(){
    const elTable = document.querySelector('tbody')
    const books = getBooks(gFilterBy)
    const emptyTable = `<tr><td colspan="3">No matching books were found</td></tr>`

    const strHtmls = books.map(book => `<tr>
        <td class="col1">${book.title}</td>
        <td class="col2">${book.price}</td>
        <td class="btns">
            <button class="read"   onclick="onReadBook('${book.id}')">Read</button>
            <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
    </tr>`)

    if (!books.length) elTable.innerHTML = emptyTable
    else elTable.innerHTML = strHtmls.join('') 
    renderStats()
}

function onRemoveBook(bookId){
    const strHtml = removeBook(bookId)
    renderBooks()
    renderPopUp(strHtml) 
}

function onUpdateBook(bookId){
    const newPrice = prompt('Enter updated price')
    const strHtml = updatePrice(bookId, newPrice)
    renderPopUp(strHtml) 
    renderBooks()
}

function onAddBook(){
    while((!bookTitle) || (!bookPrice)){
        var bookTitle = prompt('Enter book title')
        var bookPrice = prompt('Enter book price')
    }
    const strHtml = addBook(bookTitle, bookPrice)
    renderPopUp(strHtml) 
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

function onBookFilter(){
    const input = document.querySelector('input')
    gFilterBy = input.value

    renderBooks()
}

function onClear(){
    // document.querySelector('.search').reset()
    const elSearch = document.querySelector('.search')
    clear()
    elSearch.value = gFilterBy = ''
}

function renderPopUp(msg){
    const elPopUp = document.querySelector('.pop-up')
    elPopUp.innerText = msg
    elPopUp.classList.remove('hidden')
    setTimeout(() => {
        elPopUp.classList.add('hidden')
    },2000)
}

function renderStats() {
    const elExpens = document.querySelector('.expensive')
    const elCheap = document.querySelector('.cheap')
    const elAvg = document.querySelector('.average')

    const stats = getStats()
    
    elExpens.innerText = stats.expensive
    elCheap.innerText = stats.cheap
    elAvg.innerText = stats.avg
}

