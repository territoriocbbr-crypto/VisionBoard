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

// PREMIOS
const prizes = [
  "Premio sorpresa 💌",
  "Salida especial contigo ✨",
  "Detalle inesperado 🎁",
  "Plan elegido por ti 🎉"
];

const milestones = [300,600,900,960];

let spinsUsed = JSON.parse(localStorage.getItem("spinsUsed") || "[]");

function calculatePoints(){
  let total = 0;
  document.querySelectorAll(".note.open").forEach(note=>{
    const id = parseInt(note.dataset.id);
    const pointsMap = {
      1:20,2:30,3:30,4:50,5:30,6:50,7:30,8:50,9:20,10:50,
      11:50,12:50,13:20,14:50,15:50,16:50,17:50,18:50,
      19:50,20:30,21:50,22:50,23:50
    };
    total += pointsMap[id] || 0;
  });
  return total;
}

function checkRoulette(){
  const points = calculatePoints();
  const next = milestones.find(m=>points>=m && !spinsUsed.includes(m));
  if(next){
    document.getElementById("rouletteContainer").classList.remove("hidden");
  }
}

// RULETA
const wheel = document.querySelector(".wheel");
const spinBtn = document.getElementById("spinBtn");

spinBtn.addEventListener("click",()=>{
  const angle = Math.floor(3600 + Math.random()*360);
  wheel.style.transform = `rotate(${angle}deg)`;

  setTimeout(()=>{
    const prize = prizes[Math.floor(Math.random()*prizes.length)];
    showPrize(prize);

    const points = calculatePoints();
    const milestone = milestones.find(m=>points>=m && !spinsUsed.includes(m));
    spinsUsed.push(milestone);
    localStorage.setItem("spinsUsed",JSON.stringify(spinsUsed));

    document.getElementById("rouletteContainer").classList.add("hidden");
  },3000);
});

function showPrize(text){
  const card = document.getElementById("prizeCard");
  const cardInner = card.querySelector(".card");
  document.getElementById("prizeText").innerText = text;

  card.classList.remove("hidden");
  setTimeout(()=>cardInner.classList.add("open"),300);
}

// Chequeo automático
setTimeout(checkRoulette,500);
