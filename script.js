const myLibrary = []

addBookToLibrary("The Hobbit", "J.R.R Tolkien", 295, false, 1)
addBookToLibrary("The Hunger Games", "Suzanne Collins", 374, true, 2)
addBookToLibrary("Divergent", "Veronica Roth", 487, true, 3)
addBookToLibrary("The Maze Runner", "James Dashner", 384, false, 4)

containerDiv = document.querySelector(".container")

for (const book of myLibrary) {
    createBookCard(book)
}

document.querySelector("form").addEventListener("submit", getFormValues)

function getFormValues(event) {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const pages = event.target.pages.value
    const read = true
    const id = myLibrary.length + 1
    addBookToLibrary(title, author, pages, read, id)
    createBookCard(myLibrary[myLibrary.length - 1])
}


console.log(myLibrary.length)

function Book(title, author, numPages, hasRead, id) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.hasRead = hasRead
    this.id = id
}

Book.prototype.info = function () {
    readPrintStatement = this.hasRead ? "read" : "not read yet"
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${readPrintStatement}, id:${this.id}`
}

function addBookToLibrary(title, author, numPages, hasRead, id) {
    const newBook = new Book(title, author, numPages, hasRead, id)
    myLibrary.push(newBook)
}

function createBookCard(book) {
    const theCard = document.createElement("div")
    theCard.setAttribute("class", `book id${book.id}`)

    const theTitle = document.createElement("p")
    theTitle.textContent = book.title
    theCard.append(theTitle)

    const theAuthor = document.createElement("p")
    theAuthor.textContent = book.author
    theCard.appendChild(theAuthor)

    const theNumPages = document.createElement("p")
    theNumPages.textContent = `${book.numPages} pages`
    theCard.appendChild(theNumPages)

    const theHasRead = document.createElement("p")
    theHasRead.textContent = `${book.hasRead ? "Read" : "Not read yet"}`
    theCard.appendChild(theHasRead)

    containerDiv.appendChild(theCard)
}