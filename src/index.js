import './style.css';
import updateId from './modules/updateId.js';
import UpdateLabel from './modules/updateList.js';
import showTrash from './modules/toggle.js';
import removeTask from './modules/removeTask.js';
import {
  SteerChecked, removeChecked,
} from './modules/taskFunctions.js';

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

    display += `<li class="${completed}" id=${index}>
    <div class = "task-item-container" id="content-1">
    <div class="task-item">
    <input type="checkbox" id="${index} ${task.completed ? 'checked' : ''}" class="check">
    <label type="text" class="Label" id="pTask${index}">${task.description}</label>
    <input type="text" class="UpdateLabel" id="updt${index}"/>
    </div>
    <div class="hide2" id="ellipse${index}">
    <i class="fa-solid fa-ellipsis-vertical" ></i>
    </div>
    <div class="hide1" id="delete${index}">
    <i id="idBtn${index}" class="fa-solid fa-trash-can" ></i>
    </div>
    </li>
    `;
  });
  toDoList.innerHTML = display;

  showTrash();
};

const saveTask = ({ index, description, completed = false }) => {
  let storedTasks = [];
  if (localStorage.getItem('tasks') === null) {
    storedTasks = [];
  } else {
    storedTasks = JSON.parse(localStorage.getItem('tasks'));
  }
  storedTasks.push({ index, description, completed });
  storedTasks[storedTasks.length - 1].index = storedTasks.length;
  localStorage.setItem('tasks', JSON.stringify(storedTasks));
  getTask();
};

const saveEditTask = (task) => {
  const taskItem = storedTasks[task];
  taskItem.description = addTaskInput.value;
  localStorage.setItem('tasks', JSON.stringify(storedTasks));
};

addTask.addEventListener('click', (addItem) => {
  addItem.preventDefault();
  if (!addTaskInput.value) return;

  if (editTaskItem != null) {
    saveEditTask(editTaskItem);
    editTaskItem = null;
  } else {
    saveTask({
      index: (storedTasks.length + 1), description: addTaskInput.value, completed: false,
    });
  }
  addTaskInput.value = '';
  window.location.reload();
});

document.addEventListener('keydown', (press) => {
  if (press.key === 'Enter' && addTaskInput.value) {
    addTask.click();
  }
});

getTask();
updateId();
removeTask();
SteerChecked();
removeChecked();
UpdateLabel();