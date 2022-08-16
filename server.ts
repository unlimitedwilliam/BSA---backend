require('dotenv').config();
import express from 'express';
import cors from 'cors';
import flash from 'express-flash';
import session from 'express-session'; 
import passport from 'passport';

const port = process.env.NODE_PORT;
const app = express();

app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000'
}));
app.use(flash()); 
app.use(passport.initialize()); 
app.use(session());

const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors')

app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
  
app.listen(port, () => console.log(`Server running on PORT ${port}`));