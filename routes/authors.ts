import express from 'express'; 
import db from '../common/connection-db';
import { DataResult } from '../core/data-result';
import { AuthorServices } from '../services/author-service';

const router = express.Router(); 
const model = db.initModels; 
const authors = model.authors; 
const authorServices = new AuthorServices();

//Get all authors
router.get('/', async (req, res) => {
    try {
        const authorList = await authors.findAll();
        res.json(authorList);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
})
//Get an author by id 
router.get('/:id', async (req, res) => {
    try {
        const author = await authorServices.getAuthorById(req.params.id);
        res.json(author);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
})
//Create new author
router.post('/', async (req, res) => {
    const author = authors.create({
        id: req.body.id,
        name: req.body.name, 
        summary: req.body.summary,
        sold: req.body.sold
    })
    try {
        res.json(author);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
})
//Change author info
router.patch('/:id', async (req, res) => {
    try {
        const newInfo = await authorServices.changeAuthorInfo(req.body, req.params.id);
        res.json(newInfo);
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
})
//Delete author
router.delete('/:id', async (req, res) => {
    try {
        await authorServices.deleteAuthor(req.params.id);
        res.status(200).json({message: 'author successfully removed'})
    } catch (error:any) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;