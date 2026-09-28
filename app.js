
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
    {date:"23 mayo",city:"Hakone",title:"🚆 Tokio → Hakone · Fukuzumiro",summary:"JR hasta Odawara · tren Hakone Tozan · llegada con margen para pasear y hacer check-in",items:[
      {icon:"🚆",type:"JR · YAMANOTE",title:"Nippori → Tokyo Station",route:"JR Yamanote Line",text:"Desde Nippori, ir en la línea JR Yamanote hasta Tokyo Station para enlazar con el Tokaido Shinkansen.",details:["⏱️ ~12 min","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true},
      {icon:"🚄",type:"TŌKAIDŌ SHINKANSEN",title:"Tokyo → Odawara",route:"Shinkansen hacia Odawara",text:"Tomar un Shinkansen que pare en Odawara. La duración y el servicio concreto se confirmarán cuando publiquen los horarios de mayo de 2027.",details:["⏱️ Aproximadamente 45 min, según servicio","💺 Asiento reservado recomendable para cuatro","🎟️ Billete aparte del Hakone Freepass"],note:"💡 Como alternativa, podéis ir desde Shinjuku en el Romancecar directo a Hakone-Yumoto; tarda alrededor de 1 h 30 min y tiene asientos reservados. Compararemos ambas opciones al cerrar horarios y precio.",maps:true},
      {icon:"🚃",type:"HAKONE TOZAN",title:"Odawara → Hakone-Yumoto",route:"Hakone Tozan Railway",text:"Desde Odawara, continuar en tren hasta Hakone-Yumoto. Desde allí, seguir a Fukuzumiro en el transporte local o en el minibús del alojamiento.",details:["⏱️ ~15 min hasta Hakone-Yumoto","🎟️ Sin reserva","🏨 Fukuzumiro · Tounosawa 74"],maps:true},
      {icon:"🚶",type:"ÚLTIMO TRAMO",title:"Hakone-Yumoto → Fukuzumiro",route:"Tounosawa",text:"El ryokan ofrece un minibús desde Hakone-Yumoto hacia Tounosawa o podéis coordinar taxi/otro transporte local. También acepta equipaje antes del check-in.",details:["🚌 Minibús del alojamiento: actualmente 200 ¥","🕐 Horarios publicados ahora: 09:08, 11:15 y 16:45; confirmar antes del viaje","🧳 Fukuzumiro acepta equipaje antes del check-in"],maps:true}
    ]},
    {date:"24 mayo",city:"Kioto",title:"🚄 Hakone → Kioto",summary:"Hakone-Yumoto → Odawara → Kioto · llegada y tarde libre",items:[
      {icon:"🚶",type:"SALIDA DEL RYOKAN",title:"Fukuzumiro → Hakone-Yumoto",route:"Tounosawa → Hakone-Yumoto",text:"Después del desayuno y el check-out, bajar a Hakone-Yumoto en el minibús del ryokan, taxi o transporte local y continuar a Odawara. El equipaje se puede enviar por adelantado a Kioto o llevarlo con vosotros; lo concretaremos más adelante.",details:["🏨 Check-out antes de las 10:00","🚌 Minibús del ryokan: tarifa y servicio vigentes por confirmar para 2027","🕐 Mañana flexible en Yumoto si salís con tiempo"],maps:true},
      {icon:"🚃",type:"HAKONE TOZAN",title:"Hakone-Yumoto → Odawara",route:"Hakone Tozan Railway",text:"Tomar el tren local desde Hakone-Yumoto hasta Odawara y enlazar allí con el Shinkansen a Kioto.",details:["⏱️ ~15 min","🎟️ Sin reserva"],maps:true},
      {icon:"🚄",type:"TŌKAIDŌ SHINKANSEN",title:"Odawara → Kyoto Station",route:"Tokaido Shinkansen",text:"Desde Odawara, tomar el Shinkansen hacia Kyoto. Al llegar, traslado al alojamiento en Minami-ku y check-in desde las 16:00.",details:["⏱️ Aproximadamente 2 h–2 h 20 min, según servicio","💺 Asiento reservado recomendable para cuatro","📅 Horario exacto por confirmar para mayo de 2027","🌆 Tarde libre y cena tranquila cerca del alojamiento"],maps:true},
      {icon:"🚇",type:"METRO KARASUMA LINE",title:"Kyoto Station → alojamiento de Kioto",route:"Kyoto → Kujo · Minami-ku",text:"Desde Kyoto Station, tomar Karasuma Line una parada hasta Kujo Station y caminar al alojamiento de Minami-ku. Si lleváis maletas grandes, un taxi puede ser más cómodo.",details:["🏨 Check-in disponible desde las 16:00","🧳 Si llegáis antes, preguntar por consigna o dejar el equipaje"],maps:true},
      {icon:"🚆",type:"METRO + PASEO A PIE",title:"Kioto · alojamiento → Gion y Pontocho",route:"Kujo → Gion → Pontocho → Kujo",text:"Desde Kujo, ir en metro/bus o taxi hacia Gion. Yasaka-jinja, Hanamikoji, el río Kamo y Pontocho se recorren a pie. Volver al alojamiento en transporte urbano o taxi según la hora.",details:["🚶 Recorrido Gion–Pontocho: principalmente a pie","🚌 Consultar ruta y paradas en Maps el mismo día","🌙 Si el transporte urbano ya terminó, usar taxi autorizado"],maps:true}
    ]},
    {date:"25 mayo",city:"Kioto",title:"⛩️ Kujo → Fushimi Inari → Higashiyama",summary:"Metro/JR + Keihan · trayectos locales con IC · sin reserva",items:[
      {icon:"🚇",type:"METRO + JR NARA LINE",title:"Alojamiento → Fushimi Inari",route:"Kujo → Kyoto Station → Inari",text:"Desde el alojamiento, caminar a Kujo Station y tomar la Karasuma Line una parada hasta Kyoto Station. Cambiar a JR Nara Line y bajar en Inari Station, junto a la entrada del santuario.",details:["⏱️ Aproximadamente 20–30 min puerta a puerta","🎟️ Billetes locales o Suica/PASMO/ICOCA","🔁 En Kyoto Station seguir los carteles JR Nara Line","🚶 La estación JR Inari queda frente al acceso principal"],maps:true},
      {icon:"🚆",type:"JR + KEIHAN",title:"Fushimi Inari → Kiyomizu-dera",route:"Inari → Tofukuji → Kiyomizu-Gojo",text:"Volver en JR Nara Line de Inari a Tofukuji y cambiar a Keihan Main Line hasta Kiyomizu-Gojo. Desde la estación hay que subir andando hasta el templo; también podéis tomar un bus local si preferís reducir la cuesta.",details:["⏱️ 30–45 min más la caminata en cuesta","🎟️ Sin reserva · IC card o billetes separados","🚶 Desde Kiyomizu-Gojo al templo: unos 20–25 min a pie cuesta arriba"],maps:true},
      {icon:"🚌",type:"A PIE / BUS LOCAL",title:"Higashiyama → Gion → alojamiento",route:"Sannenzaka · Ninenzaka · Yasaka · Kujo",text:"Hacer a pie el recorrido por Sannenzaka, Ninenzaka, Yasaka-no-tō y Maruyama Park. Desde Gion regresar a Kujo en bus urbano o taxi; consultar el destino del bus en la parada y usar IC card.",details:["🚶 El tramo turístico se disfruta mejor a pie","🚌 Bus urbano: tarifa y línea según la parada más cercana","🧭 Consultar Maps el mismo día por desvíos y tráfico"],maps:true}
    ]},
    {date:"26 mayo",city:"Kioto",title:"🎋 Kioto ↔ Arashiyama",summary:"Metro + JR Sagano Line · paseo a pie en Arashiyama",items:[
      {icon:"🚇",type:"METRO KARASUMA + JR SAGANO",title:"Kujo → Saga-Arashiyama",route:"Kujo → Kyoto Station → Saga-Arashiyama",text:"Caminar desde el alojamiento a Kujo Station y tomar la Karasuma Line una parada hasta Kyoto Station. Cambiar a JR Sagano Line (también llamada San-in Line) y bajar en Saga-Arashiyama.",details:["⏱️ Aproximadamente 35–45 min desde el alojamiento","🎟️ Sin reserva · IC card o billetes locales","📍 Saga-Arashiyama queda a pocos minutos andando del bosque y Tenryū-ji"],maps:true},
      {icon:"🚶",type:"A PIE",title:"Movimientos dentro de Arashiyama",route:"Bosque de bambú → Tenryū-ji → Togetsukyō",text:"Recorrer a pie el bosque, Tenryū-ji, el centro de Arashiyama y el puente Togetsukyō. No hace falta transporte local entre estos puntos.",details:["👟 Calzado cómodo","🕐 Reservar tiempo para las visitas interiores y jardines"],maps:true},
      {icon:"🚆",type:"JR SAGANO + METRO",title:"Saga-Arashiyama → Kujo",route:"Saga-Arashiyama → Kyoto Station → Kujo",text:"Volver en JR Sagano Line hasta Kyoto Station y enlazar con una parada de metro Karasuma Line hasta Kujo; completar el trayecto a pie al alojamiento.",details:["⏱️ Aproximadamente 35–45 min","🎟️ Sin reserva · IC card o billetes locales","⚠️ Revisar el último tren si alargáis la tarde"],maps:true}
    ]},
    {date:"27 mayo",city:"Nara",title:"🦌 Kioto ↔ Nara · excursión de día",summary:"JR Nara Line · recorrido principal a pie · vuelta a Kioto",items:[
      {icon:"🚇",type:"METRO + JR NARA LINE",title:"Kujo → JR Nara Station",route:"Kujo → Kyoto Station → Nara",text:"Caminar a Kujo Station, tomar la Karasuma Line una parada hasta Kyoto Station y cambiar a JR Nara Line. Elegid un tren rápido Miyakoji cuando el horario lo permita; los servicios locales tardan más.",details:["⏱️ Tren rápido: alrededor de 45 min desde Kyoto Station; añadir acceso al metro y esperas","🎟️ Sin reserva · IC card válida en los servicios compatibles","📍 Desde JR Nara Station al parque hay unos 20 min andando","🚌 Bus local opcional desde la estación si queréis ahorrar caminata"],maps:true},
      {icon:"🚶",type:"A PIE · NARA PARK",title:"Nara Park → Tōdaiji → Kasuga Taisha → Kōfuku-ji → Naramachi",route:"Ruta peatonal en el orden del itinerario",text:"La ruta principal se hace a pie por el parque y sus caminos. Podéis tomar un bus local entre la zona de Kasuga y el centro si las piernas lo agradecen; comprobad paradas y horario allí.",details:["👟 Jornada larga: llevar agua y calzado cómodo","🦌 Respetar las indicaciones junto a los ciervos","🚌 Bus opcional, pago con IC o billete según servicio"],maps:true},
      {icon:"🚆",type:"JR NARA LINE + METRO",title:"JR Nara Station → Kioto",route:"Nara → Kyoto Station → Kujo",text:"Regresar desde JR Nara en JR Nara Line hasta Kyoto Station y enlazar con Karasuma Line hasta Kujo. Si termináis cerca de Kintetsu-Nara, caminad hasta JR Nara o revisad el tren Kintetsu hacia Kyoto antes de elegir.",details:["⏱️ Contar aproximadamente 50–70 min más esperas y enlace","🎟️ Sin reserva · IC card o billete","🕐 No apurar el último servicio; consultar el horario de vuelta al llegar"],maps:true}
    ]},
    {date:"28 mayo",city:"Kioto",title:"✨ Kinkaku-ji → Ginkaku-ji → Camino del Filósofo",summary:"Autobús/metro entre zonas · a pie en el este de Kioto",items:[
      {icon:"🚌",type:"METRO + BUS URBANO",title:"Kujo → Kinkaku-ji",route:"Kujo → Kyoto Station → Kinkakuji-michi",text:"Desde Kujo, ir en Karasuma Line a Kyoto Station y tomar un bus urbano hacia Kinkaku-ji, o usar la ruta que indique Maps ese día. Bajar en Kinkakuji-michi y caminar hasta la entrada.",details:["⏱️ Aproximadamente 45–60 min, sujeto a tráfico","🎟️ Bus/metro con IC card o billetes; no se reserva","⚠️ El bus puede ir lento en hora punta; salir con margen"],maps:true},
      {icon:"🚌",type:"BUS URBANO",title:"Kinkaku-ji → Ginkaku-ji",route:"Norte de Kioto → norte de Higashiyama",text:"Cruzar la ciudad en bus urbano siguiendo la ruta en tiempo real de Maps. Si hay tráfico, comparar una combinación de metro y bus. Bajar cerca de Ginkaku-michi y caminar al templo.",details:["⏱️ Aproximadamente 45–60 min, puede variar bastante","🎟️ Sin reserva · IC card","🧭 Confirmar línea y parada en el momento; las rutas de bus pueden cambiar"],maps:true},
      {icon:"🚶",type:"A PIE + BUS / METRO",title:"Camino del Filósofo → alojamiento",route:"Ginkaku-ji → paseo hacia el sur → Kujo",text:"Hacer a pie el tramo deseado del Camino del Filósofo. Desde el extremo sur, tomar bus hacia Kyoto Station y enlazar con metro a Kujo, o usar taxi si estáis cansados.",details:["🚶 Camino del Filósofo: paseo peatonal","🚌 El bus de regreso depende del punto donde terminéis","💳 IC card para el transporte urbano"],maps:true}
    ]},
    {date:"29 mayo",city:"Osaka",title:"🚆 Kioto → Osaka · Namba y Minami",summary:"JR Special Rapid + Osaka Metro · paseos a pie en el centro",items:[
      {icon:"🚇",type:"METRO + JR KYOTO LINE",title:"Alojamiento de Kioto → Osaka",route:"Kujo → Kyoto Station → Osaka Station → Namba",text:"Tomar Karasuma Line de Kujo a Kyoto Station; desde allí, JR Kyoto Line Special Rapid hasta Osaka Station y Osaka Metro Midosuji Line hasta Namba. Para el alojamiento en Naniwa Ward, seguir a pie desde Namba y dejar el equipaje antes del check-in si es posible.",details:["⏱️ Aproximadamente 60–75 min puerta a puerta","🎟️ Trenes frecuentes, sin reserva · IC card","🧳 Check-out de Kioto antes de las 10:00; check-in Osaka desde las 16:00"],maps:true},
      {icon:"🚶",type:"A PIE",title:"Namba · Shinsaibashi · Hozenji · Dotonbori",route:"Recorrido por Minami",text:"Shinsaibashi-suji, Hozenji Yokocho, Dotonbori y Namba están en la misma zona y se enlazan cómodamente a pie. Al final, volver andando al alojamiento.",details:["🚶 No hace falta metro entre estas visitas","🧭 Si lleváis equipaje, podéis dejarlo primero en consigna o preguntar al alojamiento"],maps:true}
    ]},
    {date:"30 mayo",city:"Osaka",title:"🎢 USJ o Osaka tradicional · transporte según alternativa",summary:"Elegid A o B; ambos planes ocupan el día y no se combinan",items:[
      {icon:"🚇",type:"OPCIÓN A · OSAKA METRO + JR YUMESAKI",title:"Namba → Universal Studios Japan",route:"Namba → Umeda/Osaka → Nishikujo → Universal City",text:"Desde Osaka Metro Namba, tomar Midosuji Line hasta Umeda y caminar a JR Osaka Station. Coger Osaka Loop Line hasta Nishikujo y enlazar con JR Yumesaki Line hasta Universal City. Regresar por la misma ruta.",details:["⏱️ Aproximadamente 35–50 min por sentido más enlaces","🎟️ IC card para trenes; entrada de USJ se compra aparte","🎢 Revisar apertura, entradas y posibles Express Pass cerca de la fecha","📌 Salir temprano y confirmar la ruta del día en Maps"],maps:true},
      {icon:"🚇",type:"OPCIÓN B · METRO + CAMINATA",title:"Namba → Osaka Castle",route:"Osaka Metro hasta Tanimachi 4-chome",text:"Usar Osaka Metro desde Namba con transbordo en Tanimachi 9-chome a Tanimachi Line hacia Tanimachi 4-chome. Desde allí caminar al parque y al castillo. También se puede usar JR desde Osaka-Namba con enlace distinto según el punto de entrada.",details:["⏱️ Aproximadamente 25–35 min más la caminata","🎟️ Sin reserva · IC card","🏯 Comprobar horarios de acceso al museo del castillo"],maps:true},
      {icon:"🚶",type:"OPCIÓN B · A PIE",title:"Osaka Castle → Kuromon Market",route:"Traslado en metro/taxi al mercado",text:"Al terminar el castillo, tomar metro o taxi hasta Namba/Nipponbashi y caminar a Kuromon Market para almorzar. El mercado puede cerrar algunos puestos por la tarde.",details:["⏱️ Aproximadamente 25–40 min según tráfico y enlaces","🍣 Ir a mediodía para encontrar más puestos abiertos","💳 IC card en metro"],maps:true},
      {icon:"🚶",type:"OPCIÓN B · A PIE",title:"Kuromon → Den Den Town → Shinsekai",route:"Nipponbashi → Ebisucho / Shinsekai",text:"Caminar desde Kuromon hacia Den Den Town por Nipponbashi. Después continuar a pie hacia Shinsekai y Tsūtenkaku; usar metro una parada si preferís ahorrar pasos.",details:["🚶 Los barrios quedan próximos entre sí","🌃 Terminar con cena en Shinsekai","🔁 Regreso a Namba en metro o caminando según energía"],maps:true}
    ]},
    {date:"31 mayo",city:"Osaka → España",title:"✈️ Namba → KIX → Pekín → Madrid",summary:"Salida temprano para el vuelo CA162 de las 09:05 · llegada al aeropuerto con margen",items:[
      {icon:"🚶",type:"ACCESO A LA ESTACIÓN",title:"Alojamiento → Nankai Namba",route:"Naniwa Ward → Nankai Namba Station",text:"Salir del alojamiento con equipaje y caminar a la estación Nankai Namba. Llegar a la estación con tiempo para localizar el acceso de la línea de aeropuerto y comprar/asignar el billete.",details:["🕐 Objetivo: estar en Nankai Namba sobre las 05:00–05:10","🧳 Check-out antes de las 11:00 según reserva; dejar el alojamiento antes por el vuelo","📍 Confirmar el recorrido a pie desde la dirección exacta y el acceso más cercano"],maps:true},
      {icon:"🚆",type:"NANKAI AIRPORT EXPRESS / RAP:I:T",title:"Nankai Namba → Kansai International Airport",route:"Nankai Main Line · Airport Express o Limited Express Rapi:t",text:"Tomar Airport Express (sin reserva) o el Limited Express Rapi:t (asiento asignado, suplemento). El horario actualmente publicado por Nankai incluye un Airport Express de las 05:15 que llega a KIX alrededor de las 05:58–05:59; sirve como referencia, pero hay que reconfirmarlo para el 31/05/2027.",details:["⏱️ Airport Express: alrededor de 43–45 min; Rapi:t: desde unos 34 min","💺 Rapi:t requiere billete/suplemento y asiento asignado","🎟️ Airport Express no necesita reserva; pagar con IC o billete","🎯 Objetivo de llegada a KIX: aproximadamente 06:00, casi 3 h antes del vuelo"],note:"⚠️ Si el primer tren de 2027 no permite llegar con el margen deseado, reservar taxi/transfer nocturno con antelación. No dependáis de horarios actuales para el día del viaje.",maps:true},
      {icon:"✈️",type:"VUELO INTERNACIONAL",title:"KIX → Pekín → Madrid",route:"Air China CA162 · conexión con CA897",text:"En Kansai International Airport, localizar el mostrador de Air China, facturar hasta Madrid si la reserva lo permite y confirmar en el aeropuerto si el equipaje se etiqueta hasta destino. Seguir indicaciones de salida y conexión en Pekín.",details:["🕘 CA162: salida prevista 09:05 desde KIX; llegar con margen para facturación y controles","🛫 Conexión en Pekín al vuelo CA897 · revisar terminal, puerta y requisitos con Air China","🛂 Seguir señalización de conexiones internacionales y confirmar equipaje etiquetado hasta MAD"]}
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
    "Traslado Yanaka → Fukuzumiro": ["Yanaka, Taito City, Tokyo", "Fukuzumiro, Tounosawa, Hakone"],
    "Nippori → Tokyo Station": ["Nippori Station, Tokyo", "Tokyo Station, Tokyo"],
    "Tokyo → Odawara": ["Tokyo Station, Tokyo", "Odawara Station, Kanagawa, Japan"],
    "Odawara → Hakone-Yumoto": ["Odawara Station, Kanagawa, Japan", "Hakone-Yumoto Station, Hakone, Japan"],
    "Hakone-Yumoto → Fukuzumiro": ["Hakone-Yumoto Station, Hakone, Japan", "Fukuzumiro, Tounosawa 74, Hakone, Japan"],
    "Fukuzumiro → Hakone-Yumoto": ["Fukuzumiro, Tounosawa 74, Hakone, Japan", "Hakone-Yumoto Station, Hakone, Japan"],
    "Hakone-Yumoto → Odawara": ["Hakone-Yumoto Station, Hakone, Japan", "Odawara Station, Kanagawa, Japan"],
    "Odawara → Kyoto Station": ["Odawara Station, Kanagawa, Japan", "Kyoto Station, Kyoto, Japan"],
    "Kyoto Station → alojamiento de Kioto": ["Kyoto Station, Kyoto, Japan", "Kujo Station, Kyoto, Japan"],
    "Kioto · alojamiento → Gion y Pontocho": ["Kujo Station, Kyoto, Japan", "Pontocho Alley, Kyoto, Japan"],
    "Alojamiento → Fushimi Inari": ["Kujo Station, Kyoto, Japan", "Inari Station, Kyoto, Japan"],
    "Fushimi Inari → Kiyomizu-dera": ["Inari Station, Kyoto, Japan", "Kiyomizu-Gojo Station, Kyoto, Japan"],
    "Higashiyama → Gion → alojamiento": ["Yasaka Shrine, Kyoto, Japan", "Kujo Station, Kyoto, Japan"],
    "Kujo → Saga-Arashiyama": ["Kujo Station, Kyoto, Japan", "Saga-Arashiyama Station, Kyoto, Japan"],
    "Movimientos dentro de Arashiyama": ["Arashiyama Bamboo Forest, Kyoto, Japan", "Togetsukyo Bridge, Kyoto, Japan"],
    "Saga-Arashiyama → Kujo": ["Saga-Arashiyama Station, Kyoto, Japan", "Kujo Station, Kyoto, Japan"],
    "Kujo → JR Nara Station": ["Kujo Station, Kyoto, Japan", "JR Nara Station, Nara, Japan"],
    "Nara Park → Tōdaiji → Kasuga Taisha → Kōfuku-ji → Naramachi": ["Nara Park, Nara, Japan", "Naramachi, Nara, Japan"],
    "JR Nara Station → Kioto": ["JR Nara Station, Nara, Japan", "Kujo Station, Kyoto, Japan"],
    "Kujo → Kinkaku-ji": ["Kujo Station, Kyoto, Japan", "Kinkaku-ji, Kyoto, Japan"],
    "Kinkaku-ji → Ginkaku-ji": ["Kinkaku-ji, Kyoto, Japan", "Ginkaku-ji, Kyoto, Japan"],
    "Camino del Filósofo → alojamiento": ["Philosopher's Path, Kyoto, Japan", "Kujo Station, Kyoto, Japan"],
    "Alojamiento de Kioto → Osaka": ["Kujo Station, Kyoto, Japan", "Namba Station, Osaka, Japan"],
    "Namba · Shinsaibashi · Hozenji · Dotonbori": ["Shinsaibashi-suji Shopping Street, Osaka, Japan", "Dotonbori, Osaka, Japan"],
    "Namba → Universal Studios Japan": ["Namba Station, Osaka, Japan", "Universal City Station, Osaka, Japan"],
    "Namba → Osaka Castle": ["Namba Station, Osaka, Japan", "Tanimachi 4-chome Station, Osaka, Japan"],
    "Osaka Castle → Kuromon Market": ["Osaka Castle, Osaka, Japan", "Kuromon Ichiba Market, Osaka, Japan"],
    "Kuromon → Den Den Town → Shinsekai": ["Kuromon Ichiba Market, Osaka, Japan", "Shinsekai, Osaka, Japan"],
    "Alojamiento → Nankai Namba": ["3 Chome-12-21 Nambanaka, Naniwa Ward, Osaka, Japan", "Nankai Namba Station, Osaka, Japan"],
    "Nankai Namba → Kansai International Airport": ["Nankai Namba Station, Osaka, Japan", "Kansai International Airport, Osaka, Japan"]
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
      intro:"Excursión de día desde Tokio. La prioridad es disfrutar sin prisas de Tōshō-gū y Shinkyō; la subida al lago Chūzenji y a Kegon queda como opción si el tiempo y las energías acompañan.",
      stops:[
        {time:"06:30 aprox.",icon:"🚆",type:"TRASLADO",title:"Salida de Yanaka",text:"Salir temprano del alojamiento para comenzar el viaje a Nikko."},
        {time:"08:30–09:00",icon:"📍",type:"LLEGADA",title:"Nikko",text:"Llegada aproximada a Nikko y comienzo de la visita."},
        {time:"09:00–12:00",icon:"⛩️",type:"TEMPLOS + ZONA HISTÓRICA",title:"Tōshō-gū y Shinkyō",text:"Dedicar la mañana al santuario Tōshō-gū y al puente Shinkyō. Si queda tiempo y apetece, añadir solo Rinnō-ji o Futarasan, sin intentar recorrer todos los recintos.",tags:["Tōshō-gū · imprescindible","Shinkyō","Rinnō-ji o Futarasan · opcional"]},
        {time:"12:00–13:00",icon:"🍜",type:"COMIDA",title:"Comida en Nikko",text:"Parada tranquila para comer algo local, como yuba, antes de decidir si subir a la zona del lago."},
        {time:"13:00 aprox. · opcional",icon:"🚌",type:"TRASLADO",title:"Bus hacia Chuzenji Onsen",text:"Si los horarios y las energías acompañan, tomar el autobús a Chuzenji Onsen. El trayecto suele rondar los 50 minutos por sentido; si no, quedaros en la zona histórica y regresad con más margen."},
        {time:"14:00–15:15 · opcional",icon:"🌊",type:"NATURALEZA",title:"Kegon Falls + lago Chuzenji",text:"Ver la cascada Kegon y dar un paseo corto junto al lago, sin añadir más paradas de montaña."},
        {time:"15:15–16:15 aprox.",icon:"🚌",type:"REGRESO A LA ESTACIÓN",title:"Chuzenji Onsen → Tobu-Nikko",text:"Bajar en autobús hacia Tobu-Nikko. Dejar margen por posibles colas o tráfico en la carretera de montaña."},
        {time:"16:30 aprox. · según reserva",icon:"🚆",type:"REGRESO",title:"Limited Express a Tokio",text:"Tomar el tren reservado de vuelta. La llegada a Tokio se estima entre las 18:30 y las 19:30, según el servicio elegido."},
        {time:"19:30 aprox.",icon:"🍜",type:"NOCHE",title:"Tokio",text:"Cena tranquila y dormir después de la excursión."}
      ],
      note:"🗻 El día ya es largo por los trayectos. La prioridad es Tōshō-gū + Shinkyō; el lago y Kegon son opcionales. Confirmar horarios de tren y autobús antes del viaje, porque mayo de 2027 aún puede tener cambios."
    },
    "23": {
      title:"Tokio → Hakone · paseo local y tarde en Fukuzumiro",
      intro:"Traslado desde Yanaka a Hakone. La idea es llegar con margen, conocer un poco Hakone-Yumoto/Tōnosawa y reservar la tarde para el ryokan, el onsen y la cena.",
      stops:[
        {time:"08:00–10:30 aprox.",icon:"🚆",type:"TRASLADO",title:"Yanaka → Hakone-Yumoto",text:"Ir desde Nippori a Tokyo Station, continuar en Tokaido Shinkansen hasta Odawara y enlazar con el tren Hakone Tozan a Hakone-Yumoto. El servicio exacto se definirá al publicarse los horarios de mayo de 2027.",tags:["JR Yamanote","Shinkansen","Hakone Tozan"]},
        {time:"10:30–11:00",icon:"🏨",type:"LLEGADA",title:"Fukuzumiro · Tōnosawa",text:"Llegar al alojamiento y, si lo necesitáis, dejar las maletas antes del check-in. El ryokan acepta equipaje antes de entrar; el plan no depende de llevarlas o enviarlas."},
        {time:"11:00–13:30",icon:"🚶",type:"PASEO SUAVE",title:"Hakone-Yumoto + cascada Tamadare",text:"Pasear por la zona de Hakone-Yumoto y Tōnosawa. Si os apetece, acercaros a la cascada Tamadare y al santuario junto a ella; haced una versión corta del paseo para llegar descansados al ryokan.",tags:["Cascada Tamadare","Tōnosawa","Calles de Hakone-Yumoto"]},
        {time:"13:30–14:30",icon:"🍜",type:"COMIDA",title:"Comida tranquila",text:"Comer por Hakone-Yumoto o cerca del alojamiento y volver a Fukuzumiro con tiempo."},
        {time:"15:00–18:00",icon:"♨️",type:"RYOKAN",title:"Check-in, onsen y descanso",text:"Hacer el check-in desde las 15:00, instalaros y disfrutar del onsen. El ryokan pide llegar antes de las 18:00 si tenéis cena incluida."},
        {time:"18:00",icon:"🍱",type:"CENA INCLUIDA",title:"Cena en Fukuzumiro",text:"Cena kaiseki del ryokan. La sirven en la habitación habitualmente; al tener dos habitaciones reservadas, conviene confirmar si la comida será en las habitaciones o en una sala común."},
        {time:"Después de cenar",icon:"♨️",type:"DESCANSO",title:"Segundo baño y noche tranquila",text:"Si os apetece, daros otro baño y descansar en el ryokan. No hace falta añadir más visitas este día."}
      ],
      note:"🌿 La visita de este día se mantiene cerca del alojamiento para que la tarde de onsen y la cena sean relajadas. Horarios aproximados; confirmar los trenes al acercarse el viaje."
    },
    "24": {
      title:"Hakone → Kioto · Gion y Pontocho",
      intro:"Salida por la mañana para llegar a Kioto con tiempo, dejar el equipaje y conocer Gion y Pontocho por la tarde-noche.",
      stops:[
        {time:"07:30–08:15",icon:"🍱",type:"DESAYUNO + CHECK-OUT",title:"Fukuzumiro",text:"Desayuno en el ryokan y salida antes de las 10:00. Bajar a Hakone-Yumoto y continuar a Odawara; el equipaje puede viajar con vosotros o enviarse al alojamiento."},
        {time:"08:30–11:00 aprox.",icon:"🚄",type:"TRASLADO",title:"Hakone-Yumoto → Odawara → Kioto",text:"Tren local hasta Odawara y Tokaido Shinkansen a Kyoto Station. Horario orientativo; confirmar los servicios cuando se publiquen los de mayo de 2027."},
        {time:"11:30–12:30",icon:"🏠",type:"LLEGADA",title:"Kyoto Station y equipaje",text:"Traslado al alojamiento de Minami-ku. Si la habitación aún no está disponible, dejar las maletas y comenzar la visita; check-in desde las 16:00."},
        {time:"12:30–14:00",icon:"🍜",type:"COMIDA",title:"Almuerzo y traslado a Gion",text:"Comer por Kyoto Station o Gion y desplazarse al distrito histórico."},
        {time:"14:00–17:30",icon:"🏮",type:"BARRIO HISTÓRICO",title:"Gion · Yasaka-jinja · Hanamikoji",text:"Pasear por Gion, visitar Yasaka-jinja y recorrer Hanamikoji con respeto por las calles residenciales y las normas locales."},
        {time:"17:30–19:00",icon:"🌉",type:"PASEO",title:"Río Kamo y Pontocho",text:"Caminar hacia el río Kamo y recorrer el estrecho callejón de Pontocho."},
        {time:"19:00–21:00",icon:"🍜",type:"CENA",title:"Cena en Pontocho o Gion",text:"Cena en la zona y regreso al alojamiento. Si el viaje se retrasa, acortar Gion y conservar la cena tranquila."}
      ],
      note:"🚄 Las horas de tren son aproximadas y dependen del horario de 2027. Día de traslado con una tarde de visitas compacta."
    },
    "25": {
      title:"Fushimi Inari + Kiyomizu-dera · Higashiyama",
      intro:"Madrugar para visitar Fushimi Inari antes de las mayores aglomeraciones y dedicar la tarde a pie a Higashiyama.",
      stops:[
        {time:"06:30–09:00",icon:"⛩️",type:"SANTUARIO",title:"Fushimi Inari Taisha",text:"Llegar temprano y recorrer el santuario y el tramo de torii que os apetezca. No es necesario subir hasta la cima para disfrutar de la visita."},
        {time:"09:00–10:00",icon:"🚆",type:"TRASLADO",title:"Fushimi → Higashiyama",text:"Desplazamiento en tren y transporte local hacia Kiyomizu-dera."},
        {time:"10:00–12:30",icon:"🏯",type:"TEMPLO",title:"Kiyomizu-dera",text:"Visitar el templo y sus miradores; prever tiempo para colas y caminatas en cuesta."},
        {time:"12:30–13:30",icon:"🍜",type:"COMIDA",title:"Almuerzo en Higashiyama",text:"Pausa para comer por la zona histórica."},
        {time:"13:30–16:30",icon:"🏘️",type:"PASEO HISTÓRICO",title:"Sannenzaka · Ninenzaka · Yasaka-no-tō",text:"Bajar a ritmo tranquilo por las calles tradicionales y visitar Yasaka-no-tō desde el exterior si encaja."},
        {time:"16:30–18:00",icon:"🌳",type:"PARQUE",title:"Maruyama Park y Yasaka-jinja",text:"Paseo por el parque y visita al santuario si quedó pendiente el día anterior."},
        {time:"Desde las 18:00",icon:"🌙",type:"TARDE LIBRE",title:"Gion o regreso al alojamiento",text:"Cena por la zona o vuelta para descansar después de un día con bastante caminata."}
      ],
      note:"👟 Día de muchas cuestas y escalones. El orden empieza temprano en Fushimi y continúa hacia Higashiyama."
    },
    "26": {
      title:"Arashiyama · bosque de bambú y Tenryū-ji",
      intro:"Jornada centrada en el oeste de Kioto, con tiempo para el templo, el bosque y el paseo junto al río.",
      stops:[
        {time:"08:00–09:00",icon:"🚆",type:"TRASLADO",title:"Kioto → Arashiyama",text:"Salir por la mañana hacia la estación Saga-Arashiyama o Arashiyama, según la ruta elegida."},
        {time:"09:00–10:00",icon:"🎋",type:"PASEO",title:"Bosque de bambú",text:"Recorrer el sendero del bosque temprano y continuar hacia el templo."},
        {time:"10:00–12:00",icon:"🏯",type:"TEMPLO Y JARDÍN",title:"Tenryū-ji",text:"Visitar el templo y su jardín paisajístico; comprobar horarios y entrada vigentes antes del viaje."},
        {time:"12:00–13:30",icon:"🍜",type:"COMIDA",title:"Almuerzo en Arashiyama",text:"Comer en la zona sin alejarse demasiado de la ruta a pie."},
        {time:"13:30–15:30",icon:"🌉",type:"PASEO",title:"Puente Togetsukyō y río Katsura",text:"Paseo por el puente y las orillas del río. Parada para descansar o tomar algo."},
        {time:"15:30–17:00",icon:"🌿",type:"TIEMPO FLEXIBLE",title:"Arashiyama a vuestro ritmo",text:"Tiendas, jardines cercanos o descanso, según energía y clima."},
        {time:"Desde las 17:00",icon:"🚆",type:"REGRESO",title:"Vuelta a Kioto",text:"Regreso al alojamiento y tarde-noche libre."}
      ],
      note:"🎋 La jornada se mantiene en una sola zona para evitar cruces largos por la ciudad."
    },
    "27": {
      title:"Excursión a Nara desde Kioto",
      intro:"Recorrido a pie por los principales lugares de Nara en el orden previsto, desde el parque hasta Naramachi.",
      stops:[
        {time:"07:30–08:30",icon:"🚆",type:"TRASLADO",title:"Kioto → Nara",text:"Salir temprano en tren desde Kyoto Station hacia Kintetsu-Nara o JR Nara; elegir estación según los horarios y comenzar la ruta a pie."},
        {time:"09:00–10:00",icon:"🦌",type:"PARQUE",title:"Nara Park",text:"Entrar en el parque, pasear entre los ciervos y seguir las indicaciones para interactuar con ellos con seguridad."},
        {time:"10:00–12:00",icon:"🏯",type:"TEMPLO",title:"Tōdaiji",text:"Visitar el Daibutsuden y el recinto principal. Reservar tiempo para caminar desde el parque."},
        {time:"12:00–13:00",icon:"🍜",type:"COMIDA",title:"Almuerzo en la zona del parque",text:"Pausa para comer y descansar antes de continuar hacia Kasuga Taisha."},
        {time:"13:00–14:30",icon:"⛩️",type:"SANTUARIO",title:"Kasuga Taisha",text:"Recorrer el camino arbolado y visitar el santuario; ajustar la visita a los horarios de apertura de los recintos interiores."},
        {time:"14:30–15:30",icon:"🚶",type:"PASEO",title:"Parque → Kōfuku-ji",text:"Regresar hacia el centro de Nara a pie, con una pausa si hace falta."},
        {time:"15:30–16:30",icon:"🏯",type:"TEMPLO",title:"Kōfuku-ji",text:"Visitar el entorno del templo y la pagoda; comprobar posibles obras o cierres antes del viaje."},
        {time:"16:30–18:00",icon:"🏘️",type:"BARRIO HISTÓRICO",title:"Naramachi",text:"Pasear por las calles históricas, tiendas y cafés de Naramachi."},
        {time:"18:00–19:00 aprox.",icon:"🚆",type:"REGRESO",title:"Nara → Kioto",text:"Volver en tren a Kioto. El horario exacto dependerá de la estación y el servicio escogidos."}
      ],
      note:"🦌 Recorrido a pie con pausas y tiempos aproximados. Las aperturas de templos y santuarios se confirmarán antes del viaje."
    },
    "28": {
      title:"Kinkaku-ji + Ginkaku-ji + Camino del Filósofo",
      intro:"Dos templos separados por un traslado en transporte público; el tramo oriental se completa a pie y deja margen libre.",
      stops:[
        {time:"08:00–09:00",icon:"🚌",type:"TRASLADO",title:"Hacia Kinkaku-ji",text:"Salir temprano en bus o combinación de metro y bus desde el alojamiento."},
        {time:"09:00–10:30",icon:"✨",type:"TEMPLO",title:"Kinkaku-ji · Pabellón Dorado",text:"Visitar el recinto y su recorrido circular. Llegar cerca de la apertura ayuda a evitar parte de las aglomeraciones."},
        {time:"10:30–12:00",icon:"🚌",type:"TRASLADO",title:"Kinkaku-ji → Ginkaku-ji",text:"Cruzar la ciudad en transporte público; contar con margen para tráfico y transbordos."},
        {time:"12:00–13:00",icon:"🍜",type:"COMIDA",title:"Almuerzo en el norte de Higashiyama",text:"Comer cerca de Ginkaku-ji antes de la visita."},
        {time:"13:00–14:30",icon:"🏯",type:"TEMPLO",title:"Ginkaku-ji · Pabellón de Plata",text:"Recorrer el jardín y los senderos del templo."},
        {time:"14:30–16:00",icon:"🌿",type:"PASEO",title:"Camino del Filósofo",text:"Caminar el tramo que os apetezca hacia el sur, con paradas en pequeños templos o cafés si están abiertos."},
        {time:"Desde las 16:00",icon:"☕",type:"TIEMPO LIBRE",title:"Tarde libre en Kioto",text:"Descanso, compras o volver a una zona favorita. Cena sin horario fijado."}
      ],
      note:"🚌 Los templos están en zonas distintas: dejar margen para el traslado entre Kinkaku-ji y Ginkaku-ji."
    },
    "29": {
      title:"Kioto → Osaka · Namba, Dotonbori y Shinsaibashi",
      intro:"Traslado por la mañana, llegada al alojamiento y primer paseo por los barrios del centro de Osaka.",
      stops:[
        {time:"08:00–09:00",icon:"🏠",type:"CHECK-OUT",title:"Salida del alojamiento de Kioto",text:"Check-out antes de las 10:00. Llevar o enviar el equipaje y dirigirse a la estación."},
        {time:"09:00–10:00 aprox.",icon:"🚆",type:"TRASLADO",title:"Kioto → Osaka",text:"Viajar en tren hacia Osaka y continuar a Namba/Naniwa Ward. El servicio concreto dependerá de la estación y ruta escogidas."},
        {time:"10:00–12:00",icon:"🧳",type:"LLEGADA",title:"Namba y equipaje",text:"Dejar las maletas en consigna o en el alojamiento si lo permiten; el check-in está previsto desde las 16:00."},
        {time:"12:00–13:00",icon:"🍜",type:"COMIDA",title:"Kuromon Market o Namba",text:"Almuerzo en Namba; Kuromon queda como opción cercana si aún tenéis energía y no lo visitáis al día siguiente."},
        {time:"13:00–15:30",icon:"🛍️",type:"BARRIO",title:"Shinsaibashi-suji",text:"Pasear por la galería comercial y sus calles laterales hacia el sur."},
        {time:"16:00–17:00",icon:"🏠",type:"ALOJAMIENTO",title:"Check-in en Osaka",text:"Instalarse en el alojamiento de Naniwa Ward y descansar un rato."},
        {time:"17:00–18:00",icon:"⛩️",type:"TEMPLO",title:"Hozenji Yokocho y Hozenji",text:"Recorrer el callejón y acercarse al pequeño templo Hozenji."},
        {time:"18:00–21:00",icon:"🌃",type:"PASEO + CENA",title:"Dotonbori y Namba",text:"Ver el canal y los letreros al anochecer, cenar por Dotonbori y volver caminando al alojamiento."}
      ],
      note:"🧳 Día de mudanza: la visita se concentra en el centro y permite ajustar el ritmo según equipaje y hora de check-in."
    },
    "30": {
      title:"Osaka · elegid una de las dos alternativas",
      intro:"Día completo: escoged Universal Studios Japan o una jornada por Osaka tradicional. Son planes alternativos, no se recomienda intentar combinarlos en el mismo día.",
      stops:[
        {time:"DÍA COMPLETO · OPCIÓN A",icon:"🎢",type:"UNIVERSAL STUDIOS JAPAN",title:"USJ",text:"Dedicar el día al parque. Revisar calendario, entradas, horarios y posibles pases exprés cuando se acerque la fecha. Conviene comprar entradas con antelación."},
        {time:"08:00–09:00 · OPCIÓN B",icon:"🚆",type:"OSAKA TRADICIONAL",title:"Salida hacia Osaka Castle",text:"Desplazarse al castillo al comienzo del día para aprovechar la mañana."},
        {time:"09:00–11:30 · OPCIÓN B",icon:"🏯",type:"CASTILLO",title:"Osaka Castle",text:"Visitar el parque y, si interesa, el museo interior. Revisar horarios y entradas antes del viaje."},
        {time:"11:30–12:00 · OPCIÓN B",icon:"🚇",type:"TRASLADO",title:"Hacia Kuromon Market",text:"Traslado al mercado de Kuromon."},
        {time:"12:00–13:30 · OPCIÓN B",icon:"🍣",type:"MERCADO + COMIDA",title:"Kuromon Market",text:"Probar comida local y almorzar en el mercado, atendiendo a los horarios de los puestos."},
        {time:"13:30–14:00 · OPCIÓN B",icon:"🚶",type:"TRASLADO",title:"Kuromon → Nipponbashi",text:"Caminar hacia Den Den Town, en el área de Nipponbashi."},
        {time:"14:00–16:30 · OPCIÓN B",icon:"🎮",type:"BARRIO",title:"Den Den Town · Nipponbashi",text:"Tiendas de electrónica, videojuegos, manga y coleccionismo."},
        {time:"16:30–17:00 · OPCIÓN B",icon:"🚶",type:"TRASLADO",title:"Nipponbashi → Shinsekai",text:"Caminar o tomar transporte local hacia Shinsekai."},
        {time:"17:00–20:00 · OPCIÓN B",icon:"🏮",type:"BARRIO",title:"Shinsekai y Tsūtenkaku",text:"Pasear por Shinsekai, ver Tsūtenkaku desde el exterior o subir si apetece y cenar kushikatsu."}
      ],
      note:"🔀 Alternativa A: USJ ocupa prácticamente todo el día. Alternativa B: Osaka Castle → Kuromon Market → Den Den Town/Nipponbashi → Shinsekai, en ese orden."
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
    ],
    "23": [
      {label:"Yanaka → Odawara → Hakone-Yumoto → Fukuzumiro", origin:"Yanaka, Taito City, Tokyo", waypoints:["Tokyo Station, Tokyo","Odawara Station, Kanagawa, Japan","Hakone-Yumoto Station, Hakone, Japan"], destination:"Fukuzumiro, Tounosawa 74, Hakone, Japan", mode:"transit"},
      {label:"Paseo opcional · Hakone-Yumoto → cascada Tamadare", origin:"Hakone-Yumoto Station, Hakone, Japan", waypoints:["Tamadare Falls, Hakone, Japan"], destination:"Fukuzumiro, Tounosawa 74, Hakone, Japan", mode:"walking"}
    ],
    "24": [
      {label:"Hakone → Kioto · traslado", origin:"Fukuzumiro, Tounosawa 74, Hakone, Japan", waypoints:["Hakone-Yumoto Station, Hakone, Japan","Odawara Station, Kanagawa, Japan"], destination:"Kyoto Station, Kyoto, Japan", mode:"transit"},
      {label:"Kioto · Gion → Pontocho", origin:"Yasaka Shrine, Kyoto, Japan", waypoints:["Hanamikoji Street, Kyoto, Japan","Kamo River, Kyoto, Japan"], destination:"Pontocho Alley, Kyoto, Japan", mode:"walking"}
    ],
    "25": [{label:"Fushimi Inari → Kiyomizu-dera → Higashiyama",origin:"Fushimi Inari Taisha, Kyoto, Japan",waypoints:["Kiyomizu-dera, Kyoto, Japan","Sannenzaka, Kyoto, Japan","Ninenzaka, Kyoto, Japan"],destination:"Yasaka Shrine, Kyoto, Japan",mode:"transit"}],
    "26": [{label:"Arashiyama · bosque → Tenryū-ji → río",origin:"Arashiyama Bamboo Forest, Kyoto, Japan",waypoints:["Tenryu-ji, Kyoto, Japan"],destination:"Togetsukyo Bridge, Kyoto, Japan",mode:"walking"}],
    "27": [{label:"Nara a pie · ruta completa",origin:"Kintetsu-Nara Station, Nara, Japan",waypoints:["Nara Park, Nara, Japan","Todaiji Temple, Nara, Japan","Kasuga Taisha, Nara, Japan","Kofuku-ji, Nara, Japan"],destination:"Naramachi, Nara, Japan",mode:"walking"}],
    "28": [{label:"Kinkaku-ji → Ginkaku-ji → Camino del Filósofo",origin:"Kinkaku-ji, Kyoto, Japan",waypoints:["Ginkaku-ji, Kyoto, Japan"],destination:"Philosopher's Path, Kyoto, Japan",mode:"transit"}],
    "29": [{label:"Kioto → Namba, Osaka",origin:"Kyoto Station, Kyoto, Japan",waypoints:[],destination:"Namba Station, Osaka, Japan",mode:"transit"},{label:"Namba → Shinsaibashi → Hozenji → Dotonbori",origin:"Shinsaibashi-suji Shopping Street, Osaka, Japan",waypoints:["Hozenji Temple, Osaka, Japan"],destination:"Dotonbori, Osaka, Japan",mode:"walking"}],
    "30": [{label:"Opción B · Osaka Castle → Kuromon → Nipponbashi → Shinsekai",origin:"Osaka Castle, Osaka, Japan",waypoints:["Kuromon Ichiba Market, Osaka, Japan","Den Den Town, Osaka, Japan"],destination:"Shinsekai, Osaka, Japan",mode:"transit"}]
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



