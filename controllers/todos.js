const Todo = require('../models/Todo')
const HabitCompletion = require('../models/HabitCompletion');
const User = require('../models/User')

module.exports = {
    getTodos: async (req,res)=>{
        try{
            const todoItems = await Todo.find({user: req.user.id})
            const itemsLeft = await Todo.countDocuments({completed: true, user: req.user.id})
            const habitCompletions = await HabitCompletion.find({user: req.user.id}).sort({ date: -1 })
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, habitCompletions: habitCompletions})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, user: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    logCompletion: async (req, res) => {
        try {
            const { completedCount } = req.body;
            await HabitCompletion.create({ user: req.user.id, completedCount });
            console.log('Habit completion logged!');
            
            // Fetch updated todo list and completion data
            const todoItems = await Todo.find({user: req.user.id});
            const itemsLeft = await Todo.countDocuments({ completed: true, user: req.user.id });
            const habitCompletions = await HabitCompletion.find({user: req.user.id}).sort({ date: -1 });
            
            // Send back the updated completion count and data
            res.json({ completedCount, todos: todoItems, left: itemsLeft, habitCompletions: habitCompletions, user: req.user.id });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error logging completion');
        }
    },
    deleteCompletion: async (req, res) => {
        try {
            const { completionId } = req.body;
            await HabitCompletion.findByIdAndDelete(completionId);
            console.log('Deleted Completion');
            res.json({ message: 'Deleted Completion' });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error deleting completion');
        }
    }
}    