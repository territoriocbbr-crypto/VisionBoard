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

// Reset oculto (5 segundos)
const title = document.getElementById("resetTitle");
let timer=null;

const startReset=()=>{
  timer=setTimeout(()=>{
    localStorage.clear();
    document.querySelectorAll(".note").forEach(n=>n.classList.remove("open"));
    alert("Metas reiniciadas");
  },5000);
};

const cancelReset=()=>clearTimeout(timer);

title.addEventListener("mousedown",startReset);
title.addEventListener("touchstart",startReset);
title.addEventListener("mouseup",cancelReset);
title.addEventListener("mouseleave",cancelReset);
title.addEventListener("touchend",cancelReset);
