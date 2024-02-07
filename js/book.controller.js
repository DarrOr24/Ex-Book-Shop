'use strict'

const gQueryOptions = {
    filterBy: { txt: '', minRating: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 }
}

function onInit(){
    renderBooks()
    renderBookTitles()
}

function renderBooks(){
    const elTable = document.querySelector('tbody')
    const books = getBooks(gQueryOptions)

    const emptyTable = `<tr><td colspan="4">No matching books were found</td></tr>`
    const star = '⭐'

    const strHtmls = books.map(book => `<tr>
        <td class="col1">${book.title}</td>
        <td class="col2">${book.price}</td>
        <td class="col3">${star.repeat(book.rating)}</td>
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

    // const elBookLists = document.querySelectorAll('.book-list')
    // elBookLists.forEach(list => list.innerHTML += strHtml)
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
    const book = getBookById(bookId)

    const elModal = document.querySelector('.book-edit-modal')
    const elTitle = elModal.querySelector('h2')
    const elBookId = elModal.querySelector('.book-title')
    elBookId.id = bookId
    elTitle.innerText = 'Update' 
    
    
    const elTitleInput = elModal.querySelector('.book-title')
    elTitleInput.value = book.title
    elModal.showModal()
}

function onAddBook(){
    const elModal = document.querySelector('.book-edit-modal')
    const elTitle = elModal.querySelector('h2')
    elTitle.innerText = 'Add a book'
    const elTitleInput = elModal.querySelector('.book-title')
    if(elTitleInput.classList.contains('hidden')) elTitleInput.classList.remove('hidden')
    elModal.showModal()
}

function onReadBook(bookId) {
    const elModal = document.querySelector('.book-details')
    const elTxt = elModal.querySelector('h2 span')
    const elPre = elModal.querySelector('pre')
    const elImg = elModal.querySelector('.img')
    const elUpdateBtn = elModal.querySelector('.update-details')
    elUpdateBtn.id = bookId

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
    clear()
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

    renderBooks()
}

function onSetSortBy() {
    const elSortBy = document.querySelector('.sort-by select')
    const elDir = document.querySelector('.sort-by input')

    const sortBy = elSortBy.value
    const dir = elDir.checked ? -1 : 1

    if(sortBy === 'title'){
        onSortByTitle(dir)
    } else if (sortBy === 'price'){
        onSortByPrice(dir)
    } else if (sortBy === 'rating'){
        onSortByRate(dir)
    }
    renderBooks()
}

function onSortByPrice(dir = 0 ){
    const elPriceColSpan = document.querySelector('.col2 span') 
    const elRateColSpan = document.querySelector('.col3 span') 
    elRateColSpan.innerText = ''
    const elTitleColSpan = document.querySelector('.col1 span') 
    elTitleColSpan.innerText = ''
   
    if(!dir){

        if((!elPriceColSpan.innerText) || (elPriceColSpan.innerText === '-') ) {
            gQueryOptions.sortBy = {price: 1}
            elPriceColSpan.innerText = '+'
        }
        else if(elPriceColSpan.innerText === '+'){
            gQueryOptions.sortBy = {rating: -1}
            elPriceColSpan.innerText = '-'
        }
    }

    else{
        gQueryOptions.sortBy = {price: dir}
        if(dir === 1) elPriceColSpan.innerText = '+' 
        else elPriceColSpan.innerText = '-'
    }
    renderBooks()
}

function onSortByRate(dir=0){
    const elRateColSpan = document.querySelector('.col3 span') 
    const elPriceColSpan = document.querySelector('.col2 span') 
    elPriceColSpan.innerText = ''
    const elTitleColSpan = document.querySelector('.col1 span') 
    elTitleColSpan.innerText = ''

    if(!dir){

        if((!elRateColSpan.innerText) || (elRateColSpan.innerText === '-') ) {
            gQueryOptions.sortBy = {rating: 1}
            elRateColSpan.innerText = '+'
        }
        else if(elRateColSpan.innerText === '+'){
            gQueryOptions.sortBy = {rating: -1}
            elRateColSpan.innerText = '-'
        }
    }

    else {
        gQueryOptions.sortBy = {rating: dir}
        if(dir === 1) elRateColSpan.innerText = '+' 
        else elRateColSpan.innerText = '-'
    }
   
    renderBooks()
}

function onSortByTitle(dir = 0){
    const elPriceColSpan = document.querySelector('.col2 span') 
    elPriceColSpan.innerText = ''
    const elRateColSpan = document.querySelector('.col3 span') 
    elRateColSpan.innerText = ''
    const elTitleColSpan = document.querySelector('.col1 span')
    console.log(dir)
    
    if(!dir){

        if((!elTitleColSpan.innerText) || (elTitleColSpan.innerText === '-') ) {
            gQueryOptions.sortBy = {title: 1}
            elTitleColSpan.innerText = '+'
        }
        else if(elTitleColSpan.innerText === '+'){
            gQueryOptions.sortBy = {title: -1}
            elTitleColSpan.innerText = '-'
        }
    }

    else {
        gQueryOptions.sortBy = {title: dir}
        if(dir === 1) elTitleColSpan.innerText = '+' 
        else elTitleColSpan.innerText = '-'
    }
    
    
    renderBooks()
}

function onSaveBook(){
    const elForm = document.querySelector('.book-edit-modal form')

    const elBookTitle = elForm.querySelector('.book-title')
    const elBookPrice = elForm.querySelector('.book-price')
    const elBookRate = elForm.querySelector('label input')
    
    const bookTitle = elBookTitle.value
    const bookPrice = elBookPrice.value
    const bookRate = elBookRate.value

    if (!bookTitle) {
        alert('Enter book title')
        return
    } 
    if (!bookPrice) {
        alert('Enter book price')
        return
    } 
  
    const elTitle = elForm.querySelector('h2')

    if (elTitle.innerText === 'Update'){
        const bookId = elBookTitle.id
        renderPopUp(`${bookTitle} was successfully updated!`)
        var book = updateBook(bookId, bookTitle, bookPrice) 
    }

    else {
        book = addBook(bookTitle, bookPrice)
        renderPopUp(`${book.title} was successfully added!`) 
        const strHtml = `<option>${book.title}</option>`
        const elBookList = document.querySelector('.book-list')
        elBookList.innerHTML += strHtml
    }

    elForm.reset()
    book.rating = bookRate
    renderBooks() 
}

function onCloseBookEdit() {
    document.querySelector('.book-edit-modal').close()
}

function onNextPage() {
    const bookCount = getBookCount(gQueryOptions.filterBy)

    if(bookCount > (gQueryOptions.page.idx + 1) * gQueryOptions.page.size){
        gQueryOptions.page.idx++
    } else {
        gQueryOptions.page.idx = 0
    }
    renderBooks()
}
