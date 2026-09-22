
const $=s=>document.querySelector(s);
function cardFlight(f){return `<article class="item"><div class="item-head"><div class="muted">${f.date}</div><h3>${f.from} → ${f.to}</h3><div>${f.route}</div><div class="chips"><span class="chip">✈️ ${f.airline}</span><span class="chip">${f.number}</span><span class="chip">🕐 ${f.depart} → ${f.arrive}</span><span class="chip">⏱️ ${f.duration}</span></div></div><div class="item-body"><div class="grid2"><div class="info"><small>Salida</small><b>${f.depart} · ${f.from}</b></div><div class="info"><small>Llegada</small><b>${f.arrive} · ${f.to}</b></div><div class="info"><small>Aerolínea</small><b>${f.airline}</b></div><div class="info"><small>Cabina</small><b>${f.class}</b></div></div></div></article>`}
function euro(n){return n.toLocaleString("es-ES",{style:"currency",currency:"EUR"});}
function cardExpense(e){
  return `<article class="item expense-item">
    <div class="item-head">
      <div class="muted">${e.category} · ${e.place}</div>
      <h3>💶 ${e.description}</h3>
      <div class="chips"><span class="chip">📍 ${e.place}</span><span class="chip">${euro(e.amount)}</span></div>
    </div>
    <div class="item-body">
      <div class="grid2">
        <div class="info"><small>Categoría</small><b>${e.category}</b></div>
        <div class="info"><small>Lugar / concepto</small><b>${e.place}</b></div>
        <div class="info"><small>Total</small><b>${euro(e.amount)}</b></div>
        <div class="info"><small>Importe por persona (4)</small><b>${euro(e.amount/4)}</b></div>
      </div>
    </div>
  </article>`;
}
function cardStay(s){return `<article class="item"><div class="item-head"><div class="muted">${s.city} · ${s.dates}</div><h3>🏨 ${s.name}</h3><div class="muted">${s.address}</div><div class="chips"><span class="chip">🛏️ ${s.nights}</span><span class="chip">💶 ${s.price}</span></div></div><div class="item-body"><div class="grid2"><div class="info"><small>Entrada</small><b>${s.checkin}</b></div><div class="info"><small>Salida</small><b>${s.checkout}</b></div><div class="info"><small>Anfitrión / alojamiento</small><b>${s.host}</b></div><div class="info"><small>Dirección</small><b>${s.address}</b></div></div><p class="muted" style="margin-top:14px">${s.notes}</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><a class="btn primary" href="${s.map}" target="_blank" rel="noopener">📍 Google Maps</a><a class="btn" href="${s.link}" target="_blank" rel="noopener">🏠 Ver anuncio</a></div></div></article>`}
function init(){
  const tripDate=new Date("2027-05-18T00:00:00"), now=new Date(), diff=Math.ceil((tripDate-now)/86400000); $("#daysToTrip").textContent=Math.max(0,diff);
  $("#flightList").innerHTML = Object.values(TRIP.flightGroups).map(group => {
    const cards = group.segments.map(i => cardFlight(TRIP.flights[i])).join("");
    return `<div class="flight-group"><div class="flight-group-head"><div><span class="eyebrow">${group.date}</span><h2>${group.title}</h2></div><div class="flight-summary"><span>🕐 ${group.total}</span><span>🔄 ${group.layover}</span></div></div><div class="stack">${cards}</div></div>`;
  }).join("");
  $("#stayList").innerHTML=TRIP.stays.map(cardStay).join("");
  const expenseTotal = TRIP.expenses.reduce((sum,e)=>sum+e.amount,0);
  const accommodationTotal = TRIP.expenses.filter(e=>e.category==="Alojamiento").reduce((sum,e)=>sum+e.amount,0);
  $("#expenseList").innerHTML=TRIP.expenses.map(cardExpense).join("");
  $("#expenseTotal").textContent=euro(expenseTotal);
  $("#expensePerPerson").textContent=euro(expenseTotal/4);
  $("#expenseAccommodation").textContent=euro(accommodationTotal);
  const flightTotal = TRIP.expenses.filter(e=>e.category==="Vuelos de ida" || e.category==="Vuelos de vuelta").reduce((sum,e)=>sum+e.amount,0);
  $("#expenseFlights").textContent=euro(flightTotal);

  $("#itineraryList").innerHTML=TRIP.days.map((d,i)=>`<article class="item"><div class="item-head"><div class="muted">${d[0]} mayo · día ${i+1}</div><h3>📍 ${d[1]}</h3><div>${d[2]}</div></div><div class="item-body"><p class="muted">Este día es editable. Aquí iremos añadiendo horarios, reservas, transporte, restaurantes y enlaces a mapas.</p></div></article>`).join("");
  const grid=$("#calendar"), detail=$("#calendarDetail"); let selected="18";
  function renderCal(){grid.innerHTML="";TRIP.days.forEach(d=>{const b=document.createElement("button");b.className="calday"+(d[0]===selected?" selected":"");b.innerHTML=`<b>${d[0]}</b><span>${d[1]}</span>`;b.onclick=()=>{selected=d[0];renderCal();renderDetail()};grid.appendChild(b)})}
  function renderDetail(){const d=TRIP.days.find(x=>x[0]===selected);detail.innerHTML=`<div class="panel"><div class="eyebrow">${selected} MAYO 2027</div><h2>📍 ${d[1]}</h2><div class="event"><strong>PLAN</strong>${d[2]}</div><div class="muted" style="margin-top:12px">Este calendario es la versión inicial basada en el itinerario facilitado. Iremos modificando cada día contigo.</div></div>`}
  renderCal();renderDetail();
  document.querySelectorAll(".item-head").forEach(h=>h.onclick=()=>h.parentElement.classList.toggle("open"));
  document.querySelectorAll("#nav button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".section").forEach(s=>s.classList.remove("active-section"));$("#"+b.dataset.section).classList.add("active-section");document.querySelectorAll("#nav button").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelector(".sidebar")?.classList.remove("open")});
  function goToSection(sectionId){
    document.querySelectorAll(".section").forEach(s=>s.classList.remove("active-section"));
    const target=document.getElementById(sectionId);
    if(target) target.classList.add("active-section");
    document.querySelectorAll("#nav button").forEach(x=>{
      x.classList.toggle("active", x.dataset.section===sectionId);
    });
    document.querySelector(".sidebar")?.classList.remove("open");
    window.scrollTo({top:0,behavior:"smooth"});
  }
  document.querySelectorAll(".home-nav-card").forEach(card=>{
    card.addEventListener("click",()=>goToSection(card.dataset.target));
    card.addEventListener("keydown",e=>{
      if(e.key==="Enter" || e.key===" "){
        e.preventDefault();
        goToSection(card.dataset.target);
      }
    });
  });
  $("#menuBtn").onclick=()=>$(".sidebar").classList.toggle("open");
  const notes=$("#notes");notes.value=localStorage.getItem("jp-notes")||"";notes.oninput=()=>localStorage.setItem("jp-notes",notes.value);
}
init();



function updateWorldClocks(){
  const fmtTime = (tz, withSeconds=true) => new Intl.DateTimeFormat("es-ES", {
    timeZone: tz, hour: "2-digit", minute: "2-digit",
    ...(withSeconds ? {second:"2-digit"} : {}), hour12: false
  });
  const fmtDate = (tz) => new Intl.DateTimeFormat("es-ES", {
    timeZone: tz, weekday: "short", day: "2-digit", month: "short"
  });
  const now = new Date();

  const values = {
    spainClock: fmtTime("Europe/Madrid", true).format(now),
    japanClock: fmtTime("Asia/Tokyo", true).format(now),
    chengduClock: fmtTime("Asia/Shanghai", false).format(now),
    beijingClock: fmtTime("Asia/Shanghai", false).format(now),
    spainDate: fmtDate("Europe/Madrid").format(now),
    japanDate: fmtDate("Asia/Tokyo").format(now)
  };

  Object.entries(values).forEach(([id,value])=>{
    const el=document.getElementById(id);
    if(el) el.textContent=value;
  });

  const diff = document.getElementById("clockDiff");
  if(diff){
    const parts = new Intl.DateTimeFormat("en-US", {timeZone:"Europe/Madrid", timeZoneName:"longOffset"}).formatToParts(now);
    const partsJ = new Intl.DateTimeFormat("en-US", {timeZone:"Asia/Tokyo", timeZoneName:"longOffset"}).formatToParts(now);
    const getOffset = p => {
      const v=p.find(x=>x.type==="timeZoneName")?.value||"";
      const m=v.match(/GMT([+-])(\d{2}):?(\d{2})?/);
      if(!m) return null;
      return (m[1]==="+"?1:-1)*(parseInt(m[2],10)+(parseInt(m[3]||"0",10)/60));
    };
    const d=(getOffset(partsJ)??9)-(getOffset(parts)??1);
    diff.textContent=`${d>=0?"+":""}${d} h respecto a España`;
  }
}
updateWorldClocks();
setInterval(updateWorldClocks, 1000);

function initCurrency(){
  const amount=document.getElementById("currencyAmount");
  const from=document.getElementById("currencyFrom");
  const result=document.getElementById("currencyResult");
  const swap=document.getElementById("currencySwap");

  const homeAmount=document.getElementById("homeCurrencyAmount");
  const homeFrom=document.getElementById("homeCurrencyFrom");
  const homeResult=document.getElementById("homeCurrencyResult");
  const homeSwap=document.getElementById("homeCurrencySwap");
  const homeRateEl=document.getElementById("homeEurJpyRate");
  const rateEl=document.getElementById("eurJpyRate");
  const statusEl=document.getElementById("currencyRateStatus");
  const yenTable=document.getElementById("yenToEuroTable");
  const euroTable=document.getElementById("euroToYenTable");
  if((!amount||!from||!result||!swap) && (!homeAmount||!homeFrom||!homeResult||!homeSwap))return;

  const FALLBACK_RATE=180.70;
  let rate=Number(localStorage.getItem("eurJpyRate"))||FALLBACK_RATE;
  let rateDate=localStorage.getItem("eurJpyRateDate")||"";
  const fmtEUR=new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR",maximumFractionDigits:2});
  const fmtJPY=new Intl.NumberFormat("es-ES",{maximumFractionDigits:0});
  const fmtRate=new Intl.NumberFormat("es-ES",{minimumFractionDigits:2,maximumFractionDigits:2});

  function updateHome(){
    if(!homeAmount||!homeFrom||!homeResult)return;
    const value=Math.max(0,Number(homeAmount.value)||0);
    if(homeFrom.value==="JPY") homeResult.textContent=fmtEUR.format(value/rate);
    else homeResult.textContent=`¥${fmtJPY.format(value*rate)}`;
    if(homeRateEl) homeRateEl.textContent=fmtRate.format(rate);
  }

  function formatDate(iso){
    if(!iso)return "";
    const [y,m,d]=iso.split("-");
    return `${d}/${m}/${y}`;
  }

  function renderTables(){
    const yenValues=[1000,5000,10000,20000,50000,100000];
    const euroValues=[1,10,20,50,100,200,500];
    if(yenTable) yenTable.innerHTML=yenValues.map(v=>`<tr><td>¥${fmtJPY.format(v)}</td><td>${fmtEUR.format(v/rate)}</td></tr>`).join("");
    if(euroTable) euroTable.innerHTML=euroValues.map(v=>`<tr><td>${fmtEUR.format(v)}</td><td>¥${fmtJPY.format(v*rate)}</td></tr>`).join("");
  }

  function update(){
    const value=Math.max(0,Number(amount.value)||0);
    if(from.value==="JPY") result.textContent=fmtEUR.format(value/rate);
    else result.textContent=`¥${fmtJPY.format(value*rate)}`;
    if(rateEl) rateEl.textContent=fmtRate.format(rate);
    renderTables();
    updateHome();
  }

  function showStatus(source){
    if(!statusEl)return;
    const dateText=rateDate?`Actualizado: ${formatDate(rateDate)}.`:"";
    statusEl.textContent=`${dateText} Tipo de referencia. El cambio real puede variar según el día, banco o tarjeta. ${source||""}`.trim();
  }

  async function loadRate(){
    try{
      const res=await fetch("https://api.frankfurter.dev/v2/rate/eur/jpy",{cache:"no-store"});
      if(!res.ok) throw new Error("No se pudo obtener el cambio");
      const data=await res.json();
      if(typeof data.rate!=="number"||!isFinite(data.rate)||data.rate<=0) throw new Error("Tipo de cambio no válido");
      rate=data.rate;
      rateDate=data.date||new Date().toISOString().slice(0,10);
      localStorage.setItem("eurJpyRate",String(rate));
      localStorage.setItem("eurJpyRateDate",rateDate);
      update();
      showStatus("Fuente: Frankfurter.");
    }catch(e){
      update();
      showStatus(rateDate?"Sin conexión: se muestra el último cambio guardado.":"Sin conexión: se muestra un cambio de respaldo.");
    }
  }

  if(amount) amount.addEventListener("input",update);
  if(from) from.addEventListener("change",update);
  if(swap) swap.addEventListener("click",()=>{
    from.value=from.value==="JPY"?"EUR":"JPY";
    amount.value=from.value==="EUR"?5.53:1000;
    update();
  });

  if(homeAmount) homeAmount.addEventListener("input",updateHome);
  if(homeFrom) homeFrom.addEventListener("change",updateHome);
  if(homeSwap) homeSwap.addEventListener("click",()=>{
    homeFrom.value=homeFrom.value==="JPY"?"EUR":"JPY";
    homeAmount.value=homeFrom.value==="EUR"?5.53:1000;
    updateHome();
  });

  update();
  updateHome();
  loadRate();
  // Comprueba de nuevo periódicamente por si la página permanece abierta varios días.
  setInterval(loadRate,6*60*60*1000);
}
initCurrency();
