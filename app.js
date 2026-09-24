
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
const CITY_IMAGES={
  "Tokio":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Tokyo%20Skyline.jpg",
  "Hakone":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Fukuzumi%20Ryokan%20Besso%20Ishigura.jpg",
  "Kioto":"https://commons.wikimedia.org/wiki/Special:Redirect/file/GIO%20-%20Traditional%20street%20with%20pedestrians%20in%20Gion,%20Kyoto,%20Japan,%202015.jpg",
  "Osaka":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Dotonbori%20at%20night.JPG",
  "Nikko":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Nikko%20toshogu%20torii%20and%20yomeimon%20gate.jpg",
  "Nara":"https://commons.wikimedia.org/wiki/Special:Redirect/file/Nara%20deer%20lounging%20at%20Todaiji.jpg"
};
function cardStay(s){const img=CITY_IMAGES[s.city]||CITY_IMAGES.Tokio;return `<article class="item stay-card"><div class="stay-visual"><img src="${img}" alt="${s.city}" loading="lazy" referrerpolicy="no-referrer"><div class="stay-visual-overlay"></div><div class="stay-visual-label">${s.city}</div></div><div class="item-head"><div class="muted">${s.city} · ${s.dates}</div><h3>🏨 ${s.name}</h3><div class="muted">${s.address}</div><div class="chips"><span class="chip">🛏️ ${s.nights}</span><span class="chip">💶 ${s.price}</span></div></div><div class="item-body"><div class="grid2"><div class="info"><small>Entrada</small><b>${s.checkin}</b></div><div class="info"><small>Salida</small><b>${s.checkout}</b></div><div class="info"><small>Anfitrión / alojamiento</small><b>${s.host}</b></div><div class="info"><small>Dirección</small><b>${s.address}</b></div></div><p class="muted" style="margin-top:14px">${s.notes}</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><a class="btn primary" href="${s.map}" target="_blank" rel="noopener">📍 Google Maps</a><a class="btn" href="${s.link}" target="_blank" rel="noopener">🏠 Ver anuncio</a></div></div></article>`}
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

  const transportPlan = [
    {date:"18 mayo",city:"Tokio",title:"✈️ Narita → Yanaka",summary:"Solo 1 transporte: aeropuerto → Nippori",items:[
      {icon:"🚆",type:"TREN · AEROPUERTO",title:"Narita → Nippori",route:"Keisei Skyliner",text:"Desde la estación de Narita Airport, seguir las indicaciones Keisei / Skyliner y coger el Limited Express hasta Nippori. Desde allí, el alojamiento queda a pie.",details:["⏱️ ~36 min","💴 ~2.470–2.580 ¥ / persona","💺 Asiento reservado","🎟️ Se compra online o en la estación","📌 No hace falta reservar con mucha antelación"],note:"💡 Al llegar a las 15:10, mejor comprar el billete cuando hayáis pasado inmigración y recogido el equipaje, para no depender de una hora concreta.",maps:true}
    ]},
    {date:"19 mayo",city:"Tokio",title:"🏯 Yanaka → Asakusa → Ueno → Akihabara",summary:"4 trayectos en JR + Metro · Suica/PASMO · sin reservas",items:[
      {icon:"🚆",type:"JR · YAMANOTE",title:"Nippori → Ueno",route:"JR Yamanote Line",text:"Desde Nippori, coger la Yamanote hasta Ueno.",details:["⏱️ ~4–5 min","💴 Tarifa corta según estación / IC","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true},
      {icon:"🚇",type:"METRO · GINZA LINE",title:"Ueno → Asakusa",route:"Tokyo Metro Ginza Line",text:"En Ueno, cambiar al Metro de Tokio y coger la Ginza Line hasta Asakusa.",details:["⏱️ ~5 min","💴 ~178 ¥ con IC / 180 ¥ billete","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true},
      {icon:"🚇",type:"METRO · GINZA LINE",title:"Asakusa → Ueno",route:"Tokyo Metro Ginza Line",text:"Volver desde Asakusa hasta Ueno por la misma línea.",details:["⏱️ ~5 min","💴 ~180 ¥","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true},
      {icon:"🚆",type:"JR · YAMANOTE",title:"Ueno → Akihabara",route:"JR Yamanote Line",text:"Desde JR Ueno, coger la Yamanote hasta Akihabara.",details:["⏱️ ~4 min","💴 Tarifa corta según estación / IC","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true},
      {icon:"🚆",type:"JR · YAMANOTE",title:"Akihabara → Nippori",route:"JR Yamanote Line",text:"Volver desde Akihabara hasta Nippori.",details:["⏱️ ~7–8 min","💴 Tarifa corta según estación / IC","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true}
    ]},
    {date:"20 mayo",city:"Tokio",title:"🐟 Yanaka → Toyosu → Odaiba → Shibuya",summary:"Madrugón · JR Yamanote + Yurikamome + Rinkai Line",items:[
      {icon:"🚆",type:"JR · YAMANOTE",title:"Nippori → Shimbashi",route:"JR Yamanote Line",text:"Salir temprano desde Nippori hacia Shimbashi para continuar hacia Toyosu.",details:["⏱️ ~25 min","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true},
      {icon:"🚝",type:"YURIKAMOME",title:"Shimbashi → Shijo-mae",route:"Yurikamome",text:"Desde Shimbashi, coger Yurikamome y bajar en Shijo-mae, la estación que debéis usar para el Mercado de Toyosu.",details:["⏱️ ~27 min","💴 Tarifa según trayecto / IC","🎟️ Sin reserva","💳 Suica / PASMO","⚠️ Bajar en Shijo-mae, no en Toyosu"],maps:true},
      {icon:"🚝",type:"YURIKAMOME",title:"Shijo-mae → Daiba",route:"Yurikamome",text:"Después de Toyosu, continuar en Yurikamome hasta Daiba para recorrer Odaiba.",details:["⏱️ ~15–20 min","💴 ~300–400 ¥","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true},
      {icon:"🚆",type:"RINKAI LINE",title:"Tokyo Teleport → Shibuya",route:"Rinkai Line",text:"Desde Tokyo Teleport, coger la Rinkai Line hacia Shibuya. Es la opción planteada para evitar volver hasta Shimbashi.",details:["⏱️ ~25–30 min","💴 ~500–600 ¥","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true},
      {icon:"🚕",type:"VUELTA DE MADRUGADA",title:"Shibuya → Yanaka",route:"Tren o taxi según la hora",text:"Si la fiesta termina cuando ya no haya servicio ferroviario, la alternativa será taxi.",details:["🚆 Tren: solo mientras haya servicio","🚕 Taxi: alternativa de madrugada","🎟️ No se reserva tren"],maps:true}
    ]},
    {date:"21 mayo",city:"Tokio",title:"🌳 Yanaka → Meiji Jingu → Harajuku → Omotesando → Kabuki → Shinjuku",summary:"JR Yamanote + Metro · varios tramos se hacen andando",items:[
      {icon:"🚆",type:"JR · YAMANOTE",title:"Nippori → Harajuku",route:"JR Yamanote Line",text:"Desde Nippori, coger la Yamanote hasta Harajuku. Desde allí se continúa andando hacia Meiji Jingu.",details:["⏱️ ~30 min","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true},
      {icon:"🚇",type:"METRO · GINZA LINE",title:"Omotesando → Ginza / Kabuki-za",route:"Tokyo Metro Ginza Line",text:"Si la función es en Kabuki-za, coger la Ginza Line desde Omote-sando hacia Ginza y continuar andando hasta Kabuki-za / Higashi-Ginza.",details:["⏱️ ~15 min hasta Ginza","💴 ~180–220 ¥","🎟️ Sin reserva","💳 Suica / PASMO"],note:"🎭 El transporte final puede ajustarse cuando tengamos confirmada la función de Kabuki.",maps:true},
      {icon:"🚇",type:"METRO · MARUNOUCHI LINE",title:"Ginza → Shinjuku",route:"Tokyo Metro Marunouchi Line",text:"Después del teatro, coger la Marunouchi Line hacia Shinjuku.",details:["⏱️ ~15–20 min","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true},
      {icon:"🚆",type:"JR · YAMANOTE",title:"Shinjuku → Nippori",route:"JR Yamanote Line",text:"Al terminar en Shinjuku, volver a Nippori.",details:["⏱️ ~20–25 min","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true}
    ]},
    {date:"22 mayo",city:"Nikko",title:"🦌 Yanaka → Asakusa → Tobu-Nikko → Chuzenji → Kegon → Tokio",summary:"Día con reserva: Limited Express Tobu · bus en Nikko",items:[
      {icon:"🚆",type:"JR · YAMANOTE",title:"Nippori → Ueno",route:"JR Yamanote Line",text:"Desde Nippori, coger la Yamanote hasta Ueno.",details:["⏱️ ~4–5 min","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true},
      {icon:"🚇",type:"METRO · GINZA LINE",title:"Ueno → Asakusa",route:"Tokyo Metro Ginza Line",text:"Desde Ueno, coger la Ginza Line hasta Asakusa y caminar hasta Tobu Asakusa.",details:["⏱️ ~5 min","🎟️ Sin reserva","💳 Suica / PASMO","⚠️ Tobu Asakusa y Tokyo Metro Asakusa son estaciones distintas, aunque están conectadas andando"],maps:true},
      {icon:"🚆",type:"LIMITED EXPRESS · RESERVAR",title:"Tobu Asakusa → Tobu-Nikko",route:"Tobu Railway · SPACIA / Revaty",text:"Coger el Limited Express reservado desde Tobu Asakusa hasta Tobu-Nikko.",details:["⏱️ ~1 h 50 min–2 h","💺 Asiento reservado","🎟️ Tarifa normal + suplemento Limited Express","📅 Venta: desde las 09:00 del mes anterior","📌 Para el 22/05/2027: aproximadamente 22/04/2027 a las 09:00 JST"],note:"⭐ Este es el transporte del viaje que sí conviene reservar con antelación.",maps:true},
      {icon:"🚌",type:"BUS TOBU",title:"Tobu-Nikko → Chuzenji Onsen",route:"Tobu Bus",text:"Desde Tobu-Nikko Station, coger el autobús hacia Chuzenji Onsen.",details:["⏱️ ~50 min","🎟️ Sin reserva","💳 Nikko Pass si finalmente lo compráis"],maps:true},
      {icon:"🚌",type:"BUS TOBU",title:"Kegon Falls → Tobu-Nikko",route:"Tobu Bus",text:"Después de visitar Kegon Falls, volver en autobús a Tobu-Nikko Station.",details:["⏱️ ~50 min","🎟️ Sin reserva","💳 Nikko Pass si finalmente lo compráis"],maps:true},
      {icon:"🚆",type:"LIMITED EXPRESS · RESERVAR",title:"Tobu-Nikko → Asakusa",route:"Tobu Railway · Limited Express",text:"Regreso a Asakusa con el Limited Express reservado.",details:["💺 Asiento reservado","🎟️ Tarifa normal + suplemento Limited Express","📌 Reservar la vuelta junto con la ida"],maps:true}
    ]},
    {date:"23 mayo",city:"Hakone",title:"🚆 Tokio → Hakone",summary:"Traslado pendiente de concretar hasta Fukuzumiro",items:[
      {icon:"🚆",type:"PENDIENTE",title:"Yanaka → Fukuzumiro",route:"Tokio → Hakone",text:"El itinerario indica traslado a Hakone, pero todavía no hemos definido aquí el tren concreto, precio ni reserva.",details:["🏨 Destino: Fukuzumiro · Tounosawa, Hakone","📅 23 mayo 2027","🔎 Falta concretar ruta, horarios, reserva y coste"]}
    ]}
  ];

  const transportMaps = {
    "Narita → Nippori · Keisei Skyliner": ["Narita Airport Terminal 1 Station, Narita, Chiba, Japan", "Nippori Station · 2 Chome Nishinippori, Arakawa City, Tokyo, Japan"],
    "Nippori → alojamiento": ["Nippori Station · 2 Chome Nishinippori, Arakawa City, Tokyo, Japan", "Yanaka, Taito City, Tokyo, Japan"],
    "Nippori → Ueno": ["Nippori Station · 2 Chome Nishinippori, Arakawa City, Tokyo, Japan", "Ueno Station · 3-19-6 Higashiueno, Taito City, Tokyo, Japan"],
    "Ueno → Asakusa": ["Ueno Station · 3-19-6 Higashiueno, Taito City, Tokyo, Japan", "Tokyo Metro Asakusa Station (Ginza Line) · 1-1-3 Asakusa, Taito City, Tokyo, Japan"],
    "Asakusa → Ueno": ["Tokyo Metro Asakusa Station (Ginza Line) · 1-1-3 Asakusa, Taito City, Tokyo, Japan", "Ueno Station · 3-19-6 Higashiueno, Taito City, Tokyo, Japan"],
    "Ueno → Akihabara": ["Ueno Station · 3-19-6 Higashiueno, Taito City, Tokyo, Japan", "Akihabara Station · Sotokanda, Chiyoda City, Tokyo, Japan"],
    "Akihabara → Nippori": ["Akihabara Station · Sotokanda, Chiyoda City, Tokyo, Japan", "Nippori Station · 2 Chome Nishinippori, Arakawa City, Tokyo, Japan"],
    "Nippori → Shimbashi": ["Nippori Station · 2 Chome Nishinippori, Arakawa City, Tokyo, Japan", "Shimbashi Station · 2-17 Shinbashi, Minato City, Tokyo, Japan"],
    "Shimbashi → Shijo-mae": ["Shimbashi Station · 2-17 Shinbashi, Minato City, Tokyo, Japan", "Shijo-mae Station · 6-3 Toyosu, Koto City, Tokyo, Japan"],
    "Acceso a la subasta de Toyosu": ["Shijo-mae Station · 6-3 Toyosu, Koto City, Tokyo, Japan", "Toyosu Market Tuna Auction Observation Platform, Tokyo"],
    "Shijo-mae → Daiba": ["Shijo-mae Station · 6-3 Toyosu, Koto City, Tokyo, Japan", "Daiba Station · Daiba, Minato City, Tokyo, Japan"],
    "Odaiba → Shibuya": ["Tokyo Teleport Station · 1-2 Aomi, Koto City, Tokyo, Japan", "Shibuya Station · 2-21-1 Shibuya, Shibuya City, Tokyo, Japan"],
    "Shibuya → alojamiento": ["Shibuya Station · 2-21-1 Shibuya, Shibuya City, Tokyo, Japan", "Yanaka, Taito City, Tokyo, Japan"],
    "Nippori → Harajuku": ["Nippori Station · 2 Chome Nishinippori, Arakawa City, Tokyo, Japan", "JR Harajuku Station · 1 Jingumae, Shibuya City, Tokyo, Japan"],
    "Meiji Jingu → Harajuku → Omotesando": ["Meiji Jingu, Tokyo", "Omotesando, Tokyo"],
    "Omotesando → Ginza / Kabuki-za": ["Omote-sando Station, Tokyo", "Kabukiza Theatre, Tokyo"],
    "Ginza → Shinjuku": ["Ginza Station · 4-1-2 Ginza, Chuo City, Tokyo, Japan", "Shinjuku Station · Shinjuku, Tokyo, Japan"],
    "Shinjuku → Nippori": ["Shinjuku Station · Shinjuku, Tokyo, Japan", "Nippori Station · 2 Chome Nishinippori, Arakawa City, Tokyo, Japan"],
    "Asakusa → Tobu-Nikko": ["Tobu Asakusa Station · 1-4-1 Hanakawado, Taito City, Tokyo, Japan", "Tobu-Nikko Station · 4-3 Matsubaracho, Nikko, Tochigi, Japan"],
    "Nikko Pass All Area": ["Tobu Asakusa Station · 1-4-1 Hanakawado, Taito City, Tokyo, Japan", "Tobu-Nikko Station · 4-3 Matsubaracho, Nikko, Tochigi, Japan"],
    "Tobu-Nikko → Chuzenji Onsen": ["Tobu-Nikko Station · 4-3 Matsubaracho, Nikko, Tochigi, Japan", "Chuzenji Onsen Bus Stop, Nikko, Tochigi, Japan"],
    "Chuzenji → Kegon Falls": ["Chuzenji Onsen Bus Stop, Nikko, Tochigi, Japan", "Kegon Falls, Nikko, Tochigi, Japan"],
    "Kegon Falls → Tobu-Nikko": ["Kegon Falls, Nikko, Tochigi, Japan", "Tobu-Nikko Station · 4-3 Matsubaracho, Nikko, Tochigi, Japan"],
    "Tobu-Nikko → Asakusa": ["Tobu-Nikko Station · 4-3 Matsubaracho, Nikko, Tochigi, Japan", "Tobu Asakusa Station · 1-4-1 Hanakawado, Taito City, Tokyo, Japan"],
    "Traslado Yanaka → Fukuzumiro": ["Yanaka, Taito City, Tokyo", "Fukuzumiro, Tounosawa, Hakone"]
  };
  function mapsUrl(place){ return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`; }
  function mapsButtons(t){
    const pts=transportMaps[t.title];
    if(!pts) return "";
    return `<div class="transport-maps"><span class="transport-maps-label">📍 Google Maps</span><a class="map-link" href="${mapsUrl(pts[0])}" target="_blank" rel="noopener">🚉 Salida · ${pts[0]}</a><a class="map-link" href="${mapsUrl(pts[1])}" target="_blank" rel="noopener">📍 Llegada · ${pts[1]}</a></div>`;
  }

  function transportDetailHTML(t){
    return `<div class="transport-detail-inner">
      <div class="transport-detail-top"><div><div class="itinerary-type">${t.type}</div><h3>${t.title}</h3><div class="muted">${t.route}</div></div><div class="transport-detail-icon">${t.icon}</div></div>
      <p class="transport-detail-text">${t.text}</p>
      ${t.details?`<div class="transport-details">${t.details.map(x=>`<div>${x}</div>`).join("")}</div>`:""}
      ${t.note?`<div class="itinerary-note">${t.note}</div>`:""}${mapsButtons(t)}
    </div>`;
  }
  function renderTransportDay(d,di){
    const cards=d.items.map((x,i)=>`<button class="transport-choice ${i===0?'selected':''}" type="button" data-day="${di}" data-step="${i}"><span class="transport-choice-num">${i+1}</span><span class="transport-choice-icon">${x.icon}</span><strong>${x.title}</strong><small>${x.type}</small></button>`).join("");
    const first={...d.items[0],step:1};
    return `<article class="transport-day"><button class="transport-day-head" type="button" aria-expanded="false"><div class="transport-day-main"><span class="transport-day-date">${d.date}</span><span class="transport-day-city">${d.city}</span><h2>${d.title}</h2><p>${d.summary}</p></div><div class="transport-day-meta"><span class="transport-count">${d.items.length} transportes</span><span class="transport-day-chevron">⌄</span></div></button><div class="transport-day-body"><div class="transport-workspace"><div class="transport-choice-panel"><div class="transport-choice-label">🚆 DESPLAZAMIENTOS</div><div class="transport-choice-grid">${cards}</div></div><div class="transport-detail-panel" data-day-detail="${di}">${transportDetailHTML(first)}</div></div></div></article>`;
  }
  const transportList=document.getElementById("transportList");
  if(transportList){
    transportList.innerHTML=transportPlan.map(renderTransportDay).join("");
    transportList.querySelectorAll(".transport-day-head").forEach(head=>{
      head.addEventListener("click",()=>{
        const day=head.parentElement;
        const open=day.classList.toggle("open");
        head.setAttribute("aria-expanded",open?"true":"false");
      });
    });
    transportList.querySelectorAll(".transport-choice").forEach(choice=>{
      choice.addEventListener("click",()=>{
        const di=Number(choice.dataset.day), si=Number(choice.dataset.step);
        const day=choice.closest(".transport-day");
        day.querySelectorAll(".transport-choice").forEach(c=>c.classList.remove("selected"));
        choice.classList.add("selected");
        const panel=day.querySelector("[data-day-detail]");
        panel.innerHTML=transportDetailHTML({...transportPlan[di].items[si],step:si+1});
      });
    });
  }

  const tokyoPlan = {
    "18": {
      title:"Llegada + Yanaka + primera toma de contacto",
      intro:"Día pensado para aclimataros, instalaros y disfrutar del barrio donde os alojáis. No meter actividades grandes.",
      stops:[
        {time:"15:10",icon:"✈️",type:"LLEGADA",title:"Narita",text:"Llegada al aeropuerto de Narita. Tras inmigración y equipaje, comienzo del traslado hacia Yanaka."},
        {time:"17:30–18:30",icon:"🏠",type:"ALOJAMIENTO",title:"Llegada a Yanaka",text:"Llegar al alojamiento, dejar las maletas y descansar un poco."},
        {time:"18:30–20:30",icon:"🚶",type:"ZONA",title:"Yanaka Ginza + Yanaka",text:"Paseo por Yanaka Ginza, callejuelas tradicionales y pequeños templos del barrio. Cena por la zona.",tags:["Paseo","Barrio tradicional","Cena"]}
      ],
      note:"🎯 Objetivo del día: aclimataros y empezar Japón sin prisas, disfrutando de vuestro propio barrio."
    },
    "19": {
      title:"Asakusa + Ueno + Akihabara",
      intro:"Día completo pero sin madrugón extremo. Combina el Tokio tradicional con parques, mercados y el Tokio tecnológico y de videojuegos.",
      stops:[
        {time:"08:30–11:30",icon:"⛩️",type:"TEMPLO + ZONA",title:"Asakusa",text:"Visitar Sensō-ji, pasando por Kaminarimon y Nakamise-dori. Recorrer las calles tradicionales de Asakusa y, si apetece, caminar junto al río Sumida.",tags:["Sensō-ji","Kaminarimon","Nakamise-dori","Tokio tradicional"]},
        {time:"11:30–13:00",icon:"🌳",type:"PARQUE + MERCADO",title:"Ueno",text:"Paseo por el Parque de Ueno y visita a Ameyoko para conocer la zona comercial y de mercado."},
        {time:"13:00–14:30",icon:"🍜",type:"COMIDA",title:"Comida",text:"Comer por Ueno antes de continuar hacia Akihabara."},
        {time:"14:30–19:00",icon:"🎮",type:"ZONA + ACTIVIDADES",title:"Akihabara",text:"Tiempo amplio para explorar anime y manga, figuras, electrónica, Yodobashi, retro gaming, arcades y las tiendas que más os llamen la atención.",tags:["Electrónica","Videojuegos","Anime","Retro gaming","Arcades"]},
        {time:"19:00–20:00",icon:"🍜",type:"CENA",title:"Cena por Akihabara / Ueno",text:"Cena por la zona y regreso tranquilo al alojamiento. Aproximadamente a las 21:00, dormir."}
      ],
      note:"🎮 Día especialmente interesante para vosotros por la combinación de electrónica, videojuegos, anime y coleccionismo."
    },
    "20": {
      title:"Toyosu + Odaiba + Shibuya + noche de fiesta",
      intro:"El gran día de Tokio: madrugón para Toyosu, Tokio futurista en Odaiba, atardecer en Shibuya y fiesta por la noche. El jueves no hay madrugón y el viernes es Nikko.",
      stops:[
        {time:"05:00 aprox.",icon:"🐟",type:"MERCADO",title:"Toyosu",text:"Llegar muy temprano al Mercado de Toyosu. Si queréis intentar ver la subasta de atún, habrá que revisar las condiciones de acceso cuando se acerque 2027, porque pueden cambiar."},
        {time:"05:30–06:30",icon:"🐟",type:"ACTIVIDAD",title:"Subasta / observación",text:"Intento de acceso y observación de la subasta de atún, según las condiciones vigentes en la fecha del viaje."},
        {time:"06:30–08:00",icon:"🍣",type:"DESAYUNO",title:"Sushi en Toyosu",text:"Desayuno de sushi en la zona del mercado."},
        {time:"08:30–12:00",icon:"🌊",type:"ZONA + ACTIVIDADES",title:"Odaiba",text:"Recorrer la zona futurista de Odaiba: Gundam, DiverCity, Rainbow Bridge, Estatua de la Libertad, bahía y paseo en Yurikamome.",tags:["Gundam","DiverCity","Rainbow Bridge","Bahía","Yurikamome"]},
        {time:"12:00–13:00",icon:"🍜",type:"COMIDA",title:"Comida en Odaiba",text:"Comer antes de continuar la visita."},
        {time:"13:00–15:00",icon:"🌊",type:"ZONA",title:"Odaiba · continuación",text:"Terminar de recorrer la zona con calma antes de desplazarnos hacia Shibuya."},
        {time:"15:30",icon:"🚆",type:"TRASLADO",title:"Hacia Shibuya",text:"Desplazamiento en transporte público hacia Shibuya."},
        {time:"16:30–21:00",icon:"🌃",type:"ZONA + ACTIVIDAD",title:"Shibuya",text:"Visitar Shibuya SKY, Hachiko, Shibuya Crossing, Center Gai y Shibuya 109. Reservar tiempo para el mirador y, si encaja, verlo al atardecer.",tags:["Shibuya SKY","Hachiko","Scramble Crossing","Center Gai"]},
        {time:"21:00",icon:"🍜",type:"CENA",title:"Cena",text:"Cena por Shibuya."},
        {time:"23:00 →",icon:"🍻",type:"FIESTA",title:"Noche de fiesta en Shibuya",text:"Salir por Shibuya y conocer su ambiente nocturno. No se fija hora de vuelta. La idea es disfrutar de la noche sin añadir también Shinjuku para conocer después dos ambientes diferentes."}
      ],
      note:"🎉 Este es EL DÍA DE LA FIESTA. El jueves será tranquilo y el viernes toca Nikko, así que evitamos colocar la fiesta la noche anterior a la excursión."
    },
    "21": {
      title:"Día tranquilo + teatro japonés + Shinjuku",
      intro:"Después de la noche anterior no hay madrugón. La mañana empieza tranquila y por la tarde se intenta encajar una función de Kabuki.",
      stops:[
        {time:"10:30–11:00",icon:"☕",type:"INICIO",title:"Salida tranquila",text:"Salir del alojamiento sin madrugar después de la noche de fiesta."},
        {time:"11:30–12:45",icon:"⛩️",type:"SANTUARIO",title:"Meiji Jingu",text:"Visitar el santuario sintoísta Meiji Jingu, situado dentro de un gran bosque y muy cerca de Harajuku."},
        {time:"12:45–14:00",icon:"🛍️",type:"ZONA",title:"Harajuku",text:"Recorrer Takeshita Street, calles secundarias y Cat Street."},
        {time:"14:00–15:00",icon:"🍜",type:"COMIDA",title:"Comida",text:"Comer por la zona."},
        {time:"15:00–16:15",icon:"🚶",type:"ZONA",title:"Omotesando + Aoyama",text:"Paseo tranquilo por Omotesando, Aoyama y Cat Street."},
        {time:"16:30–17:00",icon:"🎭",type:"ACTIVIDAD · TEATRO",title:"Kabuki-za · Ginza",text:"Intentar encajar una función de Kabuki de tarde. Buscar una sesión con subtítulos/captioning en inglés si están disponibles y confirmar horarios y entradas cuando se acerque el viaje."},
        {time:"19:30–20:00",icon:"🚆",type:"TRASLADO",title:"Ginza → Shinjuku",text:"Traslado hacia Shinjuku después del teatro."},
        {time:"20:00–23:00",icon:"🌃",type:"ZONA + NOCHE",title:"Shinjuku",text:"Recorrer Kabukicho, ver Godzilla y los neones, pasar por Omoide Yokocho y conocer Golden Gai. Cenar y tomar algo, pero sin convertirlo en otra noche de fiesta.",tags:["Kabukicho","Godzilla","Omoide Yokocho","Golden Gai"]},
        {time:"23:00–00:00",icon:"🏠",type:"REGRESO",title:"Alojamiento",text:"Volver al hotel y descansar antes de la excursión a Nikko."}
      ],
      note:"🎭 El teatro japonés queda como actividad a confirmar: el horario y las opciones de Kabuki para mayo de 2027 se revisarán cuando se acerque la fecha."
    },
    "22": {
      title:"Excursión a Nikko",
      intro:"Día de excursión desde Tokio. Se aprovecha la mañana para la zona histórica y por la tarde se intenta llegar al Lago Chuzenji y Kegon Falls.",
      stops:[
        {time:"06:30 aprox.",icon:"🚆",type:"TRASLADO",title:"Salida de Yanaka",text:"Salir temprano del alojamiento para comenzar el viaje a Nikko."},
        {time:"08:30–09:00",icon:"📍",type:"LLEGADA",title:"Nikko",text:"Llegada aproximada a Nikko y comienzo de la visita."},
        {time:"09:00–12:00",icon:"⛩️",type:"TEMPLOS + ZONA HISTÓRICA",title:"Toshogu + zona histórica",text:"Visitar Toshogu y, según el tiempo disponible, Rinnoji y/o Futarasan. Completar con Shinkyo y el entorno histórico de Nikko.",tags:["Toshogu","Rinnoji","Futarasan","Shinkyo"]},
        {time:"12:00–13:00",icon:"🍜",type:"COMIDA",title:"Comida en Nikko",text:"Parada para comer antes de continuar hacia la zona del lago."},
        {time:"13:00",icon:"🚌",type:"TRASLADO",title:"Bus hacia Chuzenji",text:"Tomar el autobús hacia la zona del Lago Chuzenji."},
        {time:"14:00",icon:"🌊",type:"NATURALEZA",title:"Lago Chuzenji",text:"Paseo y tiempo para disfrutar del lago y del paisaje de montaña."},
        {time:"15:00",icon:"💦",type:"NATURALEZA",title:"Kegon Falls",text:"Visitar la cascada de Kegon Falls."},
        {time:"16:00",icon:"🚆",type:"REGRESO",title:"Comienzo del regreso",text:"Empezar el regreso hacia Tokio para llegar aproximadamente entre las 18:30 y las 19:30."},
        {time:"19:30 aprox.",icon:"🍜",type:"NOCHE",title:"Tokio",text:"Cena tranquila y dormir después de la excursión."}
      ],
      note:"🗻 Es un día largo: conviene llevar calzado cómodo y reservar margen para los desplazamientos y los horarios de transporte."
    }
  };


  const itineraryRoutes = {
    "18": [
      {label:"Ruta completa · Narita → Yanaka → Yanaka Ginza", origin:"Narita International Airport", waypoints:["Yanaka, Taito City, Tokyo"], destination:"Yanaka Ginza Shopping Street, Tokyo", mode:"transit"}
    ],
    "19": [
      {label:"Ruta 1 · Yanaka → Asakusa → Ueno → Akihabara", origin:"Yanaka, Taito City, Tokyo", waypoints:["Asakusa Station, Taito City, Tokyo","Ueno Station, Taito City, Tokyo"], destination:"Akihabara Station, Tokyo", mode:"transit"},
      {label:"Regreso · Akihabara → Yanaka", origin:"Akihabara Station, Tokyo", waypoints:[], destination:"Yanaka, Taito City, Tokyo", mode:"transit"}
    ],
    "20": [
      {label:"Ruta 1 · Yanaka → Toyosu → Odaiba → Shibuya", origin:"Yanaka, Taito City, Tokyo", waypoints:["Toyosu Market, Tokyo","Daiba Station, Tokyo"], destination:"Shibuya Station, Tokyo", mode:"transit"},
      {label:"Noche · Shibuya → Yanaka", origin:"Shibuya Station, Tokyo", waypoints:[], destination:"Yanaka, Taito City, Tokyo", mode:"transit"}
    ],
    "21": [
      {label:"Ruta 1 · Yanaka → Meiji Jingu → Harajuku → Omotesando", origin:"Yanaka, Taito City, Tokyo", waypoints:["Meiji Jingu, Tokyo","Harajuku Station, Tokyo"], destination:"Omotesando Station, Tokyo", mode:"transit"},
      {label:"Ruta 2 · Omotesando → Kabuki-za → Shinjuku → Yanaka", origin:"Omotesando Station, Tokyo", waypoints:["Kabuki-za, Tokyo","Shinjuku Station, Tokyo"], destination:"Yanaka, Taito City, Tokyo", mode:"transit"}
    ],
    "22": [
      {label:"Ruta 1 · Yanaka → Asakusa → Tobu-Nikko", origin:"Yanaka, Taito City, Tokyo", waypoints:["Asakusa Station, Taito City, Tokyo"], destination:"Tobu-Nikko Station, Nikko", mode:"transit"},
      {label:"Ruta 2 · Tobu-Nikko → Chuzenji → Kegon Falls", origin:"Tobu-Nikko Station, Nikko", waypoints:["Chuzenji Onsen, Nikko"], destination:"Kegon Falls, Nikko", mode:"transit"},
      {label:"Regreso · Kegon Falls → Tobu-Nikko → Yanaka", origin:"Kegon Falls, Nikko", waypoints:["Tobu-Nikko Station, Nikko"], destination:"Yanaka, Taito City, Tokyo", mode:"transit"}
    ]
  };

  function mapsRouteUrl(route){
    const params=new URLSearchParams();
    params.set("api","1");
    params.set("origin",route.origin);
    params.set("destination",route.destination);
    params.set("travelmode",route.mode||"transit");
    if(route.waypoints?.length) params.set("waypoints",route.waypoints.join("|"));
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }

  function renderItineraryRoutes(day){
    const routes=itineraryRoutes[day]; if(!routes) return "";
    return `<div class="itinerary-routes"><div class="itinerary-routes-head"><div><div class="itinerary-type">RUTA EN GOOGLE MAPS</div><h4>🗺️ Abrir el recorrido del día</h4></div><span class="muted">${routes.length} ruta${routes.length>1?"s":""}</span></div><div class="itinerary-route-list">${routes.map(r=>`<a class="itinerary-route-btn" href="${mapsRouteUrl(r)}" target="_blank" rel="noopener">🧭 ${r.label}<span>↗</span></a>`).join("")}</div><div class="itinerary-route-note">Google Maps abrirá la ruta con los puntos en el orden indicado. Hemos dividido los días largos en varios tramos para que funcione también en móvil.</div></div>`;
  }

  function renderItineraryDay(d,i){
    const detail=tokyoPlan[d[0]];
    if(!detail) return `<article class="item itinerary-day"><div class="item-head itinerary-day-head"><div class="itinerary-day-main"><span class="itinerary-day-date">${d[0]} MAYO</span><span class="itinerary-day-city">${d[1]}</span><h3>📍 ${d[2]}</h3><div class="muted">Pulsa para desplegar el itinerario completo</div></div><span class="itinerary-day-chevron">⌄</span></div><div class="item-body"><p class="muted">Este día es editable. Aquí iremos añadiendo horarios, reservas, transporte, restaurantes y enlaces a mapas.</p></div></article>`;
    return `<article class="item itinerary-day"><div class="item-head itinerary-day-head"><div class="itinerary-day-main"><span class="itinerary-day-date">${d[0]} MAYO</span><span class="itinerary-day-city">${d[1]}</span><h3>📍 ${detail.title}</h3><div class="muted">${detail.intro}</div></div><span class="itinerary-day-chevron">⌄</span></div><div class="item-body"><div class="itinerary-timeline">${detail.stops.map(s=>`<div class="itinerary-stop"><div class="itinerary-time">${s.time}</div><div class="itinerary-dot">${s.icon}</div><div class="itinerary-content"><div class="itinerary-type">${s.type}</div><h4>${s.title}</h4><p>${s.text}</p>${s.tags?`<div class="chips">${s.tags.map(t=>`<span class="chip">${t}</span>`).join("")}</div>`:""}</div></div>`).join("")}</div><div class="itinerary-note">${detail.note}</div></div></article>`;
  }
  $("#itineraryList").innerHTML=TRIP.days.map(renderItineraryDay).join("");

  // Desplegable de cada día: usamos delegación para que funcione de forma robusta
  // incluso si el contenido del itinerario se vuelve a renderizar.
  const itineraryList = $("#itineraryList");
  itineraryList.addEventListener("click", e=>{
    const head=e.target.closest(".itinerary-day-head");
    if(!head || !itineraryList.contains(head)) return;
    const card=head.closest(".itinerary-day");
    if(!card) return;
    const open=card.classList.toggle("open");
    head.setAttribute("aria-expanded",String(open));
  });
  itineraryList.addEventListener("keydown", e=>{
    if(e.key!=="Enter" && e.key!==" ") return;
    const head=e.target.closest(".itinerary-day-head");
    if(!head || !itineraryList.contains(head)) return;
    e.preventDefault();
    head.click();
  });
  document.querySelectorAll(".itinerary-day-head").forEach(head=>{
    head.setAttribute("role","button");
    head.setAttribute("tabindex","0");
    head.setAttribute("aria-expanded","false");
  });
  const grid=$("#calendar"), detail=$("#calendarDetail"); let selected="18";
  function renderCal(){grid.innerHTML="";TRIP.days.forEach(d=>{const b=document.createElement("button");const city=d[1].split(" → ")[0];b.className="calday"+(d[0]===selected?" selected":"");b.style.backgroundImage=`linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.64)),url("${CITY_IMAGES[city]||CITY_IMAGES.Tokio}")`;b.innerHTML=`<b>${d[0]}</b><span>${d[1]}</span>`;b.onclick=()=>{selected=d[0];renderCal();renderDetail()};grid.appendChild(b)})}
  function renderDetail(){const d=TRIP.days.find(x=>x[0]===selected);detail.innerHTML=`<div class="panel"><div class="eyebrow">${selected} MAYO 2027</div><h2>📍 ${d[1]}</h2><div class="event"><strong>PLAN</strong>${d[2]}</div><div class="muted" style="margin-top:12px">Este calendario es la versión inicial basada en el itinerario facilitado. Iremos modificando cada día contigo.</div></div>`}
  renderCal();renderDetail();
  document.querySelectorAll(".flight-group-head").forEach(head=>{
    head.setAttribute("role","button");
    head.setAttribute("tabindex","0");
    head.setAttribute("aria-expanded","false");
    const toggle=()=>{const group=head.parentElement;const open=group.classList.toggle("open");head.setAttribute("aria-expanded",String(open));};
    head.onclick=toggle;
    head.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle();}};
  });
  document.querySelectorAll(".item-head:not(.itinerary-day-head)").forEach(h=>h.onclick=()=>h.parentElement.classList.toggle("open"));
  document.querySelectorAll("#nav button[data-section]").forEach(b=>b.onclick=()=>{document.querySelectorAll(".section").forEach(s=>s.classList.remove("active-section"));$("#"+b.dataset.section).classList.add("active-section");document.querySelectorAll("#nav button[data-section]").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelector(".sidebar")?.classList.remove("open")});
  function goToSection(sectionId){
    document.querySelectorAll(".section").forEach(s=>s.classList.remove("active-section"));
    const target=document.getElementById(sectionId);
    if(target) target.classList.add("active-section");
    document.querySelectorAll("#nav button[data-section]").forEach(x=>{
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
  $("#closeMenuBtn")?.addEventListener("click",()=>$(".sidebar").classList.remove("open"));
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
    chinaClock: fmtTime("Asia/Shanghai", true).format(now),
    spainDate: fmtDate("Europe/Madrid").format(now),
    japanDate: fmtDate("Asia/Tokyo").format(now),
    chinaDate: fmtDate("Asia/Shanghai").format(now)
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

function initHeroClock(){
  const button = document.getElementById('heroClock');
  if(!button) return;
  const states = [
    {flag:'🇪🇸', label:'ESPAÑA', city:'Madrid', tz:'Europe/Madrid'},
    {flag:'🇯🇵', label:'JAPÓN', city:'Tokio', tz:'Asia/Tokyo'},
    {flag:'✈️', label:'CHINA · ESCALA', city:'Chengdu · Pekín', tz:'Asia/Shanghai'}
  ];
  let current = 0;
  const flag=document.getElementById('heroClockFlag');
  const label=document.getElementById('heroClockLabel');
  const city=document.getElementById('heroClockCity');
  const time=document.getElementById('heroClockTime');
  const date=document.getElementById('heroClockDate');
  const formatTime=(tz)=>new Intl.DateTimeFormat('es-ES',{timeZone:tz,hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());
  const formatDate=(tz)=>new Intl.DateTimeFormat('es-ES',{timeZone:tz,weekday:'short',day:'2-digit',month:'short'}).format(new Date());
  function render(){
    const s=states[current];
    flag.textContent=s.flag; label.textContent=s.label; city.textContent=s.city;
    time.textContent=formatTime(s.tz); date.textContent=formatDate(s.tz);
    button.setAttribute('aria-label',`Cambiar reloj. Ahora: ${s.label}, ${s.city}`);
  }
  button.addEventListener('click',()=>{ current=(current+1)%states.length; render(); });
  render();
  setInterval(()=>{ time.textContent=formatTime(states[current].tz); date.textContent=formatDate(states[current].tz); },1000);
}
initHeroClock();



function initPacking(){
  const root=document.getElementById('packingList');
  if(!root) return;
  const categories=[
    {icon:'👕',title:'Ropa',items:['7–8 camisetas','2–3 pantalones largos','1–2 pantalones cortos','8–10 mudas de ropa interior','8–10 pares de calcetines','1 sudadera o chaqueta fina','1 chaqueta impermeable o cortavientos','Pijama','Zapatillas cómodas para caminar','Segundo calzado opcional','Chanclas/sandalias para alojamiento y onsen','Bolsa para ropa sucia','Gafas de sol','Gorra o sombrero']},
    {icon:'🧴',title:'Higiene',items:['Cepillo de dientes','Pasta de dientes','Desodorante','Champú','Gel','Crema hidratante','Protector solar','Afeitado','Peine','Toallitas','Pañuelos','Neceser de viaje','Medicación habitual','Botiquín básico','Tapones para los oídos']},
    {icon:'🔌',title:'Útiles y electrónica',items:['Móvil','Cargador del móvil','Cable de carga','Powerbank','Adaptador de enchufe para Japón','Regleta pequeña o cargador múltiple','Cargador con varios puertos USB','Auriculares','Smartwatch y cargador','Cámara, baterías y cargador (si lleváis)','AirTag o localizador de equipaje','Cables de repuesto','Bolsa para organizar cables','eSIM/SIM preparada','Enchufe/adaptador adicional para la habitación']},
    {icon:'🎒',title:'Para el día a día',items:['Mochila pequeña','Botella reutilizable','Paraguas plegable','Bolsa plegable para compras','Monedero pequeño','DNI','Pasaporte','Copias de documentación importante','Toalla pequeña','Bolsas tipo zip','Bolsa impermeable pequeña','Candado para maleta']},
    {icon:'💊',title:'Botiquín',items:['Paracetamol','Ibuprofeno','Medicación personal','Tiritas','Compeed o protección para ampollas','Antiséptico','Antidiarreico','Sales de rehidratación','Medicación para mareo, si la necesitáis']},
    {icon:'✈️',title:'Equipaje de mano',items:['Pasaporte','Billetes y reservas','Seguro de viaje','Móvil','Powerbank','Cargadores','Auriculares','Medicación','Una muda','Cepillo de dientes','Documentación','Algo para el vuelo','Bolsa pequeña para líquidos']},
    {icon:'🗾',title:'Extras para Japón',items:['Bolsa plegable para compras','Monedero para monedas','Calzado muy cómodo','Calcetines fáciles de quitar','Chanclas para el onsen','Bolsa para ropa sucia','Paraguas plegable']}
  ];
  const key='jp-packing-v1';
  let checked={}; try{checked=JSON.parse(localStorage.getItem(key)||'{}')||{}}catch(e){checked={}};
  const slug=(cat,item)=>cat+'::'+item;
  root.innerHTML=categories.map((cat,ci)=>{
    const items=cat.items.map((item,ii)=>{
      const id='pack-'+ci+'-'+ii;
      const done=!!checked[slug(cat.title,item)];
      return `<label class="packing-item"><input type="checkbox" id="${id}" data-cat="${ci}" data-key="${encodeURIComponent(slug(cat.title,item))}" ${done?'checked':''}><span>${item}</span></label>`;
    }).join('');
    let tip='';
    if(cat.title==='Extras para Japón') tip='<div class="packing-tip">♨️ Para Fukuzumiro y el onsen, llevad chanclas y ropa cómoda. Normalmente el ryokan proporciona yukata.</div>';
    if(cat.title==='Útiles y electrónica') tip='<div class="packing-tip">🔌 En Japón se usa 100 V y enchufe tipo A/B. Revisad que vuestros cargadores indiquen 100–240 V; en ese caso normalmente solo necesitaréis adaptador físico.</div>';
    if(cat.title==='Equipaje de mano') tip='<div class="packing-tip">⚠️ Las powerbanks deben ir en el equipaje de mano, no en la maleta facturada.</div>';
    return `<article class="packing-category"><h2>${cat.icon} ${cat.title}</h2><div class="category-count" id="pack-count-${ci}">0 / ${cat.items.length} preparados</div><div class="packing-items">${items}</div>${tip}</article>`;
  }).join('');
  function update(){
    let total=0,done=0;
    categories.forEach((cat,ci)=>{const inputs=[...root.querySelectorAll(`input[data-cat="${ci}"]`)]; const d=inputs.filter(x=>x.checked).length; total+=inputs.length;done+=d; const el=document.getElementById(`pack-count-${ci}`);if(el)el.textContent=`${d} / ${inputs.length} preparados`;});
    const pct=total?Math.round(done/total*100):0;
    const t=document.getElementById('packingProgressText'); const pc=document.getElementById('packingProgressPct'); const bar=document.getElementById('packingProgressBar');
    if(t)t.textContent=`${done} / ${total} preparados`; if(pc)pc.textContent=`${pct}%`; if(bar)bar.style.width=pct+'%';
  }
  root.querySelectorAll('input[type="checkbox"]').forEach(input=>input.addEventListener('change',()=>{const k=decodeURIComponent(input.dataset.key);checked[k]=input.checked;localStorage.setItem(key,JSON.stringify(checked));update();}));
  update();
}
initPacking();

function initTheme(){
  const button=document.getElementById('themeToggle');
  if(!button) return;
  const saved=localStorage.getItem('japanTripTheme');
  const apply=(dark)=>{
    document.body.classList.toggle('dark-mode',dark);
    button.textContent=dark?'☀️ Modo día':'🌙 Modo noche';
    button.setAttribute('aria-label',dark?'Cambiar a modo día':'Cambiar a modo noche');
    localStorage.setItem('japanTripTheme',dark?'dark':'light');
  };
  apply(saved==='dark');
  button.addEventListener('click',()=>apply(!document.body.classList.contains('dark-mode')));
}
initTheme();
