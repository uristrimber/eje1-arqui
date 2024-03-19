"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("dotenv/config");
var app = (0, express_1.default)();
var port = process.env.PORT;
/// hardcoded list of books
var books = [
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
app.get("/books/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var book = books.find(function (book) { return book.id === id; });
    res.send(book);
});
app.get("/books", function (req, res) {
    res.send(books);
});
app.post("/books", function (req, res) {
    var _a = req.body, title = _a.title, author = _a.author, year = _a.year;
    var id = books.length + 1;
    var newBook = {
        id: id,
        title: title,
        author: author,
        year: year,
    };
    books.push(newBook);
    res.send(newBook);
});
//update book
app.put("/books/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var _a = req.body, title = _a.title, author = _a.author, year = _a.year;
    var book = books.find(function (book) { return book.id === id; });
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
app.delete("/books/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var book = books.find(function (book) { return book.id === id; });
    if (!book) {
        res.status(404).send("Book not found");
        return;
    }
    books.splice(books.indexOf(book), 1);
    res.send(book);
});
