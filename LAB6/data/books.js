// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 6 - data/books.js
const mongoCollection = require('../config/mongoCollections');
const books = mongoCollection.books;
const { ObjectId } = require('mongodb');

const exportedMethods = {
    checkExists(input) {
        // check input exists - NEVER ENDED UP USING THIS :(
        if (!input) {
            throw "book object must have title, author, genre, datePublished, and summary"
        }
    },
    checkStrings(input) {
        // check input is typeof 'string'
        if (typeof input != 'string') {
            throw "book object has incorrect value types"
        }
        if (input.length == 0 || input.trim().length == 0) {
            throw "book object invalid - must have non-empty strings";
        }
    },
    checkArrays(input) {
        // check arrays of strings
        if (!Array.isArray(input) || input.length == 0) {
            throw "book object has incorrect value types";
        }
        for (i = 0; i < input.length; i++) {
            if (typeof input[i] != 'string' || input[i].trim().length == 0) {
                throw "book object invalid - must have an array of non-empty strings";
            }
        }
    },
    async create(book) {
        // error check for each book key
        if (!book) {
            throw "book object must be given"
        }
        if (!book.title || !book.author || !book.genre || !book.datePublished || !book.summary) {
            throw "book object must have title, author, genre, datePublished, and summary"
        }
        // check title is string
        if (typeof book.title != 'string') {
            throw "title must be a string"
        }
        // check author names given and 
        if (!book.author.authorFirstName || !book.author.authorLastName) {
            throw "author needs both first and last name"
        }
        if (typeof book.author.authorFirstName != 'string' || typeof book.author.authorLastName != 'string') {
            throw "author's first and last name must be non-empty strings"
        }
        // check genre
        if (!Array.isArray(book.genre) || book.genre.length == 0) {
            throw "genre should be an array of non-empty strings"
        }
        for (i = 0; i < book.genre.length; i++) {
            book.genre[i] = book.genre[i].trim();
            if (typeof book.genre[i] != 'string' || book.genre[i].length == 0) {
                throw "genre should be an array of non-empty strings"
            }
        }
        // check datePublished
        if (typeof book.datePublished != 'string') {
            throw "datePublished must be a string"
        }
        let parts = book.datePublished.split('/');
        if (parts.length != 3) throw 'datePublished should be MM/DD/YYYY format'
        if (parseInt(parts[0]) < 1 || parseInt(parts[0]) > 12 || parseInt(parts[1]) < 1 || parseInt(parts[1]) > 31 || parseInt(parts[2]) < 1 || parseInt(parts[2]) > 2026)
            throw 'datePublished has invalid MM/DD/YYYY numbers'
        // check summary
        if (typeof book.summary != 'string') {
            throw "summary must be a string"
        }
        // add new book into collection
        const booksCollection = await books();
        const insertInfo = await booksCollection.insertOne(book);
        if (insertInfo.insertedCount === 0) throw 'could not add book';

        const newBook = await this.getBookById(insertInfo.insertedId);
        return newBook;
    },
    async getAllBooks() {
        // return list of all books
        const booksCollection = await books();
        const bookList = await booksCollection.find({}).toArray();

        return bookList;
    },
    async getBookById(id) {
        // check id given
        if (!id) throw 'book id to search for must be provided';
        // look for id in collection
        const booksCollection = await books();
        const foundBook = await booksCollection.findOne({ _id: ObjectId(id) });
        if (foundBook === null) throw 'no book with that id';

        return foundBook;
    },
    async update(id, updated) {
        const booksCollection = await books();
        const oldBook = await this.getBookById(id);
        const updatedBook = {};
        // check if title and checkStrings
        if (updated.title) {
            this.checkStrings(updated.title);
            updatedBook.title = updated.title;
        }
        // check if author and checkStrings
        if (updated.author) {
            if (!(updated.author instanceof Object)) {
                throw "author is not an object type"
            }
            this.checkStrings(updated.author.authorFirstName);
            this.checkStrings(updated.author.authorLastName);
            updatedBook.author = updated.author;
        }
        // check if genre and checkArrays
        if (updated.genre) {
            this.checkArrays(updated.genre);
            let oldGenresList = oldBook.genre;
            let updatedgenres = oldGenresList;

            for (let i = 0; i < updated.genre.length; i++) { // only push non repeats into new list
                if (updatedgenres.includes(updated.genre[i]) === true) {
                    continue;
                }
                updatedgenres.push(updated.genre[i]);
            }
            updatedBook.genre = updatedgenres;
        }
        // check if datePublished and checkStrings
        if (updated.datePublished) {
            this.checkStrings(updated.datePublished);
            // check the months, days, and years
            let parts = updated.datePublished.split('/');
            if (parts.length != 3) throw 'datePublished should be MM/DD/YYYY format'
            if (parseInt(parts[0]) < 1 || parseInt(parts[0]) > 12 || parseInt(parts[1]) < 1 || parseInt(parts[1]) > 31 || parseInt(parts[2]) < 1 || parseInt(parts[2]) > 2026)
                throw 'datePublished has invalid MM/DD/YYYY numbers'
            updatedBook.datePublished = updated.datePublished;
        }
        // check if summary and checkStrings
        if (updated.summary) {
            this.checkStrings(updated.summary);
            updatedBook.summary = updated.summary;
        }
        await booksCollection.updateOne({ _id: ObjectId(id) }, { $set: updatedBook});

        return await this.getBookById(id);
    },
    async delete(id) {
        const booksCollection = await books();
        const deletionInfo = await booksCollection.removeOne({ _id: ObjectId(id) });
        if (deletionInfo.deletedCount === 0) {
            throw `could not delete book with id of ${id}`;
        }
        return { bookId: id, deleted: true };
    }
};

module.exports = exportedMethods;