document.querySelectorAll(".note").forEach(note => {
  const id = note.dataset.id;

  if (localStorage.getItem(`note-${id}`) === "open") {
    note.classList.add("open");
  }

  note.addEventListener("click", () => {
    if (!note.classList.contains("open")) {
      note.classList.add("open");
      localStorage.setItem(`note-${id}`, "open");
    }
  });
});
