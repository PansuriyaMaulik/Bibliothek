//Load express
const express = require('express');
const app = express();

//load mongoose
const mongoose = require('mongoose');

//connect to mongoose
mongoose.connect("mongodb+srv://maulikpansuriya36:L5nO8eFUi87tsdJE@netflixclone.mv9akzj.mongodb.net/booksservice?retryWrites=true&w=majority", () => {
    console.log("Connected to mongoDB database")
});

//Routes
app.get('/', (req,res) => {
    res.send("This is our main endpoint!");
})

port = 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port} and this is our book service`);
});