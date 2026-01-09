document.querySelectorAll('.note').forEach(note => {
  const id = note.dataset.id;

  note.style.setProperty(
    '--rot',
    `${Math.random() * 6 - 3}deg`
  );

  if (localStorage.getItem('note-' + id) === 'open') {
    note.classList.add('open');
  }

  note.addEventListener('click', () => {
    if (!note.classList.contains('open')) {
      note.classList.add('open');
      localStorage.setItem('note-' + id, 'open');
    }
  });
});
