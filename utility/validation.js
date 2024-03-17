const log = (str) => {
    console.log(str)
}

const validateBookRequest = (req, res) => {
    const {name, author} = req.body;
    if (name == undefined || name.length == 0) {
        throw new Error("Name is empty")
    }
    if (author == undefined || author.length == 0) {
        throw new Error("Author is empty")
    }
}

const validateBookId = (req, res, books) => {
    const id = req.params.id;
    if (id == undefined || id < 0) {
        throw new Error("Invalid Book ID")
    }
    const book = books[id];
    if (book == undefined) {
        throw new Error("Invalid Book ID")
    }
}

module.exports = {log, validateBookRequest, validateBookId}