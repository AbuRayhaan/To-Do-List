import { deleteTask, editTask } from './index.js';

const updateList = (update) => {
  const selectItem = update.target;

  if (selectItem.classList.contains('delete')) {
    const item = selectItem.parentElement.parentElement.id;
    deleteTask(item);
  }

  if (selectItem.classList.contains('edit')) {
    const item = selectItem.parentElement.parentElement.id;
    editTask(item);
  }
};

export default updateList;