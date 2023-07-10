import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

//create pool

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise();


//functions to get book(s)

export async function getBooks() {
  const [rows] = await pool.query("SELECT * FROM books");
  return rows;
}

export async function getBook(id) {
  const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
  return rows[0];
}

// Function to add a book(s)
export async function addBook(title, publicationYear, authorId) {
  try {
    const result = await pool.query(
      'INSERT INTO books (title, publication_year, author_id) VALUES (?, ?, ?)',
      [title, publicationYear, authorId]
    );
    const insertedBookId = result.insertId;
    return insertedBookId;
  } catch (error) {
    throw error;
  }
}