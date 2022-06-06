const express = require('express');
const todosRoute = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Todo = require('../model/Todo');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './frontend/public/images');
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.originalname);
//     },
   
// });
// const upload = multer({ storage: storage });

todosRoute.post('/createTodo',verifyToken, async (req, res) => {
    try {
        const newTodo = await Todo.create({
            todo:req.body.todo,
            todoBy: req.user,
            category: req.body.category,
            author: req.body.author,
        });
         res.json({message:newTodo});
        
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}
);
todosRoute.get('/getTodos',verifyToken, async (req, res) => {
    try {
        const todos = await Todo.find({todoBy:req.user});
        res.json({message:todos});

    } catch (error) {
        res.status(400).send(error);    
    }
}
);
todosRoute.delete('/deleteTodo/:id',verifyToken, async (req, res) => {
    try {
        const removedTodo = await Todo.findOneAndRemove({_id:req.params.id})
        res.status(200).json({message:removedTodo})
    }
    catch (error) {
        res.status(400).send(error);
    }
}
);

module.exports = todosRoute;