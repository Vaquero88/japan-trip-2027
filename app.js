
const $=s=>document.querySelector(s);
function cardFlight(f){return `<article class="item"><div class="item-head"><div class="muted">${f.date}</div><h3>${f.from} → ${f.to}</h3><div>${f.route}</div><div class="chips"><span class="chip">✈️ ${f.airline}</span><span class="chip">${f.number}</span><span class="chip">🕐 ${f.depart} → ${f.arrive}</span><span class="chip">⏱️ ${f.duration}</span></div></div><div class="item-body"><div class="grid2"><div class="info"><small>Salida</small><b>${f.depart} · ${f.from}</b></div><div class="info"><small>Llegada</small><b>${f.arrive} · ${f.to}</b></div><div class="info"><small>Aerolínea</small><b>${f.airline}</b></div><div class="info"><small>Cabina</small><b>${f.class}</b></div></div></div></article>`}
function cardStay(s){return `<article class="item"><div class="item-head"><div class="muted">${s.city} · ${s.dates}</div><h3>🏨 ${s.name}</h3><div class="muted">${s.address}</div><div class="chips"><span class="chip">🛏️ ${s.nights}</span><span class="chip">💶 ${s.price}</span><span class="chip">👥 4 personas</span></div></div><div class="item-body"><div class="grid2"><div class="info"><small>Entrada</small><b>${s.checkin}</b></div><div class="info"><small>Salida</small><b>${s.checkout}</b></div><div class="info"><small>Anfitrión / alojamiento</small><b>${s.host}</b></div><div class="info"><small>Dirección</small><b>${s.address}</b></div></div><p class="muted" style="margin-top:14px">${s.notes}</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><a class="btn primary" href="${s.map}" target="_blank" rel="noopener">📍 Google Maps</a><a class="btn" href="${s.link}" target="_blank" rel="noopener">🏠 Ver anuncio</a></div></div></article>`}
const LOGIN_HASH="465b8760c60de482ba36bcae955e1e92f76f80aac76a39ada9179c6923a126ab";
async function sha256(text){const data=new TextEncoder().encode(text);const hash=await crypto.subtle.digest("SHA-256",data);return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,"0")).join("")}
function init(){
  const tripDate=new Date("2027-05-18T00:00:00"), now=new Date(), diff=Math.ceil((tripDate-now)/86400000); $("#daysToTrip").textContent=Math.max(0,diff);
  $("#flightList").innerHTML=TRIP.flights.map(cardFlight).join("");
  $("#stayList").innerHTML=TRIP.stays.map(cardStay).join("");
  $("#itineraryList").innerHTML=TRIP.days.map((d,i)=>`<article class="item"><div class="item-head"><div class="muted">${d[0]} mayo · día ${i+1}</div><h3>📍 ${d[1]}</h3><div>${d[2]}</div></div><div class="item-body"><p class="muted">Este día es editable. Aquí iremos añadiendo horarios, reservas, transporte, restaurantes y enlaces a mapas.</p></div></article>`).join("");
  const grid=$("#calendar"), detail=$("#calendarDetail"); let selected="18";
  function renderCal(){grid.innerHTML="";TRIP.days.forEach(d=>{const b=document.createElement("button");b.className="calday"+(d[0]===selected?" selected":"");b.innerHTML=`<b>${d[0]}</b><span>${d[1]}</span>`;b.onclick=()=>{selected=d[0];renderCal();renderDetail()};grid.appendChild(b)})}
  function renderDetail(){const d=TRIP.days.find(x=>x[0]===selected);detail.innerHTML=`<div class="panel"><div class="eyebrow">${selected} MAYO 2027</div><h2>📍 ${d[1]}</h2><div class="event"><strong>PLAN</strong>${d[2]}</div><div class="muted" style="margin-top:12px">Este calendario es la versión inicial basada en el itinerario facilitado. Iremos modificando cada día contigo.</div></div>`}
  renderCal();renderDetail();
  document.querySelectorAll(".item-head").forEach(h=>h.onclick=()=>h.parentElement.classList.toggle("open"));
  document.querySelectorAll("#nav button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".section").forEach(s=>s.classList.remove("active-section"));$("#"+b.dataset.section).classList.add("active-section");document.querySelectorAll("#nav button").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelector(".sidebar")?.classList.remove("open")});
  $("#menuBtn").onclick=()=>$(".sidebar").classList.toggle("open");
  const notes=$("#notes");notes.value=localStorage.getItem("jp-notes")||"";notes.oninput=()=>localStorage.setItem("jp-notes",notes.value);
}
async function setupLogin(){
  const gate=$("#loginGate"), form=$("#loginForm"), input=$("#loginPassword"), error=$("#loginError");
  document.body.classList.add("locked");
  if(localStorage.getItem("jp-access") === "1"){gate.classList.add("hidden");document.body.classList.remove("locked");init();return;}
  form.addEventListener("submit",async e=>{
    e.preventDefault();
    error.textContent="";
    const ok=(await sha256(input.value))===LOGIN_HASH;
    if(ok){
      localStorage.setItem("jp-access","1");
      gate.classList.add("hidden");
      document.body.classList.remove("locked");
      input.value="";
      init();
    }else{
      error.textContent="Contraseña incorrecta. Inténtalo de nuevo.";
      input.select();
    }
  });
}
setupLogin();
