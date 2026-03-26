// todo-script.js

// Function to get tasks from local storage
function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Function to save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks to the DOM
function renderTasks() {
    const tasks = getTasks();
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <input type='checkbox' ${task.completed ? 'checked' : ''} onclick='toggleTask(${index})'>
            <span class='task-content ${task.completed ? 'completed' : ''}'>${task.content}</span>
            <button onclick='deleteTask(${index})'>Delete</button>
        `;
        tasksContainer.appendChild(taskElement);
    });
}

// Function to add a task
function addTask(content) {
    const tasks = getTasks();
    tasks.push({ content, completed: false });
    saveTasks(tasks);
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

// Function to toggle task completion
function toggleTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

// Function to clear completed tasks
function clearCompletedTasks() {
    let tasks = getTasks();
    tasks = tasks.filter(task => !task.completed);
    saveTasks(tasks);
    renderTasks();
}

// Function to filter tasks
function filterTasks(status) {
    const tasks = getTasks();
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        if (status === 'all' || (status === 'completed' && task.completed) || (status === 'active' && !task.completed)) {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.innerHTML = `
                <input type='checkbox' ${task.completed ? 'checked' : ''} onclick='toggleTask(${index})'>
                <span class='task-content ${task.completed ? 'completed' : ''}'>${task.content}</span>
                <button onclick='deleteTask(${index})'>Delete</button>
            `;
            tasksContainer.appendChild(taskElement);
        }
    });
}

// Function to update statistics
function updateStatistics() {
    const tasks = getTasks();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    document.getElementById('total-tasks').innerText = `Total Tasks: ${totalTasks}`;
    document.getElementById('completed-tasks').innerText = `Completed Tasks: ${completedTasks}`;
}

// Event listeners for interactive elements
document.getElementById('add-task').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    if (taskInput.value) {
        addTask(taskInput.value);
        taskInput.value = '';
        updateStatistics();
    }
});

document.getElementById('clear-completed').addEventListener('click', clearCompletedTasks);

document.getElementById('filter').addEventListener('change', (event) => {
    filterTasks(event.target.value);
});

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    updateStatistics();
});

// Bonus functionality: add task on pressing enter
document.getElementById('task-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const taskInput = document.getElementById('task-input');
        if (taskInput.value) {
            addTask(taskInput.value);
            taskInput.value = '';
            updateStatistics();
        }
    }
});