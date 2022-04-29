import './style.css';

const toDoList = document.querySelector('#task-container');
const addTask = document.getElementById('addTask');
const addTaskInput = document.getElementById('addTaskInput');

let storedTasks = [];
let editTaskItem = null;

function showTrash() {
  const ellipse = document.querySelectorAll('li');
  ellipse.forEach((a, i) => {
    a.addEventListener('mouseover', () => {
      document.getElementById(`delete${i}`).style.display = 'flex';
      document.getElementById(`ellipse${i}`).style.display = 'none';
      a.style.backgroundColor = 'rgba(190, 180, 176, 0.61)';
    });

    a.addEventListener('mouseout', () => {
      document.getElementById(`delete${i}`).style.display = 'none';
      document.getElementById(`ellipse${i}`).style.display = 'flex';
      a.style.backgroundColor = 'transparent';
    });
  });
}

const getTask = () => {
  if (localStorage.getItem('tasks') === null) {
    storedTasks = [];
  } else {
    storedTasks = JSON.parse(localStorage.getItem('tasks'));
  }

  let display = '';
  storedTasks.forEach((task, index) => {
    const completed = task.completed ? 'line-through' : '';

    display += `<li class="taskList${completed}" id=${index}>
    <div class = "task-item-container">
    <div class="task-item">
    <input type="checkbox" id="${index}" ${task.completed ? 'checked' : ''} class="check">
    <label type="text" id="pTask${index}">${task.description}</label>
    </div>  
    <div class="hide2" id="ellipse${index}">
    <i class="fa-solid fa-ellipsis-vertical vertIcon"></i>
    </div>
    <div class="hide1" id="delete${index}">
    <i class="fa-solid fa-trash-can deleteBin"></i>
    </div>
    </li>
    `;
  });
  toDoList.innerHTML = display;

  showTrash();
};

document.addEventListener('DOMContentLoaded', getTask);

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
const deleteTaskItem = document.getElementById('deleteIcon');

deleteTaskItem.addEventListener('click', () => {

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

toDoList.addEventListener('click', updateList);
*/
/*
const ellipse = document.querySelectorAll('.vertIcon');

ellipse.forEach((a, i) => {
  document.getElementById(`ellipse${i}`).addEventListener('click', () => {
    document.getElementById(`delete${i}`).style.display = 'flex';
    document.getElementById(`ellipse${i}`).style.display = 'none';
    console.log('button', i);
  });
});
*/

/*
ellipse.addEventListener('click', () => {
  deleteButton.classList.remove('hide');
  ellipse.classList.add('hide');
});
*/