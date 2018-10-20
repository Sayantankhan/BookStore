var _ = require('lodash')

// dummy book data
var books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id:"1" , authorId: '3'},
    {name: 'The final Empire', genre: 'Fantasy', id:"2", authorId: '2'},
    {name: 'Game of Thrones', genre: 'Fiction', id:"3", authorId: '1'},
    {name: 'The lord Earth', genre: 'Sci-Fi', id:"4", authorId: '4'},
    {name: 'The Hero of Ages', genre: 'Fantasy', id:"5", authorId: '2'},
    {name: 'The color of Magic', genre: 'Fantasy', id:"6", authorId: '4'},
    {name: 'The Light of Fantastic', genre: 'Fantasy', id:"7", authorId: '4'},
];

// dummy data for author
var authors = [
    {name: 'Dave Hill', age: 46, id:"1"},
    {name: 'Brandon Sanderson', age: 46, id:"2"},
    {name: 'Patrick Rothfuss', age: 46, id:"3"},
    {name: 'Terry Pratchett', age: 93, id:"4"}
];

exports.findBook = (id)=>{
    return _.find(books,{id})
}

exports.findAuthor = (id)=>{
    return _.find(authors,{id})
}

exports.findBookWrittenByAuthor = (authorId)=>{
    return _.filter(books,{authorId})
}

exports.findAllBooks = ()=>{
    return books;
}

exports.findAllAuthors = ()=>{
    return authors
}