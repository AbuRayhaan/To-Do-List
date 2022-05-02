export default function updateId() {
  const TasksR = JSON.parse(localStorage.getItem('tasks'));
  TasksR.forEach((a, i) => {
    a.index = i + 1;
    localStorage.setItem('tasks', JSON.stringify(TasksR));
  });
}