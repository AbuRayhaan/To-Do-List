import updateId from './updateId.js';

export default function removeTask() {
  const removeList = document.querySelectorAll('.hide1');
  const Taskstored = JSON.parse(localStorage.getItem('tasks'));
  removeList.forEach((a, i) => {
    document.getElementById(`idBtn${i}`).addEventListener('click', () => {
      const TaskFiltered = Taskstored.filter((task) => task.index !== i + 1);
      localStorage.setItem('tasks', JSON.stringify(TaskFiltered));
      window.location.reload();
      updateId();
    });
  });
}