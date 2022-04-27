import './style.css';

const toDoTask = [
  {
    index: 1,
    description: 'Wash the dishes',
    completed: true,
  },
  {
    index: 2,
    description: 'Complete To Do list project',
    completed: true,
  },
  {
    index: 3,
    description: 'Lunch',
    completed: true,
  },
  {
    index: 4,
    description: 'Stand up meeting',
    completed: true,
  },
];

const toDoList = document.querySelector('#task-container');

const listDisplay = () => {
  let display = '';
  toDoTask.forEach((task) => {
    display += `<li class="task-item-container" id=${task.index}>
    <div class="task-item">
      <input type="checkbox" id=${task.index} ${task.completed ? 'checked' : ''}>
      <label type="text" id="${task.index}" for="${task.description}">${task.description}</label>
    </div>
    <i class="fa-solid fa-ellipsis-vertical"></i>
    </li>
    `;
  });
  toDoList.innerHTML = display;
};

listDisplay();