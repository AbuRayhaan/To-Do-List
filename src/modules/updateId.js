export default function updateId() {
  const TasksR = JSON.parse(localStorage.getItem('tasks'));
  TasksR.forEach((a, i) => {
    a.index = i;
    localStorage.setItem('tasks', JSON.stringify(TasksR));
  });
}