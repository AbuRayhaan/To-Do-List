import updateId from "./updateId.js";

export default function removeTask() {
  const removeList = document.querySelectorAll('.hide1');
  const BookStored = JSON.parse(localStorage.getItem('tasks'));
  removeList.forEach((a, i) => {
    document.getElementById(`idBtn${i}`).addEventListener('click', () => {
      const BookFiltered = BookStored.filter((book, index) => book.index !== i);
      localStorage.setItem('tasks', JSON.stringify(BookFiltered));
      console.log("clicked", i);
      location.reload();
      updateId();
    });
  });
}