import axios from 'axios';
import express, { Request, Response } from 'express';

require('dotenv').config()
const PORT = process.env.PORT || 3000;

interface User {
  id: number;
  name: string;
}
interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

const app = express();
app.use(express.json());

const books: Book[] = [
  {
    id: 1,
    title: "The Accursed God",
    author: "Vivek Dutta Mishra",
    year: 2018,
  },
  {
    id: 2,
    title: "The Immortals of Meluha",
    author: "Amish Tripathi",
    year: 2010,
  },
];



app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/books/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);
  res.send(book);
});


app.get("/books", (req: Request, res: Response) => {
  res.send(books);
});

app.post("/books", (req: Request, res: Response) => {
  const {
    title,
    author,
    year,
  }: { title: string; author: string; year: number } = req.body;

  const id = books.length + 1;
  const newBook: Book = {
    id,
    title,
    author,
    year,
  };
  books.push(newBook);
  res.send(newBook);
});


app.put("/books/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const {
    title,
    author,
    year,
  }: { title: string; author: string; year: number } = req.body;

  const book = books.find((book) => book.id === id);
  if (!book) {
    res.status(404).send("Book not found");
    return;
  }
  if (title) {
    book.title = title;
  }
  if (author) {
    book.author = author;
  }
  if (year) {
    book.year = year;
  }
  res.send(book);
});


app.delete("/books/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) {
    res.status(404).send("Book not found");
    return;
  }
  books.splice(books.indexOf(book), 1);
  res.send(book);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// use axios to make a request to google books api
app.get("/search", async (req: Request, res: Response) => {
  const { q } = req.query;
  
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${q}`
  );
  res.send(response.data);
});