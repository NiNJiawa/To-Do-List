const newTaskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterAllBtn = document.getElementById('filter-all');
const filterCompletedBtn = document.getElementById('filter-completed');
const filterIncompleteBtn = document.getElementById('filter-incomplete');

let tasks = [];

// Add task
addTaskBtn.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        const task = { text: taskText, completed: false };
        tasks.push(task);
        newTaskInput.value = '';
        renderTasks();
    }
});

// Render tasks
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        li.appendChild(taskText);

        const buttons = document.createElement('div');
        buttons.classList.add('task-buttons');

        // Mark complete button
        const toggleCompleteBtn = document.createElement('button');
        toggleCompleteBtn.textContent = task.completed ? 'Undo' : 'Complete';
        toggleCompleteBtn.addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks(filter);
        });
        buttons.appendChild(toggleCompleteBtn);

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            const newText = prompt('Edit your task:', task.text);
            if (newText) {
                task.text = newText.trim();
                renderTasks(filter);
            }
        });
        buttons.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks(filter);
        });
        buttons.appendChild(deleteBtn);

        li.appendChild(buttons);
        taskList.appendChild(li);
    });
}

// Filter tasks
filterAllBtn.addEventListener('click', () => renderTasks('all'));
filterCompletedBtn.addEventListener('click', () => renderTasks('completed'));
filterIncompleteBtn.addEventListener('click', () => renderTasks('incomplete'));
