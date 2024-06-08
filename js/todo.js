const host = "http://127.0.0.1:8000";
const todosContainer = document.querySelector('.todos-container');


function getTodos() {
    axios.get(`${host}/todo`)
        .then(response => {
            console.log(response.data);
            renderTodos(response.data.todos);
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });
}  

function renderTodos(todos) {
    todosContainer.innerHTML = ''; // todosContainer 초기화
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');
        const timestamp = new Date(todo.timestamp).toLocaleString();
        todoDiv.innerHTML = `<strong>${todo.item1}</strong>: ${todo.item2} <br><small>${timestamp}</small>`;
        todosContainer.appendChild(todoDiv);

        // 삭제 버튼 생성 및 이벤트 처리
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'x';
        deleteBtn.addEventListener('click', function () {
            deleteTodo(todo.id);
        });
        // todoDiv에 삭제 버튼 추가
        todoDiv.appendChild(deleteBtn);
    });
}
window.addEventListener('DOMContentLoaded', function () {
    getTodos(); 
});

const todoInput = document.querySelector('.todo-input');
const contentInput = document.querySelector('.content-input');

todoInput.addEventListener('keypress', handleKeyPress);
contentInput.addEventListener('keypress', handleKeyPress);

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

function addTodo() {
    const title = todoInput.value.trim();
    const content = contentInput.value.trim();
    const timestamp = new Date().toISOString();

    let todoData = {
        id: 0, 
        item1: title,
        item2: content,
        timestamp: timestamp
    };

    if (title === '' || content === '') return;

    axios.post(`${host}/todo`, todoData)
        .then(response => {
            todoInput.value = '';
            contentInput.value = '';
            getTodos(); 
        })
        .catch(error =>{
            console.error('Error adding todo:', error);
        });
}

function deleteTodo(todoId) {
    axios.delete(`${host}/todo/${todoId}`)
        .then(function (response) {
            console.log('Todo deleted:', response.data);
            getTodos();
        })
        .catch(function (error) {
            console.error('Error deleting todo:', error);
        });
}