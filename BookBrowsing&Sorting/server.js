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

//route to Home

app.get('/home', async (req, res) => {
  try {
    const query = `
      SELECT author_name, price, subject, publication_year, title
      FROM books
      ORDER BY RAND()
      LIMIT 5;
    `;
    const [rows] = await pool.query(query);

    if (rows.length === 0) {
      res.status(404).json({ error: 'No books found' });
    } else {
      res.json(rows);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//sort Alphabetically

app.get('/sortABC', async (req, res) => {
  try {
    const query = 'SELECT * FROM books ORDER BY title ASC';
    const [rows] = await pool.query(query);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//sort by subject

app.get('/sortSubject/:subject', async (req, res) => {
  const { subject } = req.params;

  try {
    const query = 'SELECT * FROM books WHERE subject = ? ORDER BY publication_year DESC';
    const [rows] = await pool.query(query, [subject]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//sort by author

app.get('/books/searchByAuthor/:authorName', async (req, res) => {
  const { authorName } = req.params;

  try {
    const query = `
      SELECT *
      FROM books
      WHERE author_name LIKE ?;
    `;
    const [rows] = await pool.query(query, [`%${authorName}%`]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'No books found for the provided author' });
    } else {
      res.json(rows);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});





//sort by year

app.get('/sortYear', async (req, res) => { 
  try {
    const query = 'SELECT * FROM books ORDER BY publication_year DESC';
    const [rows] = await pool.query(query);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
