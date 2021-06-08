// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 6 - routes/reviews.js
const express = require('express');
const router = express.Router();
const bookData = require('../data/books');
const reviewData = require('../data/reviews');

// GET /reviews/{bookId} - return an array of all reviews in the system for the specified book id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(404).json({ error: 'no id is given' });
        return;
    }
    try {
        const allReviews = await reviewData.getAllReviews(id);
        //const booksReviews = await bookData.getBookById(id);
        if (allReviews.length == 0) {
            res.status(400).json({ error: `no reviews for book id ${id}` });
            return;
        }
        res.status(200).json(allReviews);
    } catch (e) {
        res.status(404).json({ error: 'book by id not found' });
        return;
    }
});

// POST /reviews/{bookId} - review sub-document with the supplied data in the request body, and returns the new review
router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const info = req.body;
    if (!id) {
        res.status(400).json({ error: 'no id is given' });
        return;
    }
    if (!info.title || !info.reviewer || !info.rating || !info.dateOfReview || !info.review) {
        res.status(400).json({ error: 'the request body is not valid' });
        return;
    }
    // try to get the book by id
    try {
        await bookData.getBookById(id);
    } catch {
        res.status(400).json({ error: 'book by id not found' })
    }
    // try to create the review in the given book id
    try {
        const review = await reviewData.create(id, info);
        res.status(200).json(review);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});
// DOES NOT WORK
// GET /reviews/review/{reviewId} - return review by given review id
router.get('/review/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ error: 'no valid id is given' });
        return;
    }
    try {
        const review = await reviewData.getReviewById(id);
        res.status(200).json(review);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

// DELETE /reviews/{reviewId) - deletes the review, returns {reviewId: id, deleted: true} format
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ error: 'no valid id is given' });
        return;
    }
    try {
        await reviewData.getReviewById(id);
    } catch (e) {
        res.status(404).json({ error: 'review by id not found' });
        return;
    }
    try {
        const deletedReview = await reviewData.delete(id);
        res.status(200).json(deletedReview);
    } catch (e) {
        res.status(404).json({ error: e });
    }
});

module.exports = router;