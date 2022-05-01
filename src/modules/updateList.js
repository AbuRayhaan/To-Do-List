export default function UpdateLabel() {
  const ArrayStored = localStorage.getItem('tasks');
  const ArrayStoredParse = JSON.parse(ArrayStored);
  const inputs = document.querySelectorAll('.UpdateLabel');

  inputs.forEach((element, i) => {
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