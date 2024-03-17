require('dotenv').config()
const express = require('express')
const app = express()
const bookBaseUrl = '/api/v1/books'
let books = [];

app.use(express.json());

/**
 * CRUD - CREATE READ UPDATE DELETE
 */

// CREATE
app.post(bookBaseUrl, (req, res) => {
    console.log(bookBaseUrl + " - post");
    const {name, author} = req.body;
    // validation 
    if (name == undefined || name.length == 0) {
        res.status(400).send({error: "Name is empty"})
        return
    }
    if (author == undefined || author.length == 0) {
        res.status(400).send({error: "Author is empty"})
        return
    }
    // save data
    const book = {name, author}
    books.push(book)
    // send response
    res.status(201).send(book)
})

// READ
app.get(bookBaseUrl, (req, res) => {
    console.log(bookBaseUrl + " - get");
    res.status(200).send(books)
})

// UPDATE
app.put((bookBaseUrl + '/:id'), function(req, res) {
    console.log(bookBaseUrl + " - update");
    const id = req.params.id;
    if (id == undefined || id < 0) {
        res.status(400).send({error: "Invalid Book ID"})
        return
    }
    const book = books[id];
    if (book == undefined) {
        res.status(400).send({error: "Invalid Book ID"})
        return
    }
    const {name, author} = req.body;
    if (name == undefined || name.length == 0) {
        res.status(400).send({error: "Name is empty"})
        return
    }
    if (author == undefined || author.length == 0) {
        res.status(400).send({error: "Author is empty"})
        return
    }
    const updatedBook = {name, author};
    books[id] = updatedBook
    res.status(200).send(updatedBook)
})

// DELETE
app.delete((bookBaseUrl + '/:id'), function(req, res) {
    console.log(bookBaseUrl + " - delete");
    const id = req.params.id;
    if (id == undefined || id < 0) {
        res.status(400).send({error: "Invalid Book ID"})
        return
    }
    const book = books[id];
    if (book == undefined) {
        res.status(400).send({error: "Invalid Book ID"})
        return
    }
    books.splice(id, 1);
    res.status(200).send(book)
})

// app.get('/', (req, res) => {
//   res.send('Omraj Sharma on earth###')
// })

app.listen(process.env.SERVER_PORT, () => {console.log(`Application started at port :${process.env.SERVER_PORT}`)})