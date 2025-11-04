document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const rewardBtn = document.getElementById('rewardBtn');
    const rewardModal = document.getElementById('rewardModal');
    const closeModal = document.getElementsByClassName('close')[0];

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let completedTasks = 0;

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            if (task.completed) {
                li.classList.add('completed');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                toggleComplete(index);
            });

            const taskSpan = document.createElement('span');
            taskSpan.textContent = task.text;

            const dueDateSpan = document.createElement('span');
            dueDateSpan.className = 'due-date';
            dueDateSpan.textContent = task.dueDate ? `Due: ${task.dueDate}` : '';

            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => {
                editTask(index);
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                deleteTask(index);
            });

            li.appendChild(checkbox);
            li.appendChild(taskSpan);
            li.appendChild(dueDateSpan);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);

            taskList.appendChild(li);
        });
        updateCompletedTasksCount();
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        const dueDate = dateInput.value;
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false, dueDate: dueDate });
            saveTasks();
            renderTasks();
            taskInput.value = '';
            dateInput.value = '';
        }
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const editTask = (index) => {
        const newText = prompt('Edit your task:', tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks();
        }
        const newDate = prompt('Edit your due date:', tasks[index].dueDate);
        if (newDate !== null) {
            tasks[index].dueDate = newDate;
            saveTasks();
            renderTasks();
        }
    };

    const toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    const updateCompletedTasksCount = () => {
        completedTasks = tasks.filter(task => task.completed).length;
    };

    const showReward = () => {
        if (completedTasks >= 5) {
            rewardModal.style.display = 'block';
            completedTasks -= 5; // Reset for the next reward
        } else {
            alert('Complete 5 tasks to get a reward!');
        }
    };

    addTaskBtn.addEventListener('click', addTask);
    rewardBtn.addEventListener('click', showReward);
    closeModal.addEventListener('click', () => {
        rewardModal.style.display = 'none';
    });
    window.addEventListener('click', (event) => {
        if (event.target == rewardModal) {
            rewardModal.style.display = 'none';
        }
    });

    renderTasks();
});