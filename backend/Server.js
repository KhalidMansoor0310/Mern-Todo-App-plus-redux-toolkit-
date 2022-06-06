const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const user = require('./routes/users');
const todo = require('./routes/todo');


app.use(express.json());
app.use(cors());
app.use('/api/users', require('./routes/users'));
app.use('/api/todo', require('./routes/todo'));

mongoose.connect('mongodb+srv://khalidmani:khalid000@cluster0.9mija.mongodb.net/todo_app?retryWrites=true&w=majority', ()=>{
    console.log('connected to mongodb');
});

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})