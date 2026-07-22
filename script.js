// initialize vars for library storage and linking to page
const books = [];
const library = document.getElementById("library");

// Book object constructor
function Book(title, author, numPages, haveRead) {
    // catch function calls without using 'new'
    if (!new.target) {
        throw Error("You must use 'new' operator to call constructor");
    }
    // set book attributes
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead; // boolean value
    this.id = crypto.randomUUID(); // unique identifier
    this.info = `${this.title} by ${this.author}, ${this.numPages} pages, ${this.haveRead}`;
}

function createBook(title, author, numPages, haveRead){
    // new book object with input params
    const newBook = new Book(title, author, numPages, haveRead);
    // add new book to my books array
    books.push(newBook);

    // helper function to update document
    addToLibrary(newBook);
}

function addToLibrary(book){
    // create new div element
    const bookDiv = createDiv(book);
    // append div to library container
    library.appendChild(bookDiv);
}

// create book div to be appended to our library section of page
// each attribute is a div, inside a container with 'book' class
function createDiv(book){
    // create initial div for book container
    const newDiv = document.createElement("div");
    // add book class for styling
    newDiv.classList.add("book");

    // set string to display if book has been read
    // book.haveRead is boolean value
    let haveIRead = book.haveRead ? "Finished" : "Not read yet";

    // set container innerHTML with divs and book info
    newDiv.innerHTML = `<div class="book-title">${book.title}</div>
                        <div>${book.author}</div>
                        <div>${book.numPages} pages</div>
                        <div>${haveIRead}</div>`;
    return newDiv;
}

// starter books until storage is persistent
const whereRedFernGrows = new Book("Where the Red Fern Grows", "Wilson Rawls", 212, true);
const ofMiceAndMen = new Book("Of Mice and Men", "John Steinbeck", 107, true);
const greatGatsby = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
books.push(whereRedFernGrows);
books.push(greatGatsby);
books.push(ofMiceAndMen);

// loop through stored books and add to document
function updateWindow(){
    for(const book of books){
        addToLibrary(book);
    }
}

updateWindow();