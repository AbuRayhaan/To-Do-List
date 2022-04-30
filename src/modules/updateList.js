export default function UpdateLabel() {
  const ArrayStored = localStorage.getItem('tasks');
  const ArrayStoredParse = JSON.parse(ArrayStored);
  const inputs = document.querySelectorAll('.UpdateLabel');

  inputs.forEach((element, index) => {
    element.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        ArrayStoredParse.forEach((a, i) => {
          const listUpdate = document.getElementById(`updt${i}`);
          ArrayStoredParse[i].description = listUpdate.value;
          localStorage.setItem('tasks', JSON.stringify(ArrayStoredParse));
          location.reload();
        });
      }
    });
  });
}