containerDiv = document.querySelector(".container")

let myLibrary = []

defaultBook1 = createBook("The Hobbit", "J.R.R Tolkien", 295, false, 1)
defaultBook2 = createBook("The Hunger Games", "Suzanne Collins", 374, true, 2)
defaultBook3 = createBook("Divergent", "Veronica Roth", 487, true, 3)
defaultBook4 = createBook("The Maze Runner", "James Dashner", 384, false, 4)

myLibrary.push(defaultBook1)
myLibrary.push(defaultBook2)
myLibrary.push(defaultBook3)
myLibrary.push(defaultBook4)

// I save the books inside an array and save the array to LocalMemory
// This ensures the order of the books is based on when I insert them

for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
        if (key[0] === "b") {
            console.log(`${key}: ${localStorage.getItem(key)}`)
            myLibrary.push(JSON.parse(localStorage.getItem(key)))
        }
    }
}

localStorage.setItem("library", JSON.stringify(myLibrary))

myLibrary = JSON.parse(localStorage.getItem("library"))

for (const element of myLibrary) {
    console.log(element.title)
    createBookCard(element)
}

document.querySelector("form").addEventListener("submit", addBookFromForm)

const removeButtons = document.querySelectorAll(".remove-button")
removeButtons.forEach(button => {
    button.addEventListener("click", () => {
        localStorage.removeItem(`book${button.dataset.id}`)
    })
})

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

    const theID = document.createElement("p")
    theID.textContent = `ID: ${book.id}`
    theCard.appendChild(theID)

    const removeButton = document.createElement("button")
    removeButton.className = "remove-button"
    removeButton.dataset.id = book.id
    removeButton.textContent = "Remove Book"
    theCard.appendChild(removeButton)

    containerDiv.appendChild(theCard)
}

function getFormValues(event) {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const pages = event.target.pages.value
    const read = true
    const id = myLibrary[myLibrary.length - 1].id + 1
    return [title, author, pages, read, id]
}

function addBookFromForm(event) {
    [title, author, pages, read, id] = getFormValues(event)
    let newBook = createBook(title, author, pages, read, id)
    localStorage.setItem(`book${id}`, JSON.stringify(newBook))
    newBook = JSON.parse(localStorage.getItem(`book${id}`))
    myLibrary.push(newBook)
    createBookCard(myLibrary[myLibrary.length - 1])
}


// Now I need a remove function but I encounter two problems
// When I click on a book to remove it it only disappears after the page reloads
// When I add a book and try to remove it without reloading the page it does not get removed