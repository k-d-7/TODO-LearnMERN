require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const todoRoute = require('../routes/todos.js');
const userRoute = require('../routes/user.js');

const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/todos', todoRoute);
app.use('/api/user', userRoute);


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database')
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    }) 