const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos')

router.get('/', todosController.getTodos)

router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

router.post('/logCompletion', todosController.logCompletion)

router.delete('/deleteCompletion', todosController.deleteCompletion);


module.exports = router