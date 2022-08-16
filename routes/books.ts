import express from 'express'; 
import db from '../common/connection-db';
import { BookServices } from '../services/book-service';

const router = express.Router(); 
const model = db.initModels; 
const books = model.books; 
const bookServices = new BookServices();

//Get all books
router.get('/', async (req, res) => {
    try {
        const bookList = await books.findAll();
        res.json(bookList);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
})
//Get an book by id 
router.get('/:id', async (req, res) => {
    try {
        const book = await bookServices.getBookById(req.params.id);
        res.json(book);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
})
//Create new book
router.post('/', async (req, res) => {
    const book = books.create({
        id: req.body.id,
        name: req.body.name, 
        summary: req.body.summary,
        price: req.body.price,
        sold: req.body.sold,
        ava_link: req.body.ava_link,
        author_name: req.body.author_name
    })
    try {
        res.json(book);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
})
//Change book info
router.patch('/:id', async (req, res) => {
    try {
        const newInfo = await bookServices.changeBookInfo(req.body, req.params.id);
        res.json(newInfo);
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
})
//Delete book
router.delete('/:id', async (req, res) => {
    try {
        await bookServices.deleteBook(req.params.id);
        res.json({message: 'deleted'});
    } catch (error:any) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;