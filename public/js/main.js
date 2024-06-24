const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoItem2 = document.querySelectorAll('input[type=checkbox].not')
const todoComplete = document.querySelectorAll('span.completed')
const todoComplete2 = document.querySelectorAll('input[type=checkbox].completed')
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

Array.from(todoItem2).forEach((el)=>{
    el.addEventListener('change', markComplete)
})

Array.from(todoComplete2).forEach((el)=>{
    el.addEventListener('change', markIncomplete)
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
    const completedCount = document.querySelectorAll('.todoItem span.completed').length;
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

document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll("input.completed");
    checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
    });
});
