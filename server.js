import express from 'express';
import { getBooks, getBook, addBook } from './database.js';
import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

// Create Express application
const app = express();

// Parse JSON requests
app.use(express.json());

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();

// Route to get all books
app.get('/books', async (req, res) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a specific book by ID
app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await getBook(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to create a new book
app.post('/books', async (req, res) => {
  const { title, publicationYear, authorId } = req.body;
  try {
    const insertedBookId = await addBook(title, publicationYear, authorId);
    res.json({ id: insertedBookId, message: 'Book added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const port = process.env.PORT || 3306;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
