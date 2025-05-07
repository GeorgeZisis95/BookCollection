const myLibrary = []

defaultBook1 = createBook("The Hobbit", "J.R.R Tolkien", 295, false, 1)
defaultBook2 = createBook("The Hunger Games", "Suzanne Collins", 374, true, 2)
defaultBook3 = createBook("Divergent", "Veronica Roth", 487, true, 3)
defaultBook4 = createBook("The Maze Runner", "James Dashner", 384, false, 4)

myLibrary.push(defaultBook1)
myLibrary.push(defaultBook2)
myLibrary.push(defaultBook3)
myLibrary.push(defaultBook4)

containerDiv = document.querySelector(".container")

for (const book of myLibrary) {
    createBookCard(book)
}

for (i = 0; i < localStorage.length; i++) {
    let newBook = JSON.parse(localStorage.getItem(`book${i + 5}`))
    if (newBook === null) {
        continue
    }
    console.log(i + 5)
    console.log(localStorage.length)
    myLibrary.push(newBook)
    createBookCard(myLibrary[myLibrary.length - 1])
}

document.querySelector("form").addEventListener("submit", addBookToLocalStorage)

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

function createBook(title, author, numPages, hasRead, id) {
    return new Book(title, author, numPages, hasRead, id)
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

function getFormValues(event) {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const pages = event.target.pages.value
    const read = true
    const id = myLibrary.length + 1
    return [title, author, pages, read, id]
}

function addBookToLocalStorage(event) {
    [title, author, pages, read, id] = getFormValues(event)
    let newBook = createBook(title, author, pages, read, id)
    localStorage.setItem(`book${id}`, JSON.stringify(newBook))
    retrieveBookFromLocalStorage(id)
}

function retrieveBookFromLocalStorage(id) {
    // for (i = 0; i < localStorage.length; i++) {
    //     let newBook = JSON.parse(localStorage.getItem(`book${i + 5}`))
    //     myLibrary.push(newBook)
    //     createBookCard(myLibrary[myLibrary.length - 1])
    // }

    let newBook = JSON.parse(localStorage.getItem(`book${id}`))
    myLibrary.push(newBook)
    createBookCard(myLibrary[myLibrary.length - 1])
}