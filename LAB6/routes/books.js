// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 6 - routes/books.js
const express = require('express');
const router = express.Router();
const bookData = require('../data/books')

// GET /books - responds with array of books in {id, title} format
router.get('/', async (req, res) => {
  try {
    const allBooks = await bookData.getAllBooks();
    let allBooksList = [];
    for (i = 0; i < allBooks.length; i++) {
      allBooksList.push({ _id: allBooks[i]._id, title: allBooks[i].title });
    }
    res.json(allBooksList);
  } catch (e) {
    res.status(500).json({ error: 'books not found' });
  }
});

// POST /books - creates a book with the supplied data in the request body and returns the new book
router.post('/', async (req, res) => {
  const info = req.body;
  if (!info.title || !info.author || !info.genre || !info.datePublished || !info.summary) {
    res.status(400).json({ error: 'the request body is not valid' });
    return;
  }
  try {
    // try to create the book
    const book = await bookData.create({ ...info, reviews: [] })
    res.status(200).json(book);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// GET /books/{id} - responds with the full content of the specified book, return all details of the book
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: 'no valid id is given' });
  }
  try {
    const book = await bookData.getBookById(id);
    res.status(200).json(book);
  } catch (e) {
    res.status(404).json({ error: 'book by id not found' });
  }
});

// PUT /books/{id} - update a book with information provided, 
// updates the specified book by replacing the book with the new book content, 
// and returns the updated book
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  if (!id) {
    res.status(400).json({ error: 'no valid id is given' });
    return;
  }
  if (!info.title || !info.author || !info.genre || !info.datePublished || !info.summary) {
    res.status(400).json({ error: 'the request body is not valid' });
    return;
  }
  // try to find book
  try {
    await bookData.getBookById(id);
  } catch (e) {
    res.status(404).json({ error: 'book by id not found' });
    return;
  }
  // try to update book
  try {
    const updatedBook = await bookData.update(id, info);
    res.status(200).json(updatedBook);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// PATCH /books/{id} - update a book with information provided from the PATCH body,
// updates the specified book with only the supplied changes, returns the updated book
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  // check at least one object key given
  if (!info.title && !info.author && !info.genre && !info.datePublished && !info.summary) {
    res.status(400).json({ error: 'the request body is not valid' });
    return;
  }
  // try to get book by id
  try {
    await bookData.getBookById(id);
  } catch (e) {
    res.status(404).json({ error: 'book by id not found' });
    return;
  }
  // try to update book
  if (Object.keys(info).length !== 0) {
    try {
      const updatedBook = await bookData.update(
        id,
        info
      );
      res.status(200).json(updatedBook);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.status(400).json({
      error:
        'No fields have been changed from their inital values, so no update has occurred'
    });
  }
});

// DELETE /books/{id} - deletes the book, returns book id and title in {bookId: id, deleted: true} format
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: 'no valid id is given' });
    return;
  }
  try {
    await bookData.getBookById(id);
  } catch (e) {
    res.status(404).json({ error: 'book by id not found' });
    return;
  }
  try {
    const deletedBook = await bookData.delete(id);
    res.status(200).json(deletedBook);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;