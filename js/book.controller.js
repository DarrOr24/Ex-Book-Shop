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