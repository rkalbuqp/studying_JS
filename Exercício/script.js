document.getElementById('add-task').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const taskContent = document.createElement('span');
    taskContent.className = 'task-content';
    taskContent.textContent = taskText;
    taskItem.appendChild(taskContent);

    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => editTask(taskItem, taskContent));
    taskItem.appendChild(editButton);

    const completeButton = document.createElement('button');
    completeButton.className = 'complete-btn';
    completeButton.textContent = 'Concluir';
    completeButton.addEventListener('click', () => completeTask(taskItem));
    taskItem.appendChild(completeButton);

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-btn';
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', () => removeTask(taskItem));
    taskItem.appendChild(removeButton);

    document.getElementById('task-list').appendChild(taskItem);
    taskInput.value = '';
}

function editTask(taskItem, taskContent) {
    const newTaskText = prompt('Edite a tarefa:', taskContent.textContent);
    if (newTaskText !== null) {
        taskContent.textContent = newTaskText.trim();
    }
}

function completeTask(taskItem) {
    taskItem.classList.toggle('completed');
}

function removeTask(taskItem) {
    taskItem.remove();
}
