const Todo = require('../models/todoModel');
const mongoose = require('mongoose');

const getTodos = async (req, res) => {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.status(200).json(todos);
}

const getTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such todo' });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
        return res.status(404).json({ error: 'no such todo' });
    }

    res.status(200).json(todo);
}

const createTodo = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Please fill your todo' });
    }
    try {
        const todo = await Todo.create({ title });
        res.status(200).json(todo);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such todo' });
    }

    const todo = await Todo.findOneAndDelete({ _id: id });
    if (!todo) {
        return res.status(404).json({ error: 'no such todo' });
    }
    res.status(200).json(todo);
}

module.exports = {
    createTodo,
    deleteTodo,
    getTodo,
    getTodos
}
