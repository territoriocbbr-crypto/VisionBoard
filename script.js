const notes=document.querySelectorAll(".note");
const roulette=document.getElementById("rouletteContainer");
const spinBtn=document.getElementById("spin");
const result=document.getElementById("result");

let opened=JSON.parse(localStorage.getItem("opened")||"[]");

notes.forEach(n=>{
  if(opened.includes(n.dataset.id)){
    n.classList.add("open");
  }

  n.addEventListener("click",()=>{
    if(!n.classList.contains("open")){
      n.classList.add("open");
      opened.push(n.dataset.id);
      localStorage.setItem("opened",JSON.stringify(opened));
      checkPoints();
    }
  });
});

function checkPoints(){
  let total=0;
  notes.forEach(n=>{
    if(n.classList.contains("open")){
      total+=Number(n.dataset.points);
    }
  });
  if([300,600,900,960].includes(total)){
    roulette.classList.remove("hidden");
  }
}

spinBtn.onclick=()=>{
  const prizes=["Cena","Viaje","Sorpresa","Regalo"];
  const prize=prizes[Math.floor(Math.random()*prizes.length)];
  result.innerText="🎁 Premio: "+prize;
};

let timer;
document.getElementById("title").addEventListener("mousedown",()=>{
  timer=setTimeout(()=>{
    localStorage.clear();
    location.reload();
  },5000);
});
document.addEventListener("mouseup",()=>clearTimeout(timer));
