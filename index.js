require('dotenv').config()
const express = require('express')
const app = express()
const {log, validateBookRequest, validateBookId} = require('./utility/validation')
const bookBaseUrl = '/api/v1/books'
let books = [];

app.use(express.json());

/**
 * CRUD - CREATE READ UPDATE DELETE
 */

// CREATE
app.post(bookBaseUrl, (req, res) => {
    try {
        log(bookBaseUrl + " - post");
        const {name, author} = req.body;
        validateBookRequest(req, res)
        const book = {name, author}
        books.push(book)
        res.status(201).send(book)
    } catch (error) {
        res.status(400).send({error: error.message})
        log("Error - " + bookBaseUrl + " - " + "post - " + error.message)
    }
})

// READ
app.get(bookBaseUrl, (req, res) => {
    log(bookBaseUrl + " - get");
    res.status(200).send(books)
})

// UPDATE
app.put((bookBaseUrl + '/:id'), function(req, res) {
    try {
        log(bookBaseUrl + " - update");
        validateBookId(req, res, books);
        const {name, author} = req.body;
        validateBookRequest(req, req);
        const updatedBook = {name, author};
        books[id] = updatedBook
        res.status(200).send(updatedBook)
    } catch (error) {
        res.status(400).send({error: error.message})
        log("Error - " + bookBaseUrl + " - " + "put - " + error.message)
    }
})

// DELETE
app.delete((bookBaseUrl + '/:id'), function(req, res) {
    try {
        log(bookBaseUrl + " - delete");
        validateBookId(req, res, books);
        books.splice(id, 1);
        res.status(200).send(book)
    } catch (error) {
        res.status(400).send({error: error.message})
        log("Error - " + bookBaseUrl + " - " + "post - " + error.message)
    }
})

app.listen(process.env.SERVER_PORT, () => {console.log(`Application started at port :${process.env.SERVER_PORT}`)})