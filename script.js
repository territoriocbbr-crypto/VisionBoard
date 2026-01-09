const notes = document.querySelectorAll('.note');

notes.forEach(note => {
  const id = note.dataset.id;

  // Restaurar estado
  if (localStorage.getItem(`note-${id}`) === 'open') {
    note.classList.add('open');
  }

  note.addEventListener('click', () => {
    if (!note.classList.contains('open')) {
      note.classList.add('open');
      localStorage.setItem(`note-${id}`, 'open');
    }
  });
});
