'use strict'

const gQueryOptions = {
    filterBy: { txt: '', minRating: 0 },
    sortBy: {},
    page: { idx: 0, size: 4 }
}


function onInit(){
    renderBooks()
    renderBookTitles()
}

function renderBooks(){
    const elTable = document.querySelector('tbody')
    const books = getBooks(gQueryOptions)

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

function renderBookTitles() {
    const books = getBooks(gQueryOptions)
    
    const strHtml = books.map(book => `
        <option>${book.title}</option>
    `).join('')

    const elBookList = document.querySelector('.book-list')
    elBookList.innerHTML += strHtml
}

function onRemoveBook(bookId){
    const book = removeBook(bookId)
    renderBooks()
    renderPopUp(`${book.title} was successfully removed!`) 
    const elBookList = document.querySelector('.book-list')
    elBookList.remove(book.title)
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
    const book = addBook(bookTitle, bookPrice)
    
    renderPopUp(`${book.title} was successfully added!`) 
    renderBooks()

    const strHtml = `<option>${book.title}</option>`
    const elBookList = document.querySelector('.book-list')
    elBookList.innerHTML += strHtml
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
    gQueryOptions.filterBy.txt = input.value
    renderBooks()
}

function onClear(){
    document.querySelector('.search').reset()
    // const elSearch = document.querySelector('.search')
    clear()
    // elSearch.value = gQueryOptions.filterBy = ''
    gQueryOptions.filterBy = ''
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

function onSetFilterBy() {
    const elBookTitle = document.querySelector('.filter-by select')
    const elRating = document.querySelector('.filter-by input')

    gQueryOptions.filterBy.txt = elBookTitle.value
    gQueryOptions.filterBy.minRating = elRating.value

    console.log(gQueryOptions.filterBy)
    renderBooks()
}

function onSetSortBy() {
    const elSortBy = document.querySelector('.sort-by select')
    const elDir = document.querySelector('.sort-by input')

    const sortBy = elSortBy.value
    const dir = elDir.checked ? -1 : 1

    if(sortBy === 'title'){
        gQueryOptions.sortBy = { title: dir }
    } else if (sortBy === 'price'){
        gQueryOptions.sortBy = { price: dir }
    } else if (sortBy === 'rating'){
        gQueryOptions.sortBy = { rating: dir }
    }

    console.log(gQueryOptions)

    // gQueryOptions.sortBy = { [sortBy]: dir }
    renderBooks()
}
