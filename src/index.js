import './style.css';
import updateList from './listUpdate.js';

const toDoList = document.querySelector('#task-container');
const addTask = document.getElementById('#addTask');
const addTaskInput = document.getElementById('#addTaskInput');
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
      <div class="task-item">
        <input type="checkbox" id=${index} ${task.completed ? 'checked' : ''}>
        <label type="text" id="${index}" for="${task.description}">${task.description}</label>
      </div>
      <i class="fa-solid fa-trash-can" id="${index}></i>
      <i class="fa-solid fa-ellipsis-vertical" id="${index}></i>
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

const resetList = (storedList) => storedList.forEach((taskItem, index) => {
  taskItem.index = index;
});

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

addTask.addEventListener('click', (addItem) => {
  addItem.preventDefault();
  if (!addTaskInput.value) return;

  if (editTaskItem != null) {
    saveEditTask(editTaskItem);
    editTaskItem = null;
  } else {
    saveTask({ index: storedTasks.length, description: addTaskInput.value, completed: false})
  }

  getTask();
  addTaskInput.value = '';
});

document.addEventListener('keydown', (press) => {
  if (press.key === 'Enter' && addTaskInput.value) {
    addTask.click();
  }
});

document.addEventListener('DOMContentLoaded', getTask);
toDoList.addEventListener('click', updateList);

export { deleteTask, editTask };