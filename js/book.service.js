'use strict'

var gBooks = [
    {id: 'b101', title: 'The Adventures of Lori Ipsi', price: 120},
    {id: 'b102', title: 'World Atlas', price: 300},
    {id: 'b103', title: 'Zorba the Greek', price: 87}
]

function getBooks(){
    return gBooks
}

function renderBooks(){
    const elTable = document.querySelector('table')
    const strHtmls = gBooks.map(book => `<tr class="header">
        <td class="col1">Title</td>
        <td class="col2">Price</td>
        <td class="col3">Actions</td>
    </tr>
    <tr>
        <td class="col1">${book.title}</td>
        <td class="col2">${book.price}</td>
        <td class="btns">
            <button class="read">Read</button>
            <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
        </td>
    </tr>`)

    elTable.innerHTML = strHtmls.join('')

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