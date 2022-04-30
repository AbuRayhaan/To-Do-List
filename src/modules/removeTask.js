import updateId from './updateId.js';

export default function removeTask() {
  const removeList = document.querySelectorAll('.hide1');
  const TaskStored = JSON.parse(localStorage.getItem('tasks'));
  removeList.forEach((a, i) => {
    document.getElementById(`idBtn${i}`).addEventListener('click', () => {
      const TaskFiltered = TaskStored.filter((task, i) => task.index !== i);
      localStorage.setItem('tasks', JSON.stringify(TaskFiltered));
      window.location.reload();
      updateId();
    });
  });
}