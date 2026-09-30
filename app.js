
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
      {icon:"🚆",type:"TREN · AEROPUERTO",title:"Narita → Nippori",route:"Keisei Skyliner",text:"Desde la estación de Narita Airport, seguir las indicaciones Keisei / Skyliner y coger el Limited Express hasta Nippori. Desde allí, el alojamiento queda a pie.",details:["⏱️ ~36 min","💴 ¥2.470 billete normal / ¥2.465 con IC aprobada (tarifa publicada para Nippori)","💺 Todos los asientos son reservados: hace falta billete Skyliner además de la tarifa de viaje","💳 Compra en máquina/taquilla del aeropuerto o en línea; principales tarjetas aceptadas","📌 No hace falta comprarlo con meses de antelación; compradlo tras recoger el equipaje y antes de subir"],note:"💡 Al llegar a las 15:10, mejor comprar el billete cuando hayáis pasado inmigración y recogido el equipaje, para no depender de una hora concreta.",maps:true}
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
      {icon:"🚕",type:"VUELTA DE MADRUGADA",title:"Shibuya → Yanaka",route:"Tren o taxi según la hora",text:"Si la fiesta termina cuando ya no haya servicio ferroviario, la alternativa será taxi. Consultad el último tren antes de salir; el servicio nocturno no funciona toda la noche.",details:["🚆 Tren: solo mientras haya servicio; comprobar último servicio de regreso","💴 JR: tarifa local aproximada ¥230–¥350, según ruta","🚕 Taxi: taxímetro; tarifa actual de Tokio ¥500 por el primer km + ¥100 cada 232 m; recargo del 20% entre 22:00 y 05:00","💳 Taxi: efectivo o tarjeta depende del vehículo; confirmar antes de subir","🎟️ Tren no se reserva; taxi de calle tampoco, aunque pedirlo por app/operador puede añadir cargo"],maps:true}
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
      {icon:"🚆",type:"LIMITED EXPRESS · RESERVAR",title:"Tobu Asakusa → Tobu-Nikko",route:"Tobu Railway · SPACIA / Revaty",text:"Coger el Limited Express reservado desde Tobu Asakusa hasta Tobu-Nikko. Para este día, el NIKKO PASS All Area cubre el billete base de ida/vuelta y los autobuses Tobu del área de Nikko; el suplemento de asiento reservado se compra aparte.",details:["⏱️ ~1 h 50 min–2 h","💴 NIKKO PASS All Area: ¥8.000 adulto / ¥4.000 niño · válido 4 días; no incluye entradas","💺 Asiento reservado y billete Limited Express obligatorio aparte","💴 Suplemento oficial actual en fin de semana: aprox. ¥1.470 por trayecto (puede variar por tren/fecha)","📅 Venta Limited Express desde las 09:00 del mes anterior; para el 22/05/2027, desde el 22/04/2027 JST","💳 Pase digital/ventanilla Tobu; comprar también los asientos de ida y vuelta antes de embarcar"],note:"⭐ Este es el transporte del viaje que sí conviene reservar con antelación. La tarifa actual del pase y de los suplementos puede cambiar antes de mayo de 2027.",maps:true},
      {icon:"🚌",type:"BUS TOBU",title:"Tobu-Nikko → Chuzenji Onsen",route:"Tobu Bus",text:"Desde Tobu-Nikko Station, coger el autobús hacia Chuzenji Onsen.",details:["⏱️ ~50 min","🎟️ Sin reserva","💳 Nikko Pass si finalmente lo compráis"],maps:true},
      {icon:"🚌",type:"BUS TOBU",title:"Kegon Falls → Tobu-Nikko",route:"Tobu Bus",text:"Después de visitar Kegon Falls, volver en autobús a Tobu-Nikko Station.",details:["⏱️ ~50 min","🎟️ Sin reserva","💳 Nikko Pass si finalmente lo compráis"],maps:true},
      {icon:"🚆",type:"LIMITED EXPRESS · RESERVAR",title:"Tobu-Nikko → Asakusa",route:"Tobu Railway · Limited Express",text:"Regreso a Asakusa con el Limited Express reservado. El NIKKO PASS cubre la tarifa base dentro de su validez; el suplemento del asiento se compra aparte.",details:["⏱️ Aproximadamente 1 h 50 min–2 h","💴 Suplemento actual de fin de semana: aprox. ¥1.470 por trayecto","💺 Asiento reservado obligatorio en Limited Express","📌 Reservar la vuelta junto con la ida, antes de embarcar"],maps:true}
    ]},
    {date:"23 mayo",city:"Hakone",title:"🚆 Tokio → Hakone · lago Ashi · Ōwakudani",summary:"Salida temprana · circuito panorámico · check-in y cena en Fukuzumiro",items:[
      {icon:"🚆",type:"JR · YAMANOTE",title:"Nippori → Tokyo Station",route:"JR Yamanote Line",text:"Desde Nippori, ir en la línea JR Yamanote hasta Tokyo Station para enlazar con el Tokaido Shinkansen.",details:["⏱️ ~12 min","🎟️ Sin reserva","💳 Suica / PASMO"],maps:true},
      {icon:"🚄",type:"TŌKAIDŌ SHINKANSEN",title:"Tokyo → Odawara",route:"Shinkansen hacia Odawara",text:"Tomar un Shinkansen que pare en Odawara. La duración y el servicio concreto se confirmarán cuando publiquen los horarios de mayo de 2027.",details:["⏱️ Aproximadamente 35–45 min, según servicio","💴 Aproximadamente ¥3.800–¥4.500 por persona en asiento ordinario; confirmar al comprar","💺 Para cuatro, conviene reservar juntos; si lleváis maleta de más de 160 cm, consultad la plaza con espacio para equipaje","💳 SmartEX o taquilla/máquina JR; en SmartEX se paga en línea con tarjeta","📅 Reservas normalmente desde un mes antes; no comprar un billete que llegue a Odawara demasiado tarde para el ryokan"],note:"💡 Como alternativa, podéis ir desde Shinjuku en el Romancecar directo a Hakone-Yumoto; tarda alrededor de 1 h 30 min y tiene asientos reservados. Compararemos ambas opciones al cerrar horarios y precio.",maps:true},
      {icon:"🚃",type:"HAKONE TOZAN",title:"Odawara → Hakone-Yumoto",route:"Hakone Tozan Railway",text:"Desde Odawara, continuar en tren hasta Hakone-Yumoto. El Hakone Freepass de 2 días con inicio en Odawara cubre los transportes de la zona incluidos en sus condiciones, también para volver de Hakone a Odawara el día 24.",details:["⏱️ ~15 min","💴 Freepass de 2 días desde Odawara: ¥6.000 adulto según tarifa actual","🎟️ Sin reserva; se puede comprar en Odawara","💳 Pase en los trayectos cubiertos; Shinkansen no incluido"],maps:true},
      {icon:"🧳",type:"EQUIPAJE",title:"Consigna de equipaje · Hakone-Yumoto",route:"Hakone-Yumoto Station",text:"Dejar las maletas en una taquilla o en el mostrador de equipaje de la estación y empezar el circuito sin volver sobre vuestros pasos. El servicio de envío al alojamiento cuesta ahora desde ¥900 por bulto; confirmad la hora de entrega y la disponibilidad. Si no encaja, usad taquilla y recogedlo al volver.",details:["💴 Envío a alojamiento desde ¥900 por bulto (tarifa publicada actualmente); taquillas con precio según tamaño","📍 La estación indica servicio de equipaje y taquillas","🕐 Sin reserva anticipada indicada; disponibilidad sujeta a espacio"],maps:false},
      {icon:"🚌",type:"BUS HAKONE",title:"Hakone-Yumoto → Moto-Hakone-ko",route:"Hakone Tozan Bus · líneas H/K/R según servicio",text:"Tomar un bus hacia Moto-Hakone-ko para empezar por el santuario y la orilla del lago. El Hakone Freepass cubre los buses de las zonas incluidas; comprobad la parada final y el servicio disponible ese domingo.",details:["⏱️ Aproximadamente 25–40 min, según línea y tráfico","💴 Incluido en el Hakone Freepass de 2 días (tarifa actual desde Odawara: ¥6.000 adulto)","🎟️ No se reserva; puede haber cola y retrasos de carretera","💳 Pase o billete; para billete suelto llevad IC/efectivo según aceptación del bus"],maps:true},
      {icon:"🚢",type:"CRUCERO TURÍSTICO",title:"Moto-Hakone-ko → Togendai-ko",route:"Hakone Sightseeing Cruise · lago Ashi",text:"Cruzar el lago en el barco turístico. La ruta permite disfrutar del lago y enlazar directamente con el teleférico de Togendai.",details:["⏱️ Navegación de unos 25–35 min; sumar espera","💴 Incluido en Hakone Freepass; billete suelto actual aprox. ¥1.700 adulto","🎟️ No requiere reserva para viajeros individuales; grupos de 15 o más sí deben consultar","💳 Pase, tarjeta bancaria o Suica/PASMO en taquilla, según condiciones actuales"],maps:true},
      {icon:"🚡",type:"TELEFÉRICO + FUNICULAR + TREN",title:"Togendai → Ōwakudani → Sōunzan → Gōra → Hakone-Yumoto",route:"Hakone Ropeway · Hakone Tozan Cable Car · Hakone Tozan Railway",text:"Desde Togendai, subir en teleférico y bajar en Ōwakudani para la visita. Continuar hasta Sōunzan, cambiar al funicular hacia Gōra y bajar en tren a Hakone-Yumoto.",details:["⏱️ Unos 70–100 min de trayectos y transbordos, sin contar la visita ni las colas","💴 Teleférico, funicular y tren incluidos en el Hakone Freepass; sin pase, tarifas separadas por tramo","🎟️ Sin reserva; el teleférico puede suspenderse por viento o mantenimiento","💳 Pase; Suica/PASMO se acepta en algunos puntos, no lo deis por supuesto en todos"],note:"🌋 Confirmar el estado operativo del teleférico el mismo día. Si se suspende, usar bus desde Ōwakudani/Togendai según indicaciones del operador.",maps:true}
    ]},
    {date:"24 mayo",city:"Kioto",title:"🚄 Hakone → Kioto · Nishiki opcional + Gion",summary:"Llegada · mercado de Nishiki si hay tiempo · Gion y Pontocho",items:[
      {icon:"🚌",type:"MINIBÚS COMPARTIDO",title:"Fukuzumiro → Hakone-Yumoto",route:"Tounosawa → Hakone-Yumoto",text:"El minibús compartido de Tōnosawa pasa por Fukuzumiro hacia las 09:10 y vuelve a Hakone-Yumoto hacia las 09:18, según el horario publicado ahora. Es la opción prevista; si no coincide o no hay plaza, caminad unos 15 minutos o pedid taxi.",details:["🏨 Check-out antes de las 10:00","💴 ¥200 por persona y trayecto, pago en efectivo; llevad importe exacto","🎟️ No se indica reserva previa; confirmad horario y operación en recepción","🕐 Servicio desde Hakone-Yumoto a las 09:08; horarios pueden cambiar antes de mayo de 2027"],maps:true},
      {icon:"🚃",type:"HAKONE TOZAN",title:"Hakone-Yumoto → Odawara",route:"Hakone Tozan Railway",text:"Tomar el tren local desde Hakone-Yumoto hasta Odawara y enlazar allí con el Shinkansen a Kioto. El Hakone Freepass de dos días comprado para comenzar en Odawara cubre este tramo durante su vigencia; el Shinkansen va aparte.",details:["⏱️ ~15 min","🎟️ Sin reserva","💳 Hakone Freepass en tramo cubierto; Shinkansen aparte"],maps:true},
      {icon:"🚄",type:"TŌKAIDŌ SHINKANSEN",title:"Odawara → Kyoto Station",route:"Tokaido Shinkansen",text:"Desde Odawara, tomar el Shinkansen hacia Kyoto. Al llegar, traslado al alojamiento en Minami-ku y check-in desde las 16:00.",details:["⏱️ Aproximadamente 2 h–2 h 20 min, según servicio","💴 Presupuesto actual orientativo: ¥12.500–¥13.000 por persona en asiento ordinario; la tarifa depende del servicio, tipo de asiento y temporada","💺 Para cuatro, reservar juntos. Consultad plaza específica si alguna maleta mide más de 160 cm sumando alto+ancho+fondo","💳 SmartEX con tarjeta o billete en taquilla/máquina JR; compra en línea sujeta a registro","📅 Los billetes se suelen poner a la venta un mes antes; horario exacto de mayo de 2027 pendiente de publicación","🌆 Tarde libre y cena tranquila cerca del alojamiento"],maps:true},
      {icon:"🚇",type:"METRO KARASUMA LINE",title:"Kyoto Station → alojamiento de Kioto",route:"Kyoto → Kujo · Minami-ku",text:"Desde Kyoto Station, tomar Karasuma Line una parada hasta Kujo Station y caminar al alojamiento de Minami-ku. Si lleváis maletas grandes, un taxi puede ser más cómodo.",details:["🏨 Check-in disponible desde las 16:00","🧳 Si llegáis antes, preguntar por consigna o dejar el equipaje"],maps:true},
      {icon:"🚇",type:"METRO + PASEO A PIE",title:"Alojamiento / consigna → Nishiki Market (opcional)",route:"Kujo → Shijo → Nishiki Market",text:"Si llegáis a Kioto con tiempo, dejad antes las maletas en el alojamiento o en una consigna y acercaos a Nishiki para comer. Desde Kujo podéis tomar la Karasuma Line hacia Shijo y caminar unos minutos hasta el mercado.",details:["⏱️ Aproximadamente 20–30 min desde la zona del alojamiento","🍜 Parada opcional para comer; los horarios varían según cada puesto","⚠️ Si el tren se retrasa o vais cansados, saltad Nishiki y comed por Gion"],maps:true},
      {icon:"🚶",type:"A PIE · CENTRO A GION",title:"Nishiki Market → Gion y Pontocho",route:"Nishiki → Yasaka-jinja → Hanamikoji → Pontocho",text:"Tras comer, podéis continuar andando desde el mercado hacia Gion. Yasaka-jinja, Hanamikoji, el río Kamo y Pontocho se recorren a pie; al terminar, volved al alojamiento en transporte urbano o taxi según la hora.",details:["🚶 Nishiki–Gion: aproximadamente 20–25 min a pie hasta Yasaka-jinja","🌙 Si el transporte urbano ya terminó, usar taxi autorizado","🧭 Si no visitáis Nishiki, id directamente desde el alojamiento a Gion"],maps:true}
    ]},
    {date:"25 mayo",city:"Kioto",title:"🛍️ Tenjin-san + Kinkaku-ji",summary:"Mercado mensual en Kitano Tenmangu · visitas en el noroeste de Kioto",items:[
      {icon:"🚌",type:"BUS / METRO + BUS",title:"Alojamiento → Tenjin-san",route:"Kujo → Kitano Tenmangu",text:"Salir temprano hacia Kitano Tenmangu para visitar Tenjin-san, su mercado mensual del día 25. Consultad la ruta de transporte público del momento; los autobuses pueden tardar más por el tráfico.",details:["⏱️ Aproximadamente 45–60 min desde el alojamiento, según enlaces y tráfico","🕖 El mercado suele funcionar desde primera hora hasta la tarde; confirmar la edición de 2027","🌧️ La lluvia puede reducir los puestos o afectar a la celebración"],note:"🛍️ Tenjin-san es un mercado de antigüedades, objetos usados, ropa y puestos de comida.",maps:true},
      {icon:"🚌",type:"BUS / TAXI LOCAL",title:"Tenjin-san → Kinkaku-ji",route:"Kitano Tenmangu → Kinkakuji-michi",text:"Después del mercado, desplazaos a Kinkaku-ji. Es un trayecto dentro del noroeste de Kioto; comprobad el bus disponible o comparad con taxi si queréis ahorrar tiempo.",details:["⏱️ Aproximadamente 15–25 min, según el medio y el tráfico","🚶 Desde la parada Kinkakuji-michi hay un corto paseo hasta la entrada"],maps:true},
      {icon:"🚇",type:"BUS + METRO KARASUMA",title:"Kinkaku-ji → alojamiento",route:"Kinkakuji-michi → Kitaoji → Kujo",text:"Al terminar, podéis tomar un bus hasta Kitaoji y enlazar con Karasuma Line hasta Kujo. Revisad Google Maps ese día para escoger la combinación más rápida.",details:["⏱️ Aproximadamente 45–60 min puerta a puerta","🎟️ Sin reserva · IC card válida en los servicios compatibles","🕐 Tarde libre para descansar o cenar cerca del alojamiento"],maps:true}
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
    {date:"28 mayo",city:"Kioto",title:"⛩️ Fushimi Inari → Higashiyama → Ginkaku-ji",summary:"Recorrido de sur a norte por el este de Kioto · empezar temprano",items:[
      {icon:"🚇",type:"METRO + JR NARA LINE",title:"Alojamiento → Fushimi Inari",route:"Kujo → Kyoto Station → Inari",text:"Caminar hasta Kujo Station, tomar Karasuma Line una parada a Kyoto Station y cambiar a JR Nara Line hasta Inari Station, frente al santuario.",details:["⏱️ Aproximadamente 20–30 min puerta a puerta","🎟️ Sin reserva · IC card o billetes locales","🌅 Salid temprano para aprovechar la visita antes de seguir al norte"],maps:true},
      {icon:"🚆",type:"JR NARA LINE + KEIHAN",title:"Fushimi Inari → Kiyomizu-dera",route:"Inari → Tofukuji → Kiyomizu-Gojo",text:"Tomar JR Nara Line desde Inari hasta Tofukuji y enlazar con Keihan hasta Kiyomizu-Gojo. Desde allí, subir andando al templo; la cuesta lleva tiempo.",details:["⏱️ Aproximadamente 35–50 min de transporte y caminata de acceso","🎟️ Sin reserva · IC card o billetes separados","🚶 Añadid unos 20–25 min a pie cuesta arriba desde Kiyomizu-Gojo"],maps:true},
      {icon:"🚶",type:"A PIE · HIGASHIYAMA",title:"Kiyomizu-dera → Higashiyama",route:"Kiyomizu-dera → Sannenzaka → Ninenzaka → Yasaka-no-tō",text:"Después del templo, bajad a pie por Sannenzaka y Ninenzaka y pasad por Yasaka-no-tō. Parada para comer por la zona; no añadimos Maruyama ni Gion para evitar repetir la visita del día 24.",details:["⏱️ Aproximadamente 2–3 h con paradas y comida","👟 Calles empedradas, cuestas y escalones","🍜 La comida puede hacerse en Higashiyama antes de continuar"],maps:true},
      {icon:"🚌",type:"BUS / TAXI LOCAL",title:"Higashiyama → Ginkaku-ji",route:"Higashiyama → Ginkakuji-michi",text:"Continuar hacia Ginkaku-ji en bus o taxi. Consultad la ruta en Maps al terminar la comida, teniendo en cuenta el tráfico y la hora de cierre del templo.",details:["⏱️ Aproximadamente 30–45 min, sujeto a tráfico y paradas","🕔 Procurad llegar con margen antes del cierre"],maps:true},
      {icon:"🚶",type:"A PIE · REGRESO",title:"Ginkaku-ji → Camino del Filósofo → alojamiento",route:"Ginkaku-ji → Camino del Filósofo → Kujo",text:"Visitad Ginkaku-ji y después recorred el tramo del Camino del Filósofo hacia el sur. Desde el extremo donde terminéis, volved al alojamiento en bus y metro o en taxi si estáis cansados.",details:["🏯 Ginkaku-ji y el inicio del camino están muy cerca","🚶 El paseo puede acortarse si el día se alarga","⏱️ Desde el sur del camino al alojamiento: alrededor de 35–50 min en transporte público"],maps:true}
    ]},
    {date:"29 mayo",city:"Osaka",title:"🚆 Kioto → Osaka · Namba y Minami",summary:"JR Special Rapid + Osaka Metro · paseos a pie en el centro",items:[
      {icon:"🚇",type:"METRO + JR KYOTO LINE",title:"Alojamiento de Kioto → Osaka",route:"Kujo → Kyoto Station → Osaka Station → Namba",text:"Tomar Karasuma Line de Kujo a Kyoto Station; desde allí, JR Kyoto Line Special Rapid hasta Osaka Station y Osaka Metro Midosuji Line hasta Namba. Para el alojamiento en Naniwa Ward, seguir a pie desde Namba y dejar el equipaje antes del check-in si es posible.",details:["⏱️ Aproximadamente 60–75 min puerta a puerta","🎟️ Trenes frecuentes, sin reserva · IC card","🧳 Check-out de Kioto antes de las 10:00; check-in Osaka desde las 16:00"],maps:true},
      {icon:"🚶",type:"A PIE",title:"Namba · Shinsaibashi · Hozenji · Dotonbori",route:"Recorrido por Minami",text:"Shinsaibashi-suji, Hozenji Yokocho, Dotonbori y Namba están en la misma zona y se enlazan cómodamente a pie. Al final, volver andando al alojamiento.",details:["🚶 No hace falta metro entre estas visitas","🧭 Si lleváis equipaje, podéis dejarlo primero en consigna o preguntar al alojamiento"],maps:true}
    ]},
    {date:"30 mayo",city:"Osaka",title:"🏯 Osaka tradicional · jornada completa",summary:"Osaka Castle → Kuromon Market → Den Den Town/Nipponbashi → Shinsekai",items:[
      {icon:"🚇",type:"OSAKA TRADICIONAL · METRO + CAMINATA",title:"Namba → Osaka Castle",route:"Osaka Metro hasta Tanimachi 4-chome",text:"Usar Osaka Metro desde Namba con transbordo en Tanimachi 9-chome a Tanimachi Line hacia Tanimachi 4-chome. Desde allí caminar al parque y al castillo. También se puede usar JR desde Osaka-Namba con enlace distinto según el punto de entrada.",details:["⏱️ Aproximadamente 25–35 min más la caminata","🎟️ Sin reserva · IC card","🏯 Comprobar horarios de acceso al museo del castillo"],maps:true},
      {icon:"🚶",type:"OSAKA TRADICIONAL · A PIE",title:"Osaka Castle → Kuromon Market",route:"Traslado en metro/taxi al mercado",text:"Al terminar el castillo, tomar metro o taxi hasta Namba/Nipponbashi y caminar a Kuromon Market para almorzar. El mercado puede cerrar algunos puestos por la tarde.",details:["⏱️ Aproximadamente 25–40 min según tráfico y enlaces","💴 Metro: aproximadamente ¥240–¥290 por trayecto; taxi con taxímetro y coste variable","🍣 Ir a mediodía para encontrar más puestos abiertos","💳 IC card o billete para metro; confirmar pago con tarjeta al subir a taxi","🎟️ No hace falta reservar metro; taxi de calle tampoco"],maps:true},
      {icon:"🚶",type:"OSAKA TRADICIONAL · A PIE",title:"Kuromon → Den Den Town → Shinsekai",route:"Nipponbashi → Ebisucho / Shinsekai",text:"Caminar desde Kuromon hacia Den Den Town por Nipponbashi. Después continuar a pie hacia Shinsekai y Tsūtenkaku; usar metro una parada si preferís ahorrar pasos.",details:["🚶 Los barrios quedan próximos entre sí","🌃 Terminar con cena en Shinsekai","🔁 Regreso a Namba en metro o caminando según energía"],maps:true}
    ]},
    {date:"31 mayo",city:"Osaka → España",title:"✈️ Namba → KIX → Pekín → Madrid",summary:"Salida temprano para el vuelo CA162 de las 09:05 · llegada al aeropuerto con margen",items:[
      {icon:"🚶",type:"ACCESO A LA ESTACIÓN",title:"Alojamiento → Nankai Namba",route:"Naniwa Ward → Nankai Namba Station",text:"Salir del alojamiento con equipaje y caminar a la estación Nankai Namba. Llegar a la estación con tiempo para localizar el acceso de la línea de aeropuerto y comprar/asignar el billete.",details:["🕐 Objetivo: estar en Nankai Namba sobre las 05:00–05:10","🧳 Check-out antes de las 11:00 según reserva; dejar el alojamiento antes por el vuelo","📍 Confirmar el recorrido a pie desde la dirección exacta y el acceso más cercano"],maps:true},
      {icon:"🚆",type:"NANKAI AIRPORT EXPRESS / RAP:I:T",title:"Nankai Namba → Kansai International Airport",route:"Nankai Main Line · Airport Express o Limited Express Rapi:t",text:"Tomar Airport Express (sin reserva) o el Limited Express Rapi:t (asiento asignado y suplemento). En el horario laborable publicado actualmente, el Airport Express sale de Namba a las 05:15 y llega a KIX a las 05:58; el 31/05/2027 es lunes, pero el horario de ese día aún debe reconfirmarse.",details:["⏱️ Airport Express: aprox. 43 min según horario actual; Rapi:t: desde 34 min","💴 Rapi:t Digital Ticket actual: ¥1.410 asiento regular / ¥1.590 super seat, ida con tarifa incluida; el suplemento ticketless tiene descuento","💺 Rapi:t lleva asiento asignado; comprar en línea y elegir tren/asiento hasta 5 min antes o en máquinas/taquilla","🎟️ Airport Express: sin reserva; pagar con IC/billete. Tarifa exacta a revisar en buscador Nankai antes del viaje","🎯 Si tomáis el de 05:15, llegada estimada 05:58: margen de unas 3 h 07 min para el vuelo CA162 de las 09:05"],note:"⚠️ El horario es el que Nankai publica hoy, no el de mayo de 2027. Volved a comprobarlo cuando se acerque el viaje y, si no mantiene ese primer tren, reservad traslado nocturno con tiempo.",maps:true},
      {icon:"✈️",type:"VUELO INTERNACIONAL",title:"KIX → Pekín → Madrid",route:"Air China CA162 · conexión con CA897",text:"En Kansai International Airport, localizar el mostrador de Air China, facturar hasta Madrid si la reserva lo permite y confirmar en el aeropuerto si el equipaje se etiqueta hasta destino. Seguir indicaciones de salida y conexión en Pekín.",details:["🕘 CA162: salida prevista 09:05 desde KIX; llegar con margen para facturación y controles","🛫 Conexión en Pekín al vuelo CA897 · revisar terminal, puerta y requisitos con Air China","🛂 Seguir señalización de conexiones internacionales y confirmar equipaje etiquetado hasta MAD"]}
    ]}
  ];

  const transportMaps = {
    "Narita → Nippori · Keisei Skyliner": ["Narita Airport Terminal 1 Station, Narita, Chiba, Japan", "Nippori Station · 2 Chome Nishinippori, Arakawa City, Tokyo, Japan"],
    "Narita → Nippori": ["Narita Airport Terminal 1 Station, Narita, Chiba, Japan", "Nippori Station · 2 Chome Nishinippori, Arakawa City, Tokyo, Japan"],
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
    "Tokyo Teleport → Shibuya": ["Tokyo Teleport Station · 1-2 Aomi, Koto City, Tokyo, Japan", "Shibuya Station · 2-21-1 Shibuya, Shibuya City, Tokyo, Japan"],
    "Shibuya → alojamiento": ["Shibuya Station · 2-21-1 Shibuya, Shibuya City, Tokyo, Japan", "Yanaka, Taito City, Tokyo, Japan"],
    "Shibuya → Yanaka": ["Shibuya Station · 2-21-1 Shibuya, Shibuya City, Tokyo, Japan", "Yanaka, Taito City, Tokyo, Japan"],
    "Nippori → Harajuku": ["Nippori Station · 2 Chome Nishinippori, Arakawa City, Tokyo, Japan", "JR Harajuku Station · 1 Jingumae, Shibuya City, Tokyo, Japan"],
    "Meiji Jingu → Harajuku → Omotesando": ["Meiji Jingu, Tokyo", "Omotesando, Tokyo"],
    "Omotesando → Ginza / Kabuki-za": ["Omote-sando Station, Tokyo", "Kabukiza Theatre, Tokyo"],
    "Ginza → Shinjuku": ["Ginza Station · 4-1-2 Ginza, Chuo City, Tokyo, Japan", "Shinjuku Station · Shinjuku, Tokyo, Japan"],
    "Shinjuku → Nippori": ["Shinjuku Station · Shinjuku, Tokyo, Japan", "Nippori Station · 2 Chome Nishinippori, Arakawa City, Tokyo, Japan"],
    "Asakusa → Tobu-Nikko": ["Tobu Asakusa Station · 1-4-1 Hanakawado, Taito City, Tokyo, Japan", "Tobu-Nikko Station · 4-3 Matsubaracho, Nikko, Tochigi, Japan"],
    "Tobu Asakusa → Tobu-Nikko": ["Tobu Asakusa Station · 1-4-1 Hanakawado, Taito City, Tokyo, Japan", "Tobu-Nikko Station · 4-3 Matsubaracho, Nikko, Tochigi, Japan"],
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
    "Hakone-Yumoto → Moto-Hakone-ko": ["Hakone-Yumoto Station, Hakone, Japan", "Moto-Hakone Port, Hakone, Japan"],
    "Moto-Hakone-ko → Togendai-ko": ["Moto-Hakone Port, Hakone, Japan", "Togendai Port, Hakone, Japan"],
    "Togendai → Ōwakudani → Sōunzan → Gōra → Hakone-Yumoto": ["Togendai Station, Hakone, Japan", "Owakudani Station, Hakone, Japan"],
    "Fukuzumiro → Hakone-Yumoto": ["Fukuzumiro, Tounosawa 74, Hakone, Japan", "Hakone-Yumoto Station, Hakone, Japan"],
    "Hakone-Yumoto → Odawara": ["Hakone-Yumoto Station, Hakone, Japan", "Odawara Station, Kanagawa, Japan"],
    "Odawara → Kyoto Station": ["Odawara Station, Kanagawa, Japan", "Kyoto Station, Kyoto, Japan"],
    "Kyoto Station → alojamiento de Kioto": ["Kyoto Station, Kyoto, Japan", "Kujo Station, Kyoto, Japan"],
    "Alojamiento / consigna → Nishiki Market (opcional)": ["Kujo Station, Kyoto, Japan", "Nishiki Market, Nakagyo Ward, Kyoto, Japan"],
    "Nishiki Market → Gion y Pontocho": ["Nishiki Market, Nakagyo Ward, Kyoto, Japan", "Yasaka Shrine, Kyoto, Japan"],
    "Alojamiento → Tenjin-san": ["Kujo Station, Kyoto, Japan", "Kitano Tenmangu Shrine, Kyoto, Japan"],
    "Tenjin-san → Kinkaku-ji": ["Kitano Tenmangu Shrine, Kyoto, Japan", "Kinkakuji Temple, Kyoto, Japan"],
    "Kinkaku-ji → alojamiento": ["Kinkakuji Temple, Kyoto, Japan", "Kujo Station, Kyoto, Japan"],
    "Alojamiento → Fushimi Inari": ["Kujo Station, Kyoto, Japan", "Inari Station, Kyoto, Japan"],
    "Fushimi Inari → Kiyomizu-dera": ["Inari Station, Kyoto, Japan", "Kiyomizu-Gojo Station, Kyoto, Japan"],
    "Kiyomizu-dera → Higashiyama": ["Kiyomizu-dera, Kyoto, Japan", "Yasaka Pagoda Hokanji Temple, Kyoto, Japan"],
    "Higashiyama → Ginkaku-ji": ["Higashiyama, Kyoto, Japan", "Ginkakuji Temple, Kyoto, Japan"],
    "Ginkaku-ji → Camino del Filósofo → alojamiento": ["Philosopher's Path, Kyoto, Japan", "Kujo Station, Kyoto, Japan"],
    "Kujo → Saga-Arashiyama": ["Kujo Station, Kyoto, Japan", "Saga-Arashiyama Station, Kyoto, Japan"],
    "Movimientos dentro de Arashiyama": ["Arashiyama Bamboo Forest, Kyoto, Japan", "Togetsukyo Bridge, Kyoto, Japan"],
    "Saga-Arashiyama → Kujo": ["Saga-Arashiyama Station, Kyoto, Japan", "Kujo Station, Kyoto, Japan"],
    "Kujo → JR Nara Station": ["Kujo Station, Kyoto, Japan", "JR Nara Station, Nara, Japan"],
    "Nara Park → Tōdaiji → Kasuga Taisha → Kōfuku-ji → Naramachi": ["Nara Park, Nara, Japan", "Naramachi, Nara, Japan"],
    "JR Nara Station → Kioto": ["JR Nara Station, Nara, Japan", "Kujo Station, Kyoto, Japan"],
    "Alojamiento de Kioto → Osaka": ["Kujo Station, Kyoto, Japan", "Namba Station, Osaka, Japan"],
    "Namba · Shinsaibashi · Hozenji · Dotonbori": ["Shinsaibashi-suji Shopping Street, Osaka, Japan", "Dotonbori, Osaka, Japan"],
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

  function transportGuidance(t){
    const all=(t.details||[]).join(" ");
    const title=t.title||"", type=t.type||"";
    const rows=[];
    const fareByTitle={
      "Nippori → Ueno":"💴 ¥160–¥180 por trayecto (estimación JR).",
      "Ueno → Akihabara":"💴 ¥150–¥180 por trayecto (estimación JR).",
      "Akihabara → Nippori":"💴 ¥180–¥250 por trayecto (estimación JR).",
      "Nippori → Shimbashi":"💴 Aproximadamente ¥230–¥300 (JR, estimación por trayecto).",
      "Shimbashi → Shijo-mae":"💴 ¥388 con IC / ¥390 billete · Yurikamome, aprox. 27 min.",
      "Shijo-mae → Daiba":"💴 Aproximadamente ¥260 · Yurikamome, 15–20 min.",
      "Tokyo Teleport → Shibuya":"💴 Aproximadamente ¥500–¥600 · Rinkai/JR, depende del servicio directo.",
      "Nippori → Harajuku":"💴 Aproximadamente ¥230–¥300 en JR Yamanote.",
      "Omotesando → Ginza / Kabuki-za":"💴 Aproximadamente ¥210–¥260 en metro.",
      "Ginza → Shinjuku":"💴 Aproximadamente ¥210–¥260 en metro.",
      "Shinjuku → Nippori":"💴 Aproximadamente ¥200–¥300 en JR.",
      "Tokyo → Odawara":"💴 Aproximadamente ¥3.800–¥4.500 en Shinkansen, según servicio y asiento.",
      "Odawara → Kyoto Station":"💴 Aproximadamente ¥12.500–¥13.000 en asiento ordinario; tarifa y servicio pueden variar.",
      "Kyoto → JR Nara Station":"💴 JR Kyoto–Nara: alrededor de ¥720 por trayecto; Kujo–Kyoto en metro suma aprox. ¥220.",
      "JR Nara Station → Kioto":"💴 Alrededor de ¥720 por JR; el metro hasta Kujo suma aprox. ¥220.",
      "Namba → Osaka Castle":"💴 Metro: aproximadamente ¥240–¥290 por trayecto.",
      "Osaka Castle → Kuromon Market":"💴 Metro: aprox. ¥240–¥290 por trayecto; taxi con taxímetro, coste variable.",
      "Alojamiento → Nankai Namba":"💴 A pie: gratis; comprobar distancia desde la dirección exacta.",
      "Nankai Namba → Kansai International Airport":"💴 Airport Express: tarifa ordinaria Nankai; Rapi:t Digital Ticket actual ¥1.410 (asiento regular) / ¥1.590 (super seat), ida."
    };
    if(!/¥\s?\d|\d[\d,]*\s?¥/.test(all)){
      if(fareByTitle[title]) rows.push(fareByTitle[title]);
      else if(/A PIE|CAMINATA|ACCESO A LA ESTACIÓN|ÚLTIMO TRAMO/.test(type)) rows.push("💴 Tramo a pie: ¥0; el taxi es opcional y se paga según taxímetro.");
      else if(/BUS/.test(type) && /Nikko|Tobu|Chuzenji|Kegon/i.test(title+" "+(t.route||""))) rows.push("💴 Los buses Tobu del área están incluidos en el NIKKO PASS All Area actual (¥8.000 adulto); sin pase, la tarifa depende del tramo.");
      else if(/BUS/.test(type) && /Kyoto|Kioto|Tenjin|Kinkaku|Ginkaku|Higashiyama|Kujo/i.test(title+" "+(t.route||""))) rows.push("💴 Bus de Kioto: ¥230 por viaje dentro de la zona de tarifa plana; fuera de ella cambia según el tramo.");
      else if(/BUS/.test(type)) rows.push("💴 Bus local: tarifa según el tramo; calcula aprox. ¥200–¥600. Comprueba si acepta IC o lleva efectivo/billete.");
      else if(/SHINKANSEN/.test(type)) rows.push("💴 Billete aparte; precio depende del trayecto y del tipo de asiento.");
      else if(/LIMITED EXPRESS/.test(type)) rows.push("💴 NIKKO PASS All Area actual: ¥8.000 ida/vuelta base y buses; Limited Express aparte, aprox. ¥1.470 por trayecto en fin de semana.");
      else if(/JR|METRO|KEIHAN|TOZAN|RINKAI|YURIKAMOME/.test(type)) rows.push("💴 Transporte local: calcula aprox. ¥180–¥600 por trayecto; el precio exacto depende del tramo y operador.");
    }
    if(!/Suica|PASMO|IC card|IC\b|pagar con IC/i.test(all) && /JR|METRO|BUS|YURIKAMOME|RINKAI|TOZAN/.test(type)) rows.push("💳 Pago: Suica/PASMO/IC o billete de máquina, según el operador.");
    if(!/Sin reserva|no necesita reserva|reserva|reservad|asiento asignado/i.test(all) && /JR|METRO|BUS|YURIKAMOME|RINKAI|TOZAN/.test(type)) rows.push("🎟️ Sin reserva en servicios locales; basta con validar la IC o comprar billete.");
    return rows;
  }
  function transportDetailHTML(t){
    const transportDetails=[...(t.details||[]),...transportGuidance(t)];
    return `<div class="transport-detail-inner">
      <div class="transport-detail-top"><div><div class="itinerary-type">${t.type}</div><h3>${t.title}</h3><div class="muted">${t.route}</div></div><div class="transport-detail-icon">${t.icon}</div></div>
      <p class="transport-detail-text">${t.text}</p>
      ${transportDetails.length?`<div class="transport-details">${transportDetails.map(x=>`<div>${x}</div>`).join("")}</div>`:""}
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
      title:"Tokio → Hakone · lago Ashi, santuario y Ōwakudani",
      intro:"Madrugón para aprovechar el día de llegada y recorrer la ruta más emblemática de Hakone: lago Ashi, Hakone-jinja, crucero y valle volcánico de Ōwakudani. Por tiempo, dejamos fuera Tamadare y el museo al aire libre; la tarde acaba con margen para el ryokan y la cena.",
      stops:[
        {time:"06:30–09:15 aprox.",icon:"🚆",type:"TRASLADO TEMPRANO",title:"Yanaka → Hakone-Yumoto",text:"Salir temprano: JR Yamanote desde Nippori a Tokyo Station, Tokaido Shinkansen a Odawara y tren Hakone Tozan a Hakone-Yumoto. Elegir un tren que os permita llegar sobre las 09:00–09:30; horarios de mayo de 2027 pendientes.",tags:["JR Yamanote","Shinkansen","Hakone Tozan"]},
        {time:"09:15–09:35",icon:"🧳",type:"EQUIPAJE",title:"Consigna en Hakone-Yumoto",text:"Dejar las maletas en una taquilla o en el servicio de equipaje de la estación para no desviarse hasta el ryokan antes del circuito. El servicio de envío al alojamiento cuesta actualmente desde ¥900 por bulto; preguntad por la hora de entrega. Si no encaja, usad taquilla y recogedlas a la vuelta."},
        {time:"09:40–10:20 aprox.",icon:"🚌",type:"BUS A MOTO-HAKONE",title:"Hakone-Yumoto → Moto-Hakone-ko",text:"Tomar el autobús hacia Moto-Hakone-ko. Con el Hakone Freepass se cubren los autobuses de las zonas incluidas; comprobad la parada y el horario del día, porque el tráfico puede alterar el tiempo."},
        {time:"10:20–11:35",icon:"⛩️",type:"LAGO + SANTUARIO",title:"Lago Ashi · Hakone-jinja y torii de la paz",text:"Visitar el santuario y acercarse al torii rojo junto al agua; después, disfrutar un rato de la orilla del lago. Puede haber cola para la foto del torii, así que recortad el paseo si se alarga."},
        {time:"11:35–12:15 aprox.",icon:"🚢",type:"CRUCERO",title:"Moto-Hakone-ko → Togendai",text:"Cruzar el lago en el barco turístico. La navegación dura aproximadamente 25–35 minutos; sumad la espera del siguiente barco. Si el servicio se retrasa o suspende, usad el bus a Togendai y recortad la parada siguiente."},
        {time:"12:15–14:00",icon:"🚡",type:"TELEFÉRICO + VISITA",title:"Togendai → Ōwakudani",text:"Subir en el teleférico, con vistas al lago y, si el tiempo acompaña, al Fuji. Pasear por el área volcánica de Ōwakudani, comer algo sencillo y probar los huevos negros si os apetece."},
        {time:"14:00–15:50 aprox.",icon:"🚠",type:"REGRESO PANORÁMICO",title:"Ōwakudani → Sōunzan → Gōra → Hakone-Yumoto",text:"Continuar en teleférico hasta Sōunzan, bajar en funicular a Gōra y tomar el tren Hakone Tozan a Hakone-Yumoto. Tiempos estimados con transbordos; usad el pase y guardad margen por colas o cambios de servicio."},
        {time:"15:50–16:20 aprox.",icon:"🏨",type:"VUELTA AL RYOKAN",title:"Hakone-Yumoto → Fukuzumiro",text:"Recoger el equipaje y caminar unos 15 minutos hasta Fukuzumiro, o tomar un taxi/minibús si vais cansados. Llegar con margen para hacer el check-in antes de las 18:00."},
        {time:"16:20–18:00",icon:"♨️",type:"RYOKAN",title:"Check-in, onsen y descanso",text:"Instalaros y disfrutar del onsen con calma. El recorrido es intenso; esta pausa protege la tarde y la cena incluida."},
        {time:"18:00",icon:"🍱",type:"CENA INCLUIDA",title:"Cena en Fukuzumiro",text:"Cena kaiseki del ryokan. Como tenéis dos habitaciones reservadas, confirmad si servirán la comida en cada habitación o en una sala común."}
      ],
      note:"🌊 Esta es una jornada ambiciosa pero posible si salís temprano y los transportes funcionan con normalidad. El 23 de mayo de 2027 cae en domingo, así que esperad más gente y posibles colas. Si el tiempo o las esperas se complican, prioridad: lago Ashi + Hakone-jinja; elegid entre crucero u Ōwakudani y no apuréis la llegada al ryokan, que pide estar allí antes de las 18:00. Confirmad horarios y equipaje con el alojamiento."
    },
    "24": {
      title:"Hakone → Kioto · Gion y Pontocho",
      intro:"Salida por la mañana para llegar a Kioto con tiempo, dejar el equipaje y conocer Gion y Pontocho por la tarde-noche.",
      stops:[
        {time:"07:30–08:40",icon:"🍱",type:"DESAYUNO + CHECK-OUT",title:"Fukuzumiro",text:"Desayunar con calma, preparar las maletas y dejar la habitación antes de las 10:00. El plan de transporte utiliza el minibús compartido de las 09:10 aprox. en Fukuzumiro; si no coincide o no hay plaza, caminad 15 minutos o pedid un taxi."},
        {time:"09:10–09:20 aprox.",icon:"🚌",type:"MINIBÚS COMPARTIDO",title:"Fukuzumiro → Hakone-Yumoto",text:"Subir en la parada del ryokan al minibús compartido de Tōnosawa. El horario publicado ahora sale de Hakone-Yumoto a las 09:08, pasa por Fukuzumiro hacia las 09:10 y vuelve a la estación hacia las 09:18. Confirmad que siga vigente en mayo de 2027."},
        {time:"09:20–09:45 aprox.",icon:"🚃",type:"HAKONE TOZAN",title:"Hakone-Yumoto → Odawara",text:"Tomar el tren local a Odawara. Con el Hakone Freepass de dos días comprado para comenzar en Odawara, este tramo local queda cubierto durante su vigencia."},
        {time:"09:45–12:00 aprox.",icon:"🚄",type:"SHINKANSEN",title:"Odawara → Kyoto Station",text:"Enlazar en Odawara con el Tokaido Shinkansen hasta Kyoto Station. El horario exacto de mayo de 2027 aún no está publicado; comprad un tren que deje margen para el enlace."},
        {time:"12:00–13:00",icon:"🏠",type:"LLEGADA",title:"Kyoto Station y equipaje",text:"Traslado al alojamiento de Minami-ku. Si la habitación aún no está disponible, dejar las maletas y comenzar la visita; check-in desde las 16:00."},
        {time:"13:00–14:00",icon:"🍜",type:"COMIDA",title:"Almuerzo y traslado a Gion",text:"Comer por Kyoto Station o Gion y desplazarse al distrito histórico. Nishiki Market queda como desvío opcional si llegáis con margen."},
        {time:"14:00–17:30",icon:"🏮",type:"BARRIO HISTÓRICO",title:"Gion · Yasaka-jinja · Hanamikoji",text:"Pasear por Gion, visitar Yasaka-jinja y recorrer Hanamikoji con respeto por las calles residenciales y las normas locales."},
        {time:"17:30–19:00",icon:"🌉",type:"PASEO",title:"Río Kamo y Pontocho",text:"Caminar hacia el río Kamo y recorrer el estrecho callejón de Pontocho."},
        {time:"19:00–21:00",icon:"🍜",type:"CENA",title:"Cena en Pontocho o Gion",text:"Cena en la zona y regreso al alojamiento. Si el viaje se retrasa, acortar Gion y conservar la cena tranquila."}
      ],
      note:"🚄 Las horas de tren son aproximadas y dependen del horario de 2027. El día anterior ya incluye el circuito principal de Hakone, así que esta mañana es para desayunar, salir antes de las 10:00 y viajar a Kioto. Nishiki es opcional: id solo si llegáis con margen, dejáis el equipaje y aún os apetece pasear."
    },
    "25": {
      title:"Tenjin-san + Kinkaku-ji",
      intro:"Mañana de mercado tradicional en Kitano Tenmangu, que celebra su feria mensual el día 25, seguida de Kinkaku-ji, ambos en el noroeste de Kioto.",
      stops:[
        {time:"07:00–08:00",icon:"🚌",type:"TRASLADO",title:"Alojamiento → Kitano Tenmangu",text:"Salir temprano hacia Kitano Tenmangu. La duración depende del bus, los enlaces y el tráfico."},
        {time:"08:00–10:30",icon:"🛍️",type:"MERCADO TRADICIONAL",title:"Tenjin-san",text:"Recorrer los puestos de antigüedades, ropa, objetos usados y comida. El mercado suele celebrarse desde primera hora hasta la tarde; confirmar la edición de 2027 y tener en cuenta el tiempo."},
        {time:"10:30–11:00",icon:"🚌",type:"TRASLADO",title:"Kitano Tenmangu → Kinkaku-ji",text:"Desplazamiento corto dentro del noroeste de Kioto; consultar bus o taxi según el tiempo de espera."},
        {time:"11:00–12:30",icon:"✨",type:"TEMPLO",title:"Kinkaku-ji · Pabellón Dorado",text:"Visitar el recinto y su recorrido circular."},
        {time:"12:30–13:30",icon:"🍜",type:"COMIDA",title:"Almuerzo por la zona",text:"Comer cerca de Kinkaku-ji o Kitano Tenmangu antes de regresar."},
        {time:"13:30–14:30 aprox.",icon:"🚇",type:"REGRESO",title:"Vuelta al alojamiento",text:"Volver en bus y metro o taxi. La tarde queda libre para descansar o pasear sin cruzar de nuevo la ciudad."}
      ],
      note:"🛍️ Tenjin-san se celebra cada día 25 en Kitano Tenmangu. Los puestos pueden variar o reducirse por lluvia; confirmad los detalles antes de salir."
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
      title:"Fushimi Inari + Kiyomizu-dera + Ginkaku-ji",
      intro:"Jornada larga, organizada de sur a norte por el este de Kioto: Fushimi Inari, Higashiyama, Ginkaku-ji y el Camino del Filósofo.",
      stops:[
        {time:"06:00–06:30",icon:"🚇",type:"TRASLADO",title:"Alojamiento → Fushimi Inari",text:"Salir temprano desde Kujo y llegar a Inari Station en metro y JR Nara Line."},
        {time:"06:30–08:30",icon:"⛩️",type:"SANTUARIO",title:"Fushimi Inari Taisha",text:"Recorrer los torii y el tramo de montaña que os apetezca; no hace falta subir hasta la cima para disfrutar de la visita."},
        {time:"08:30–09:15",icon:"🚆",type:"TRASLADO",title:"Fushimi Inari → Kiyomizu-dera",text:"Ir en JR Nara Line hasta Tofukuji, enlazar con Keihan hasta Kiyomizu-Gojo y subir a pie al templo."},
        {time:"09:15–11:30",icon:"🏯",type:"TEMPLO",title:"Kiyomizu-dera",text:"Visitar el templo y sus miradores; prever colas, escaleras y la cuesta de acceso."},
        {time:"11:30–13:30",icon:"🍜",type:"PASEO + COMIDA",title:"Higashiyama · Sannenzaka · Ninenzaka",text:"Bajar por las calles históricas, pasar por Yasaka-no-tō y comer en la zona. Omitimos Maruyama y Gion para no repetir la visita del día 24."},
        {time:"13:30–14:15",icon:"🚌",type:"TRASLADO",title:"Higashiyama → Ginkaku-ji",text:"Traslado en bus o taxi hacia Ginkaku-ji. Consultar la ruta en Maps y contar con margen por el tráfico."},
        {time:"14:15–15:15",icon:"🏯",type:"TEMPLO",title:"Ginkaku-ji · Pabellón de Plata",text:"Recorrer el jardín y los senderos del templo. Llegar con margen antes del cierre."},
        {time:"15:15–16:00",icon:"🌿",type:"PASEO",title:"Camino del Filósofo",text:"Pasear hacia el sur por el tramo que os apetezca; podéis acortarlo si el día se alarga."},
        {time:"Desde las 16:00",icon:"🚍",type:"REGRESO",title:"Vuelta al alojamiento",text:"Desde el punto donde terminéis, volver en bus y metro o tomar un taxi si preferís descansar."}
      ],
      note:"👟 Es el día más intenso de Kioto: empezad temprano, haced una visita breve a Fushimi Inari y acortad el Camino del Filósofo si hace falta. Los horarios de apertura y transporte se confirmarán antes del viaje."
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
      title:"Osaka tradicional · castillo, mercado y barrios",
      intro:"Día completo siguiendo una ruta por Osaka: Osaka Castle, Kuromon Market, Den Den Town/Nipponbashi y Shinsekai.",
      stops:[
        {time:"08:00–09:00",icon:"🚆",type:"OSAKA TRADICIONAL",title:"Salida hacia Osaka Castle",text:"Desplazarse al castillo al comienzo del día para aprovechar la mañana."},
        {time:"09:00–11:30",icon:"🏯",type:"CASTILLO",title:"Osaka Castle",text:"Visitar el parque y, si interesa, el museo interior. Revisar horarios y entradas antes del viaje."},
        {time:"11:30–12:00",icon:"🚇",type:"TRASLADO",title:"Hacia Kuromon Market",text:"Traslado al mercado de Kuromon."},
        {time:"12:00–13:30",icon:"🍣",type:"MERCADO + COMIDA",title:"Kuromon Market",text:"Probar comida local y almorzar en el mercado, atendiendo a los horarios de los puestos."},
        {time:"13:30–14:00",icon:"🚶",type:"TRASLADO",title:"Kuromon → Nipponbashi",text:"Caminar hacia Den Den Town, en el área de Nipponbashi."},
        {time:"14:00–16:30",icon:"🎮",type:"BARRIO",title:"Den Den Town · Nipponbashi",text:"Tiendas de electrónica, videojuegos, manga y coleccionismo."},
        {time:"16:30–17:00",icon:"🚶",type:"TRASLADO",title:"Nipponbashi → Shinsekai",text:"Caminar o tomar transporte local hacia Shinsekai."},
        {time:"17:00–20:00",icon:"🏮",type:"BARRIO",title:"Shinsekai y Tsūtenkaku",text:"Pasear por Shinsekai, ver Tsūtenkaku desde el exterior o subir si apetece y cenar kushikatsu."}
      ],
      note:"🏯 Ruta del día en este orden: Osaka Castle → Kuromon Market → Den Den Town/Nipponbashi → Shinsekai. Es una jornada larga; recortad las paradas según energía y horarios."
    }
  };


  const itineraryRoutes = {
    "18": [{label:"Yanaka Ginza · barrio del alojamiento",points:[{label:"Yanaka Ginza",query:"Yanaka Ginza Shopping Street, Tokyo, Japan"}]}],
    "19": [{label:"Asakusa · Ueno · Akihabara",points:[{label:"Sensō-ji",query:"Sensoji Temple, Taito City, Tokyo, Japan"},{label:"Parque Ueno",query:"Ueno Park, Taito City, Tokyo, Japan"},{label:"Akihabara",query:"Akihabara, Tokyo, Japan"}]}],
    "20": [{label:"Toyosu · Odaiba · Shibuya",points:[{label:"Mercado de Toyosu",query:"Toyosu Market, Tokyo, Japan"},{label:"DiverCity Tokyo Plaza · Odaiba",query:"DiverCity Tokyo Plaza, Tokyo, Japan"},{label:"Shibuya Crossing",query:"Shibuya Scramble Crossing, Tokyo, Japan"}]}],
    "21": [{label:"Meiji Jingu · Harajuku · Kabuki-za · Shinjuku",points:[{label:"Meiji Jingu",query:"Meiji Jingu, Shibuya, Tokyo, Japan"},{label:"Takeshita Street · Harajuku",query:"Takeshita Street, Harajuku, Tokyo, Japan"},{label:"Omotesando",query:"Omotesando, Tokyo, Japan"},{label:"Kabuki-za",query:"Kabukiza Theatre, Ginza, Tokyo, Japan"},{label:"Shinjuku · Kabukicho",query:"Kabukicho, Shinjuku, Tokyo, Japan"}]}],
    "22": [{label:"Nikko · templos y lago",points:[{label:"Santuario Tōshō-gū",query:"Nikko Toshogu Shrine, Nikko, Tochigi, Japan"},{label:"Puente Shinkyō",query:"Shinkyo Bridge, Nikko, Tochigi, Japan"},{label:"Lago Chūzenji",query:"Lake Chuzenji, Nikko, Tochigi, Japan"},{label:"Cascada Kegon",query:"Kegon Falls, Nikko, Tochigi, Japan"}]}],
    "23": [{label:"Lago Ashi · Hakone-jinja · Ōwakudani",points:[{label:"Moto-Hakone · orilla del lago Ashi",query:"Moto-Hakone Port, Hakone, Japan"},{label:"Hakone-jinja · torii de la paz",query:"Hakone Shrine, Motohakone, Hakone, Japan"},{label:"Togendai · lago Ashi",query:"Togendai Port, Hakone, Japan"},{label:"Ōwakudani",query:"Owakudani, Hakone, Japan"}]}],
    "24": [{label:"Nishiki opcional · Gion · Pontocho",points:[{label:"Nishiki Market · opcional para comer",query:"Nishiki Market, Nakagyo Ward, Kyoto, Japan"},{label:"Yasaka-jinja",query:"Yasaka Shrine, Kyoto, Japan"},{label:"Hanamikoji Street",query:"Hanamikoji Street, Gion, Kyoto, Japan"},{label:"Pontocho",query:"Pontocho Alley, Kyoto, Japan"}]}],
    "25": [{label:"Tenjin-san · Kitano Tenmangu · Kinkaku-ji",points:[{label:"Tenjin-san · mercado en Kitano Tenmangu",query:"Kitano Tenmangu Shrine, Kyoto, Japan"},{label:"Kinkaku-ji · Pabellón Dorado",query:"Kinkakuji Temple, Kyoto, Japan"}]}],
    "26": [{label:"Arashiyama · bosque · Tenryū-ji · río",points:[{label:"Bosque de bambú",query:"Arashiyama Bamboo Grove, Kyoto, Japan"},{label:"Tenryū-ji",query:"Tenryu-ji Temple, Kyoto, Japan"},{label:"Puente Togetsukyō",query:"Togetsukyo Bridge, Kyoto, Japan"}]}],
    "27": [{label:"Nara Park · templos · Naramachi",points:[{label:"Nara Park",query:"Nara Park, Nara, Japan"},{label:"Tōdaiji",query:"Todaiji Temple, Nara, Japan"},{label:"Kasuga Taisha",query:"Kasuga Taisha, Nara, Japan"},{label:"Kōfuku-ji",query:"Kofukuji Temple, Nara, Japan"},{label:"Naramachi",query:"Naramachi, Nara, Japan"}]}],
    "28": [{label:"Fushimi · Higashiyama · Ginkaku-ji",points:[{label:"Fushimi Inari Taisha",query:"Fushimi Inari Taisha, Kyoto, Japan"},{label:"Kiyomizu-dera",query:"Kiyomizu-dera, Kyoto, Japan"},{label:"Sannenzaka",query:"Sannenzaka, Kyoto, Japan"},{label:"Ninenzaka",query:"Ninenzaka, Kyoto, Japan"},{label:"Yasaka-no-tō",query:"Yasaka Pagoda Hokanji Temple, Kyoto, Japan"},{label:"Ginkaku-ji · Pabellón de Plata",query:"Ginkakuji Temple, Kyoto, Japan"},{label:"Camino del Filósofo",query:"Philosopher's Path, Kyoto, Japan"}]}],
    "29": [{label:"Osaka · Shinsaibashi · Namba",points:[{label:"Shinsaibashi-suji",query:"Shinsaibashi-suji Shopping Street, Osaka, Japan"},{label:"Hozenji Yokocho",query:"Hozenji Yokocho, Osaka, Japan"},{label:"Dotonbori",query:"Dotonbori, Osaka, Japan"},{label:"Namba",query:"Namba, Osaka, Japan"}]}],
    "30": [{label:"Osaka tradicional · castillo · Minami · Shinsekai",points:[{label:"Osaka Castle",query:"Osaka Castle, Osaka, Japan"},{label:"Kuromon Market",query:"Kuromon Ichiba Market, Osaka, Japan"},{label:"Den Den Town · Nipponbashi",query:"Den Den Town, Nipponbashi, Osaka, Japan"},{label:"Shinsekai",query:"Shinsekai, Osaka, Japan"}]}],
    "31": [{label:"Osaka · salida hacia Kansai (KIX)",points:[{label:"Aeropuerto Internacional de Kansai (KIX)",query:"Kansai International Airport, Osaka, Japan"}]}]
  };
  function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}
const accommodationByDay={
  "18":{label:"Alojamiento · Yanaka, Tokio",query:"Yanaka, Taito City, Tokyo 110-0001, Japan"},
  "19":{label:"Alojamiento · Yanaka, Tokio",query:"Yanaka, Taito City, Tokyo 110-0001, Japan"},
  "20":{label:"Alojamiento · Yanaka, Tokio",query:"Yanaka, Taito City, Tokyo 110-0001, Japan"},
  "21":{label:"Alojamiento · Yanaka, Tokio",query:"Yanaka, Taito City, Tokyo 110-0001, Japan"},
  "22":{label:"Alojamiento · Yanaka, Tokio",query:"Yanaka, Taito City, Tokyo 110-0001, Japan"},
  "23":{label:"Alojamiento · Fukuzumiro",query:"Fukuzumiro Ryokan, Tounosawa, Hakone, Japan"},
  "24":{label:"Alojamiento · Minami-ku, Kioto",query:"34 Higashikujō Higashigoryōchō, Minami-ku, Kyoto 601-8028, Japan"},
  "25":{label:"Alojamiento · Minami-ku, Kioto",query:"34 Higashikujō Higashigoryōchō, Minami-ku, Kyoto 601-8028, Japan"},
  "26":{label:"Alojamiento · Minami-ku, Kioto",query:"34 Higashikujō Higashigoryōchō, Minami-ku, Kyoto 601-8028, Japan"},
  "27":{label:"Alojamiento · Minami-ku, Kioto",query:"34 Higashikujō Higashigoryōchō, Minami-ku, Kyoto 601-8028, Japan"},
  "28":{label:"Alojamiento · Minami-ku, Kioto",query:"34 Higashikujō Higashigoryōchō, Minami-ku, Kyoto 601-8028, Japan"},
  "29":{label:"Alojamiento · Naniwa-ku, Osaka",query:"3-chōme-12-21 Nanbanaka, Naniwa Ward, Osaka 556-0011, Japan",position:"end"},
  "30":{label:"Alojamiento · Naniwa-ku, Osaka",query:"3-chōme-12-21 Nanbanaka, Naniwa Ward, Osaka 556-0011, Japan"},
  "31":{label:"Alojamiento · Naniwa-ku, Osaka",query:"3-chōme-12-21 Nanbanaka, Naniwa Ward, Osaka 556-0011, Japan"}
};
function routePlaces(route,day){
  const points=[...(route.points||[])],home=accommodationByDay[day];
  if(!home)return points;
  const homePoint={...home,isAccommodation:true};
  if(day==="23")return [homePoint,...points.filter(point=>point.label!=="Fukuzumiro")];
  if(day==="29")return [{label:"Alojamiento · Minami-ku, Kioto",query:"34 Higashikujō Higashigoryōchō, Minami-ku, Kyoto 601-8028, Japan",isAccommodation:true},...points,homePoint];
  return home.position==="end"?[...points,homePoint]:[homePoint,...points];
}
function googleMapsDayRouteUrl(route,day){
  const points=routePlaces(route,day);
  if(!points.length)return "https://maps.google.com/";
  const params=new URLSearchParams({api:"1"});
  if(points.length===1)params.set("destination",points[0].query);
  else{
    params.set("origin",points[0].query);
    params.set("destination",points[points.length-1].query);
    if(points.length>2)params.set("waypoints",points.slice(1,-1).map(point=>point.query).join("|"));
  }
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
const GOOGLE_MY_MAPS_BY_DAY={
  "18":"1sviLZO9Nmj6jXUJ457jGdccEAbP7oiA",
  "19":"1jiWCmREUQg67rac9-Ikix2X7ZhlV8Bw",
  "20":"1wkobYwjZ-yKqiWTnaubSP3fXSEu0iH4",
  "21":"1Bzfr2IvYGD5LdWWEL7Jd7ll7g9od3Ik",
  "22":"1K9W8fymTjdVBCrSXJEDf8k7hRf0-DnI",
  "23":"1P-OgyXIKeoaZk_ox4WUrzbeykdjJXI0",
  "24":"1fQvE5jBH9ObSne-p7pJrAbkXCdGo1iw",
  "25":"1gq30es1AzidejB-hrhTDI3ZO-3NlisY",
  "26":"1E7eL_saVLtumNTUz18-JDfvaULooUqU",
  "27":"1Eg51rKdrbbHFUVuCYzk38yMVUymtcrQ",
  "28":"1cch-iYzSbqCbnwxCqFjs5PvgYibHoMQ",
  "29":"1flIg6wfccQhhinxi-jVX-uC8tew0-ng",
  "30":"1hLA8XaAGm2_BLbIe2oGJBS02BfAFB5E",
  "31":"1xVDlh0GLPiu2fV5-Fa7UNFi6Q5zZteo"};
function googleMyMapEmbedUrl(mapId){return `https://www.google.com/maps/d/embed?mid=${encodeURIComponent(mapId)}`;}
function googleMyMapViewUrl(mapId){return `https://www.google.com/maps/d/viewer?mid=${encodeURIComponent(mapId)}`;}
function renderItineraryRoutes(day){
  const routes=itineraryRoutes[day]; if(!routes) return "";
  const myMapId=GOOGLE_MY_MAPS_BY_DAY[day];
  const dayMapUrl=myMapId?googleMyMapViewUrl(myMapId):googleMapsDayRouteUrl(routes[0],day),home=accommodationByDay[day];
  const homeUrl=home?`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(home.query)}`:"";
  return `<section class="itinerary-routes"><div class="itinerary-routes-head"><div><div class="itinerary-type">PUNTOS DEL RECORRIDO</div><h4>🗺️ Itinerario en Google Maps</h4></div><div class="itinerary-routes-actions"><a class="itinerary-google-open" href="${dayMapUrl}" target="_blank" rel="noopener noreferrer">Abrir mapa de este día ↗</a>${home?`<a class="itinerary-google-open itinerary-home-open" href="${homeUrl}" target="_blank" rel="noopener noreferrer">🏠 Ver alojamiento ↗</a>`:""}</div></div>${routes.map(route=>{
    const points=routePlaces(route,day),mapUrl=googleMapsDayRouteUrl(route,day);
    return `<article class="itinerary-map-card"><h5>${escapeHTML(route.label)}</h5><div class="itinerary-map-layout"><ol class="itinerary-place-list">${points.map((point,pi)=>{
      const letter=String.fromCharCode(65+points.slice(0,pi).filter(p=>!p.isAccommodation).length),searchUrl=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(point.query)}`;
      return `<li><a class="itinerary-place-link${point.isAccommodation?" itinerary-accommodation-link":""}" href="${searchUrl}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${escapeHTML(point.label)} en Google Maps"><span class="itinerary-place-letter">${point.isAccommodation?'<img src="assets/Iconopene.png" alt="" class="itinerary-accommodation-icon">':letter}</span><span>${escapeHTML(point.label)}</span></a></li>`;
    }).join("")}</ol>${myMapId?`<div class="itinerary-google-map-wrap"><iframe class="itinerary-google-map" src="${googleMyMapEmbedUrl(myMapId)}" title="Mapa My Maps del día ${day}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`:`<div class="itinerary-google-map-wrap itinerary-google-route-card"><div class="itinerary-route-sequence">${points.map((point,pi)=>`<span><b class="${point.isAccommodation?"itinerary-sequence-accommodation":""}">${point.isAccommodation?'<img src="assets/Iconopene.png" alt="" class="itinerary-accommodation-icon">':String.fromCharCode(65+points.slice(0,pi).filter(p=>!p.isAccommodation).length)}</b>${escapeHTML(point.label)}</span>`).join("<i>→</i>")}</div><p>Este mapa muestra el alojamiento y las paradas de este día, en el orden del itinerario.</p><a class="itinerary-google-open" href="${mapUrl}" target="_blank" rel="noopener noreferrer">Ver este día en Google Maps ↗</a></div>`}</div>${myMapId?`<p class="itinerary-map-status">Este mapa se carga desde My Maps. Los cambios que guardes en el mapa aparecerán aquí al recargar la web.</p>`:""}</article>`;
  }).join("")}<p class="itinerary-route-note">El símbolo morado identifica el alojamiento; las demás paradas conservan las letras A, B, C… del recorrido.</p></section>`;
}
  function renderItineraryDay(d,i){
    const detail=tokyoPlan[d[0]];
    if(!detail) return `<article class="item itinerary-day"><div class="item-head itinerary-day-head"><div class="itinerary-day-main"><span class="itinerary-day-date">${d[0]} MAYO</span><span class="itinerary-day-city">${d[1]}</span><h3>📍 ${d[2]}</h3><div class="muted">Pulsa para desplegar el itinerario completo</div></div><span class="itinerary-day-chevron">⌄</span></div><div class="item-body"><p class="muted">Día de regreso: consulta Transportes para ver el traslado al aeropuerto y abre la ruta en Google Maps.</p>${renderItineraryRoutes(d[0])}</div></article>`;
    return `<article class="item itinerary-day"><div class="item-head itinerary-day-head"><div class="itinerary-day-main"><span class="itinerary-day-date">${d[0]} MAYO</span><span class="itinerary-day-city">${d[1]}</span><h3>📍 ${detail.title}</h3><div class="muted">${detail.intro}</div></div><span class="itinerary-day-chevron">⌄</span></div><div class="item-body"><div class="itinerary-timeline">${detail.stops.map(s=>`<div class="itinerary-stop"><div class="itinerary-time">${s.time}</div><div class="itinerary-dot">${s.icon}</div><div class="itinerary-content"><div class="itinerary-type">${s.type}</div><h4>${s.title}</h4><p>${s.text}</p>${s.tags?`<div class="chips">${s.tags.map(t=>`<span class="chip">${t}</span>`).join("")}</div>`:""}</div></div>`).join("")}</div><div class="itinerary-note">${detail.note}</div>${renderItineraryRoutes(d[0])}</div></article>`;
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
  function renderDetail(){const d=TRIP.days.find(x=>x[0]===selected);detail.innerHTML=`<div class="panel"><div class="eyebrow">${selected} MAYO 2027</div><h2>📍 ${d[1]}</h2><div class="event"><strong>PLAN</strong>${d[2]}</div><div class="muted" style="margin-top:12px">Consulta Itinerario para ver las actividades y horarios completos, y Transportes para los desplazamientos.</div></div>`}
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
