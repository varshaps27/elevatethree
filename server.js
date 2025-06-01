const express = require('express');
const app = express();
const PORT = 2718;

app.use(express.json());

let books = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.send('📚 Welcome to the Book API!');
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).send({ message: 'Title and author are required' });
  }

  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).send(newBook);
});

app.get('/books', (req, res) => {
  res.status(200).send(books);
});
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).send({ message: 'Book not found' });
  }

  res.status(200).send(book);
});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).send({ message: 'Book not found' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.status(200).send(book);
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).send({ message: 'Book not found' });
  }

  books.splice(index, 1);
  res.status(200).send({ message: 'Book deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
