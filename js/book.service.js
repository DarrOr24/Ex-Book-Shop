'use strict'

const STORAGE_KEY = 'bookDB'
var gBooks
_createBooks()

function getBooks(options = {}){
    const filterBy = options.filterBy.txt
    console.log(filterBy)
    if (!filterBy) return gBooks
    var filterdBooks = gBooks.filter(book => book.title.toLowerCase().includes(filterBy.toLowerCase()))
    return filterdBooks
}

function removeBook(bookId){
    const idx = gBooks.findIndex(book => book.id === bookId)
    const book = gBooks.find(book => book.id === bookId)
    gBooks.splice(idx,1)
    
    _saveBooks()
    return book
}

function updatePrice(bookId, newPrice){
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
    _saveBooks()
    return `${book.title} was successfully updated!`
}

function addBook(bookTitle, bookPrice){
    const book = _createBook(bookTitle, bookPrice)
    gBooks.unshift(book)
    _saveBooks()
    return book
}

function readBook(bookId) { // Read
    const book = gBooks.find(book => book.id === bookId)
    return book
}


function clear(){
    _createBooks()
    renderBooks()
}

function getStats() {
    return gBooks.reduce((acc, book) => {
        if(book.price >= 200) acc.expensive++
        if(book.price <= 80) acc.cheap++
        if(book.price > 80 && book.price < 200) acc.avg++

        return acc
    }, { cheap: 0, avg: 0, expensive: 0})
}


//Private functions

function _createBooks() {
    gBooks = loadFromStorage(STORAGE_KEY)
    if(!gBooks || gBooks.length === 0){
        gBooks = [
            _createBook('The Adventures of Tom Sawyer', 120, 'img/The-Adventures-of-Tom-Sawyer.png'), 
            _createBook('World Atlas', 300, 'img/World-Atlas.png'), 
            _createBook('Zorba the Greek', 87, 'img/Zorba-the-Greek.png')
        ]
        _saveBooks()
    }
}

function _createBook(title, price, img = 'img/book-cover.png', rating){
    return {
        id: makeId(),
        title,
        price,
        img,
        rating: getRandomInt(1, 11),
    }
}

function _saveBooks() {
    saveToStorage(STORAGE_KEY, gBooks)
}


