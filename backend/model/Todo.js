const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    author:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true
    },
    todoBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});
const Todo = mongoose.model('todo', todoSchema);
module.exports = Todo;
