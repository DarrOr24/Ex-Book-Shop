'use strict'

var gBooks
var gSearchIdx = 0
_createBooks()

function getBooks(){
    return gBooks
}

function removeBook(bookId){
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx,1)
    _saveBooks()
}

function updatePrice(bookId, newPrice){
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
    _saveBooks()
    return book
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

function search(letter){
    var books = gBooks.filter(book => book.title.charAt(gSearchIdx).toLowerCase() === letter.toLowerCase() )
    gSearchIdx++
    gBooks = books
    renderBooks()
}

function clear(){
    gSearchIdx = 0
    _createBooks()
    renderBooks()
}

//Private functions

function _createBooks() {
    gBooks = loadFromStorage('bookDB')
    if(!gBooks || gBooks.length === 0){
        gBooks = [
            _createBook('The Adventures of Tom Sawyer', 120, 'img/The-Adventures-of-Tom-Sawyer.png'), 
            _createBook('World Atlas', 300, 'img/World-Atlas.png'), 
            _createBook('Zorba the Greek', 87, 'img/Zorba-the-Greek.png')
        ]
        _saveBooks()
    }
}

function _createBook(title, price, img = 'img/book-cover.png'){
    return {
        id: makeId(),
        title,
        price,
        img,
    }
}

function _saveBooks() {
    saveToStorage('bookDB', gBooks)
}


