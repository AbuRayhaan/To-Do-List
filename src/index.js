import './style.css';

const toDoList = document.querySelector('#task-container');
const addTask = document.getElementById('addTask');
const addTaskInput = document.getElementById('addTaskInput');
let storedTasks = [];
let editTaskItem = null;

const getTask = () => {
  if (localStorage.getItem('tasks') === null) {
    storedTasks = [];
  } else {
    storedTasks = JSON.parse(localStorage.getItem('tasks'));
  }

  let display = '';
  storedTasks.forEach((task, index) => {
    const completed = task.completed ? 'line-through' : '';
    display += `<li class="task-item-container ${completed}" id=${task}>
    <div class = "task-item-container">
    <div class="task-item">
      <input type="checkbox" id="${task.index} ${task.completed ? 'checked' : ''}">
      <label type="text" id="">${task.description}</label>
    </div>
    <i class="fa-solid fa-ellipsis-vertical" id ="ellipse"></i>
    </div>
    </li>

    <div class = "task-item-container-2">
    <div class="task-item">
      <input type="checkbox" id="${task.index} ${task.completed ? 'checked' : ''}">
      <label type="text" id="editTask">${task.description}</label>
    </div>
    <i class="fa-solid fa-trash-can" id ="delete"></i>
    </div>
      </li>
      `;
  });

  toDoList.innerHTML = display;
};

const saveTask = ({ index, description, completed = false }) => {
  storedTasks = [];

  if (localStorage.getItem('tasks') === null) {
    storedTasks = [];
  } else {
    storedTasks = JSON.parse(localStorage.getItem('tasks'));
  }

  storedTasks.push({ index, description, completed });
  localStorage.setItem('tasks', JSON.stringify(storedTasks));
  getTask();
};

const saveEditTask = (task) => {
  const taskItem = storedTasks[task];
  taskItem.description = addTaskInput.value;
  localStorage.setItem('tasks', JSON.stringify(storedTasks));
};
/*
const completedTask = (task) => {
  const input = task.querySelector('input');
  const label = task.querySelector('label');
  const taskItem = storedTasks[task.id];

  if (input.checked) {
    taskItem.completed = true;
    label.style.textDecoration = 'line-through';
  } else {
    taskItem.completed = false;
    label.style.textDecoration = 'none';
  }

  localStorage.setItem('tasks', JSON.stringify(storedTasks));
  getTask();
};

const resetList = (storedList) => storedList.forEach((taskItem, index) => {
  taskItem.index = index;
});
/*
const deleteTask = (task) => {
  const delItem = storedTasks[task];
  storedTasks = storedTasks.filter((toDel) => toDel !== delItem);
  resetList(storedTasks);
  localStorage.setItem('tasks', JSON.stringify(storedTasks));
};

const editTask = (task) => {
  editTaskItem = task;
  const taskEdit = storedTasks[task];
  addTaskInput.value = taskEdit.description;
  addTaskInput.focus();
};
*/
addTask.addEventListener('click', (addItem) => {
  addItem.preventDefault();
  if (!addTaskInput.value) return;

  if (editTaskItem != null) {
    saveEditTask(editTaskItem);
    editTaskItem = null;
  } else {
    saveTask({ index: storedTasks.length, description: addTaskInput.value, completed: false });
  }

  getTask();
  addTaskInput.value = '';
});

document.addEventListener('keydown', (press) => {
  if (press.key === 'Enter' && addTaskInput.value) {
    addTask.click();
  }
});
/*
const updateList = (update) => {
  const selectItem = update.target;

  if (selectItem.classList.contains('checkbox')) {
    const item = selectItem.closest('li');
    completedTask(item);
  }

  if (selectItem.classList.contains('delete')) {
    const item = selectItem.parentElement.parentElement.id;
    deleteTask(item);
  }

  if (selectItem.classList.contains('edit')) {
    const item = selectItem.parentElement.parentElement.id;
    editTask(item);
  }
};
*/

toDoList.addEventListener('click', updateList);
