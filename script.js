// initialize variables for book storage and document elements
let books = [];
const library = document.getElementById("library");
const dropDownBtn = document.getElementById("dropDownBtn");
const dropDownForm = document.getElementById("dropdown-form");
const toggle = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" /></svg>`;

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

Book.prototype.toggleRead = function(){
    this.haveRead = !this.haveRead;
};

// create Book object from input form with given params
// add to books array for storage
function createBook(title, author, numPages, haveRead){
    // new book object with input params
    const newBook = new Book(title, author, numPages, haveRead);
    // add new book to my books array
    books.push(newBook);
    // helper function to update document
    addToLibrary(newBook);
}

function toggleBook(bookId){
    for(let book of books){
        if(book.id == bookId){
            book.haveRead = !book.haveRead;
        }
    }
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
    // add book id to element dataset
    newDiv.dataset.id = book.id;
    // set string to display if book has been read
    // book.haveRead is boolean value
    let haveIRead = book.haveRead ? "Finished" : "Not read yet";

    // set container innerHTML with divs and book info
    newDiv.innerHTML = `<div><button class="deleteBtn"
                                     title="Delete this book">X</button></div>
                        <div class="book-title">${book.title}</div>
                        <div>${book.author}</div>
                        <div>${book.numPages} pages</div>
                        <div class="haveRead-label">
                        <button class="toggleBtn">${toggle}</button> ${haveIRead}</div>`;
    return newDiv;
}

// starter books until storage is persistent
const whereRedFernGrows = new Book("Where the Red Fern Grows", "Wilson Rawls", 212, true);
const ofMiceAndMen = new Book("Of Mice and Men", "John Steinbeck", 107, true);
const greatGatsby = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
books.push(whereRedFernGrows);
books.push(greatGatsby);
books.push(ofMiceAndMen);

// loop through stored books and display on document
function updateDisplay(){
    // clear books from display
    library.innerHTML = "";
    // add updated list to library
    for(const book of books){
        addToLibrary(book);
    }
    attachBookListeners();
}

updateDisplay();

// set click listener on dropdown button to display form
dropDownBtn.addEventListener("click", function(e){
    dropDownForm.classList.toggle("show");
});

// handle book submit form, pull values and create book
dropDownForm.addEventListener("submit", function(e){
    // prevent page reload with preventDefault
    e.preventDefault();
    // pass the form element into FormData constructor
    const formData = new FormData(event.target);
    // create object with form properties
    const formProps = Object.fromEntries(formData);
    // grab form values
    const newTitle = (formProps.title).charAt(0).toUpperCase() + (formProps.title).slice(1).toLowerCase();
    const newAuthor = formProps.author;
    // if pages is empty, return "unknown"
    const newPages = formProps.pages == "" ? "Unknown" : formProps.pages;
    // if checkbox property not defined, set haveRead to false
    const haveRead = Object.hasOwn(formProps, "haveRead");

    // create book
    createBook(newTitle, newAuthor, newPages, haveRead);
    // reset form to default values
    dropDownForm.reset();
    // hide form after book submission
    dropDownForm.classList.toggle("show");
});

// handle delete book click events
function attachDeleteBtnListeners(){
    const deleteBtns = document.querySelectorAll(".deleteBtn");
    deleteBtns.forEach(button => {
        button.addEventListener("click", function(e){
            // grab parent book element
            const btnParent = event.currentTarget.closest('.book');
            // grab book dataset id
            const bookId = btnParent.dataset.id;
            // remove book from books array storage
            books = books.filter(book => book.id != bookId);
            // remove element from page
            updateDisplay();
        });
    });
}

// handle toggle click events
function attachToggleListeners(){
    const toggleBtns = document.querySelectorAll(".toggleBtn");
    toggleBtns.forEach(button => {
        button.addEventListener("click", function(e){
            // grab toggle parent book element
            const toggleParent = e.currentTarget.closest('.book');
            const bookId = toggleParent.dataset.id;
            toggleBook(bookId);
            updateDisplay();
        });
    });
}

// attach listeners to book objects
function attachBookListeners(){
    attachDeleteBtnListeners();
    attachToggleListeners();
}