// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 6 - data/reviews.js
const mongoCollection = require('../config/mongoCollections');
//const reviews = mongoCollection.reviews;
const { ObjectId, MongoNetworkError } = require('mongodb');
const bookData = require('./books');
const books = mongoCollection.books;

function checkReview(rev) {
    if (!rev.title || !rev.reviewer || !rev.rating || !rev.dateOfReview || !rev.review) {
        throw "review object must have rtitle, reviewer, rating, dateOfReview, and review";
    }
    if (typeof rev.title != 'string' || rev.title.trim().length == 0) {
        throw "title must be a non-empty string";
    }
    if (typeof rev.reviewer != 'string' || rev.reviewer.trim().length == 0) {
        throw "reviewer must be a non-empty string";
    }
    if (isNaN(rev.rating) || rev.rating < 1 || rev.rating > 5) {
        throw "rating must be a number in range from 1-5";
    }
    if (typeof rev.dateOfReview != 'string' || rev.dateOfReview.trim().length == 0) {
        throw "dateOfReview must be a non-empty string";
    }
    let parts = rev.dateOfReview.split('/');
        if (parts.length != 3) throw 'dateOfReview should be MM/DD/YYYY format'
        if (parseInt(parts[0]) < 1 || parseInt(parts[0]) > 12 || parseInt(parts[1]) < 1 || parseInt(parts[1]) > 31 || parseInt(parts[2]) < 1 || parseInt(parts[2]) > 2026) 
            throw 'dateOfReview has invalid MM/DD/YYYY numbers'
    if (typeof rev.review != 'string' || rev.review.trim().length == 0) {
        throw "review must be a non-empty string";
    }
}

const exportedMethods = {
    async create(id, review) {
        // error check for each book key
        if (!id) throw 'book id must be given';
        if (typeof id != 'string') throw 'book id must be a string'
        checkReview(review);

        // get book from collection
        const booksCollection = await books();
        const book = await bookData.getBookById(id);
        // create the new review id/info and update book
        const revId = ObjectId();
        const updatedReviews = [{ _id: revId, ...review }, ...book.reviews];
        await booksCollection.updateOne({ _id: ObjectId(id) }, { $set: { reviews: updatedReviews } });

        const updatedBook = await bookData.getBookById(id);
        return updatedBook;
    },
    async getAllReviews(id) {
        // return list of all reviews
        if (!id || typeof id != 'string') throw 'given id must be a non-empty string';
        const book = await bookData.getBookById(id);
        let reviewList = [];
        for (let i = 0; i < book.reviews.length; i++) {
            reviewList.push(book.reviews[i]);
        }
        return reviewList;
    },
    async getReviewById(id) {
        // check id given
        if (!id) throw 'review id to search for must be provided';
        // look for id in collection
        const booksCollection = await books();
        const bookList = await booksCollection.find({}).toArray();
        let foundReview = false;
        let review = {};
        for (let i = 0; i < bookList.length; i++) {
            const currentBook = bookList[i];
            for (let j = 0; j < currentBook.reviews.length; j++) {
                if (currentBook.reviews[j]._id.toString() == id) {
                    foundReview = true;
                    review = currentBook.reviews[j];
                }
            }
        }
        if (!foundReview) throw 'no review with that id';
        return review;
    },
    async delete(id) {
        const booksCollection = await books();
        const bookList = await booksCollection.find({}).toArray();
        let reviewFound = false;
        let bookId = "";
        let updatedList = [];
        let currentBook = {};
        for (let i = 0; i < bookList.length; i++) {
            currentBook = bookList[i];
            let oldReviewsList = currentBook.reviews;     
            for (let j = 0; j < oldReviewsList.length; j++) {
                if (oldReviewsList[j]._id.toString() == id) {
                    reviewFound = true;
                    bookId = oldReviewsList[j]._id;
                    for (let k = 0; k < oldReviewsList.length; k++) {
                        if (oldReviewsList[k]._id.toString() == id) {
                            continue;
                        }
                        updatedList.push(oldReviewsList[k]);
                    }
                }
                if (reviewFound) break;
            }
            currentBook.reviews = updatedList;
            if (reviewFound) break;
        }
        if (!reviewFound) {
            throw `could not delete review with id of ${id}`;
        }
        // update book collection
        //console.log(currentBook.reviews);
        //console.log(currentBook);
        const newReviews = {};
        newReviews.reviews = currentBook.reviews;
        //console.log(newReviews);
        await booksCollection.updateOne({_id: currentBook._id}, {$set: {reviews : currentBook.reviews}});
        newBook = await bookData.getBookById(currentBook._id.toString());
        //console.log(newBook);
        return { reviewId: id, deleted: true };
    }
};

module.exports = exportedMethods;