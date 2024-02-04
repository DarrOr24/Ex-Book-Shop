'use strict'

function onInit(){
    renderBooks()
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