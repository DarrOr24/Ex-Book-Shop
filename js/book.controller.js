'use strict'

function onInit(){
    renderBooks()
}

function onRemoveBook(bookId){
    removeBook(bookId)
    renderBooks()
}