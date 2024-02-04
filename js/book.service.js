'use strict'

var gBooks = [
    {id: 'b101', title: 'The Adventures of Lori Ipsi', price: 120},
    {id: 'b102', title: 'World Atlas', price: 300},
    {id: 'b103', title: 'Zorba the Greek', price: 87}
]

function getBooks(){
    return gBooks
}


function removeBook(bookId){
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx,1)

}

function updatePrice(bookId, newPrice){
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
    // return book
}

function addBook(bookTitle, bookPrice){
    const book = _createBook(bookTitle, bookPrice)
    gBooks.unshift(book)
    // return book

}

function _createBook(title, price){
    return {
        id: makeId(),
        title,
        price,
    }
}

function readBook(bookId) { // Read
    const book = gBooks.find(book => book.id === bookId)
    return book
}

