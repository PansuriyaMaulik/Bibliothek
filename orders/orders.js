const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const axios = require('axios')
require('./Order')
require('dotenv').config()

//load express
const app = express()
Port = 3008

//connect to db
mongoose.connect(process.env.MONGO_URI, () => {
    console.log("successfully connected to database -- order")
})

//Configure model
const Order = mongoose.model('Order');

//config body parser
app.use(bodyParser.json())

//Route
app.get('/', (req, res) => {
    try {
        res.send("This is a order service main route")
    } catch (error) {
        res.send(error.message)
    }
})

//Create a new order
app.post('/order', (req, res) => {
    const newOrder = {
        CustomerId: req.body.CustomerId,
        BookId: req.body.BookId,
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate,
    }

    const order = new Order(newOrder);
    order.save().then(() => {
        res.send("Order created successfully");
    }).catch((error) => {
        res.send("Error creating Order");
    });
})

//get all orders from the collection
app.get('/order', (req, res) => {
    try {
        Order.find().then((orders) => {
            res.json(orders);
        })
    } catch (error) {
        res.send("Not able to fetch all orders");
    }
})

//get one order from the collection and return the book and customer name
app.get('/order/:id', (req, res) => {
    try {
        Order.findById(req.params.id).then((order) => {
            if(order) {
                axios.get("http://localhost:3001/customer/" + order.CustomerId).then((response) => {
                    var orderObject = {
                        customerName: response.data.name,
                        bookTitle: ''
                    }

                    axios.get("http://localhost:3000/book/" + order.BookId).then((response) => {
                       orderObject.bookTitle = response.data.title
                       res.json(orderObject)
                    })
                })
            } else {
                res.send("Invalid order");
            }
        })
    } catch (error) {
        res.send("Not able to fetch one order");
    }
})

//delete one order from the collection
app.delete('/order/:id', (req, res) => {
    try {
        Order.findByIdAndDelete(req.params.id).then((orders) => {
            res.send("Successfully deleted order");
        })
    } catch (error) {
        res.send("Not able to fetch all orders");
    }
})

app.listen(Port, () => {
    console.log(`Server listening on ${Port}`)
});