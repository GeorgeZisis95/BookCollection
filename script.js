class Book {
    constructor(title, author, pages, read, bookID) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        this.bookID = bookID
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "Read" : "Not Read Yet"} ${this.bookID}`
    }
}

const library = []

function addBookToLibrary(title, author, pages, read) {
    const bookID = crypto.randomUUID()
    const book = new Book(title, author, pages, read, bookID)
    library.push(book)
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "270", true)
addBookToLibrary("Hunger Games", "Suzan Collins", "532", false)
addBookToLibrary("Divergent", "Veronica Roth", "431", true)
addBookToLibrary("The Maze Runner", "James Dashner", "315", false)

function displayBook(book) {
    const container = document.getElementById("container")

    const bookCard = document.createElement("div")
    bookCard.classList.add("book-card")

    const title = document.createElement("h3")
    title.textContent = book.title

    const author = document.createElement("p")
    author.textContent = `Author:${book.author}`

    const pages = document.createElement("p")
    pages.textContent = `Pages: ${book.pages}`

    const status = document.createElement("p")
    status.textContent = `Status: ${book.read ? "Read" : "Not Read Yet"}`

    bookCard.append(title, author, pages, status)

    container.appendChild(bookCard)
}

for (let i = 0; i < library.length; i++) {
    displayBook(library[i])
    console.log(library[i].info())
}

