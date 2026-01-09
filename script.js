// Apertura de notas
document.querySelectorAll(".note").forEach(note=>{
  const id = note.dataset.id;

  if(localStorage.getItem("note-"+id)==="open"){
    note.classList.add("open");
  }

  note.addEventListener("click",()=>{
    if(!note.classList.contains("open")){
      note.classList.add("open");
      localStorage.setItem("note-"+id,"open");
    }
  });
});

// Reset por presión larga (5s)
const title = document.getElementById("resetTitle");
let pressTimer = null;

const startPress = ()=>{
  pressTimer = setTimeout(()=>{
    localStorage.clear();
    document.querySelectorAll(".note").forEach(n=>n.classList.remove("open"));
  },5000);
};

const cancelPress = ()=>{
  if(pressTimer) clearTimeout(pressTimer);
};

title.addEventListener("mousedown",startPress);
title.addEventListener("touchstart",startPress);
title.addEventListener("mouseup",cancelPress);
title.addEventListener("mouseleave",cancelPress);
title.addEventListener("touchend",cancelPress);
