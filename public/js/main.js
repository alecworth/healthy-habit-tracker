const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const logCompletionButton = document.getElementById('logCompletionButton');

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

logCompletionButton.addEventListener('click', logCompletion);

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function logCompletion() {
    const completedCount = document.querySelectorAll('.todoItem .completed').length;
    try {
        const response = await fetch('/todos/logCompletion', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({ completedCount })
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}

document.querySelectorAll('.deleteCompletionButton').forEach(button => {
    button.addEventListener('click', async () => {
        const completionId = button.dataset.completionId;
        try {
            const response = await fetch('/todos/deleteCompletion', {
                method: 'delete',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({ completionId })
            });
            const data = await response.json();
            console.log(data);
            // Update the UI to remove the deleted completion entry
            button.parentNode.remove();
        } catch (err) {
            console.log(err);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.checkbox-wrapper-19 input[type=checkbox]').forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const todoItem = checkbox.closest('.todoItem');
            const todoId = todoItem.getAttribute('data-id');
            const completed = checkbox.checked;

            fetch(`/todos/update/${todoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const span = todoItem.querySelector('span:not(.del)');
                    span.classList.toggle('completed', completed);
                    span.classList.toggle('not', !completed);
                }
            });
        });
    });
});