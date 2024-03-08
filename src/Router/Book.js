const express = require('express');
const router = express.Router();
const bookModel = require('../Model/BookModel');
require('../DB/database');

router.get('/', async (req, res) => {
    const books = await bookModel.find();
    res.json(books);
});

router.get('/search', async (req, res) => {
    const book = await bookModel.find({keyword: req.query.keyword});
    res.json(book);
});

router.post('/', (req, res) => {
    const data = {
        title: req.body.title,
        poster_path: req.body.poster_path,
        story: req.body.story,
        keyword: req.body.keyword,
    }

    try {
        const book = new bookModel(data);
        book.save();
        res.json(book);
    }catch(e){
        console.log(e)
    }
    res.status(201).end();
});

router.put('/:id', (req, res) => {
    const bookId = Number(req.params.id);
    const { title, poster_path, story } = req.body;

    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });

    books[bookIndex] = { id: bookId, title, poster_path, story };
    res.json(books[bookIndex]);
});

router.patch('/:id', async (req, res) => {
    const newKeyword = req.body.keyword
    const data = {
        title: req.body.title,
        poster_path: req.body.poster_path,
        story: req.body.story,
        $addToSet: {
            keyword: newKeyword,
        }
    }
    await bookModel.findByIdAndUpdate({_id: req.params.id}, data)
    const bookUpdate = await bookModel.findById(req.params.id);
    res.json(bookUpdate);
})

router.delete('/:id', async (req, res) => {
    const deleteBook = await bookModel.findByIdAndDelete(req.params.id);
    res.json(deleteBook);
    res.status(204).end();
});

module.exports = router;
