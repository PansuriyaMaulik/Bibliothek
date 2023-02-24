const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
require("./Book")

const app = express();
port = 3000;

//configure body parser
app.use(bodyParser.json());

//load book model 
const Book = mongoose.model("Book");

//connect to mongoose
mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Connected to mongoDB database")
});

//Routes
app.get('/', (req, res) => {
    res.send("This is our main endpoint!");
})

//Create book routes
app.post('/book', (req, res) => {
    //This our create book functions
    try {
        var newBook = {
            title: req.body.title,
            author: req.body.author,
            numberOfPages: req.body.numberOfPages,
            publisher: req.body.publisher
        }

        //create a new book
        var book = new Book(newBook);
        book.save();

        res.send("New book created!");
    } catch (err) {
        res.send("Not able to store book data into database")
    }
});

//get all book from the Book Collections
app.get('/book', (req, res) => {
    Book.find().then((book) => {
        res.json(book);
    }).catch((err) => {
        res.send("Not able to fetch all books from database")
    });
});

//get one book from the Book Collection
app.get('/book/:id', (req, res) => {
    try {
        Book.findById(req.params.id).then((book) => {
            res.json(book);
        })
    } catch (error) {
        res.send("Not able to fetch single book from database")
    }
})

//delete one book from the Book Collection
app.delete('/book/:id', (req, res) => {
    try {
        Book.findByIdAndDelete(req.params.id).then((book) => {
            res.send("Book deleted successfully");
        })
    } catch (error) {
        res.send("Not able to delete single book from database")
    }
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port} and this is our book service`);
});