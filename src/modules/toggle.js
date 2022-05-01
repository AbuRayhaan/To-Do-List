export default function showTrash() {
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