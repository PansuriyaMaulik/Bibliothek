const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()
require ('./Customer')

//load express
Port = 3001
const app = express();

//configure bodyParser
app.use(bodyParser.json());

//connect to mongodb
mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Succeeded to connect to mongod")
})

//load customer model
const Customer = mongoose.model("Customer");

//Routes
app.get("/", (req, res) => {
    res.send("this is our main customes routes")
});

//Create a new customer
app.post('/customer', (req, res) => {
    try {
        var newCustomer = {
            name: req.body.name,
            age: req.body.age,
            address: req.body.address
        }

        //store new customer value in variable and save it in database
        var customer = new Customer(newCustomer);
        customer.save();

        res.send("Successfully created new customer")
    } catch (error) {
        res.send("Not able to create new customer")
    }
})

//get all customers from the collection
app.get('/customer', (req, res) => {
    try {
        Customer.find().then((customer) => {
            res.json(customer)
        })
    } catch (error) {
        res.send("Not able to find all customers");
    }
})

//get only one customers from the collection
app.get('/customer/:id', (req, res) => {
    try {
        Customer.findById(req.params.id).then((customer) => {
            res.json(customer)
        })
    } catch (error) {
        res.send("Not able to find all customers");
    }
})

//delete only one customers from the collection
app.delete('/customer/:id', (req, res) => {
    try {
        Customer.findByIdAndDelete(req.params.id).then((customer) => {
            res.send("Dleted customer successfully")
        })
    } catch (error) {
        res.send("Not able to delete customers");
    }
})

app.listen(Port, () => {
    console.log(`Server is up and running on port ${Port} and this customer service`)
});