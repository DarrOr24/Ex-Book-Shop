'use strict'

function onInit(){
    renderBooks()
}

function onRemoveBook(bookId){
    removeBook(bookId)
    renderBooks()
}

function onUpdateBook(bookId){
    const newPrice = prompt('Enter your price, be fair')
    updatePrice(bookId, newPrice)
    renderBooks()
}