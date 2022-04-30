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
      document.getElementById(`pTask${i}`).style.display = 'flex';
      document.getElementById(`updt${i}`).style.display = 'flex';
      document.getElementById(`updt${i}`).addEventListener('click', () => {
        document.getElementById(`pTask${i}`).style.display = 'none';
        document.getElementById(`updt${i}`).style.display = 'flex';
      });
      a.style.backgroundColor = 'rgba(190, 180, 176, 0.61)';
      document.getElementById(`updt${i}`).style.backgroundColor = 'transparent';
    });

    a.addEventListener('mouseout', () => {
      document.getElementById(`delete${i}`).style.display = 'none';
      document.getElementById(`ellipse${i}`).style.display = 'flex';
      document.getElementById(`pTask${i}`).style.display = 'flex';
      document.getElementById(`updt${i}`).style.display = 'none';
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

addTask.addEventListener('click', (addItem) => {
  addItem.preventDefault();
  if (!addTaskInput.value) return;

  if (editTaskItem != null) {
    saveEditTask(editTaskItem);
    editTaskItem = null;
  } else {
    saveTask({ index: storedTasks.length, description: addTaskInput.value, completed: false });
  }
  addTaskInput.value = '';
  window.location.reload();
});

document.addEventListener('keydown', (press) => {
  if (press.key === 'Enter' && addTaskInput.value) {
    addTask.click();
  }
});

const SteerChecked = () => {
  const StoreCheck = JSON.parse(localStorage.getItem('tasks'));
  const checkBoxs = document.querySelectorAll('.check');
  StoreCheck.forEach((a, i) => {
    if (a.completed === true) {
      checkBoxs[i].checked = true;
      document.getElementById(`pTask${i}`).style.textDecoration = 'line-through rgb(68, 68, 68)';
    }
  });
};

const removeChecked = () => {
  const buttonRemove = document.getElementById('button-clear');
  const checkBoxs = document.querySelectorAll('.check');
  const TasksR = JSON.parse(localStorage.getItem('tasks'));
  checkBoxs.forEach((check, i) => {
    check.addEventListener('click', () => {
      if (TasksR[i].completed === true) {
        TasksR[i].completed = false;
        checkBoxs[i].checked = false;
        document.getElementById(`pTask${i}`).style.textDecoration = 'none';
        localStorage.setItem('tasks', JSON.stringify(TasksR));
      } else {
        TasksR[i].completed = true;
        checkBoxs[i].checked = true;
        document.getElementById(`pTask${i}`).style.textDecoration = 'line-through rgb(68, 68, 68)';
        localStorage.setItem('tasks', JSON.stringify(TasksR));
      }
    });

    buttonRemove.addEventListener('click', () => {
      const TaskFiltered = TasksR.filter((task) => task.completed !== true);
      localStorage.setItem('tasks', JSON.stringify(TaskFiltered));
      window.location.reload();
    });
  });
};

function updateId() {
  const TasksR = JSON.parse(localStorage.getItem('tasks'));
  TasksR.forEach((a, i) => {
    a.index = i;
    localStorage.setItem('tasks', JSON.stringify(TasksR));
  });
}

function removeTask() {
  const removeList = document.querySelectorAll('.hide1');
  const Taskstored = JSON.parse(localStorage.getItem('tasks'));
  removeList.forEach((a, i) => {
    document.getElementById(`idBtn${i}`).addEventListener('click', () => {
      const TaskFiltered = Taskstored.filter((task) => task.index !== i);
      localStorage.setItem('tasks', JSON.stringify(TaskFiltered));
      window.location.reload();
      updateId();
    });
  });
}

function UpdateLabel() {
  const ArrayStored = localStorage.getItem('tasks');
  const ArrayStoredParse = JSON.parse(ArrayStored);
  const inputs = document.querySelectorAll('.UpdateLabel');

  inputs.forEach((element) => {
    element.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        ArrayStoredParse[i].description = event.currentTarget.value.trim();
        localStorage.setItem('tasks', JSON.stringify(ArrayStoredParse));
        window.location.reload();
      }
    });
  });
}

getTask();
updateId();
removeTask();
SteerChecked();
removeChecked();
UpdateLabel();