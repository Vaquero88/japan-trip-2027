
const TRIP = {
  flights: [
    {date:"17 mayo 2027",route:"Madrid → Chengdu",from:"MAD",to:"TFU",airline:"Sichuan Airlines",number:"3U3804",depart:"11:05",arrive:"05:00 · 18 mayo",duration:"11 h 55 min",class:"Turista"},
    {date:"18 mayo 2027",route:"Chengdu → Tokio",from:"TFU",to:"NRT",airline:"Sichuan Airlines",number:"3U3961",depart:"09:15",arrive:"15:10",duration:"4 h 55 min",class:"Turista"},
    {date:"31 mayo 2027",route:"Osaka → Pekín",from:"KIX",to:"PEK",airline:"Air China",number:"CA162",depart:"09:05",arrive:"11:25",duration:"3 h 20 min",class:"Turista"},
    {date:"31 mayo 2027",route:"Pekín → Madrid",from:"PEK",to:"MAD",airline:"Air China",number:"CA897",depart:"15:00",arrive:"21:00",duration:"12 h",class:"Turista"}
  ],
  stays: [
    {city:"Tokio",name:"Alojamiento en Taito City",dates:"18 → 23 mayo",nights:"5 noches",price:"775,90 €",host:"Takamitsu",address:"Yanaka, Taito City, Tokyo 110-0001",checkin:"Desde las 15:00",checkout:"Antes de las 12:00",map:"https://www.google.com/maps/search/?api=1&query=Yanaka%2C%20Taito%20City%2C%20Tokyo%20110-0001",link:"https://www.airbnb.es/rooms/855280925274837676?guests=1&adults=1&s=67&unique_share_id=ec552d18-fe2e-41a2-80d8-114f9f1202e1",notes:"Llegada con recepción del anfitrión. Devolver la llave dejándola en el buzón. Silencio 23:00–07:00."},
    {city:"Hakone",name:"Fukuzumiro",dates:"23 → 24 mayo",nights:"1 noche",price:"890,22 €",host:"Fukuzumiro",address:"Tounosawa 74, Hakone, Kanagawa, Japón",checkin:"23 mayo · 15:00–18:00",checkout:"24 mayo · antes de las 10:00",map:"https://www.google.com/maps/search/?api=1&query=Fukuzumiro%2C%20Tounosawa%2074%2C%20Hakone",link:"https://www.booking.com/hotel/jp/fukuzumiro.es.html",notes:"4 personas en dos reservas: Sakura #5 y Sakura #6. Desayuno y cena incluidos. Tel. +81 460 85 5301."},
    {city:"Kioto",name:"Alojamiento en Minami-ku",dates:"24 → 29 mayo",nights:"5 noches",price:"617,17 €",host:"Eric",address:"34 Higashikujō Higashigoryōchō, Minami-ku, Kyoto 601-8028, Japón",checkin:"24 mayo · 16:00–23:00",checkout:"29 mayo · antes de las 10:00",map:"https://www.google.com/maps/search/?api=1&query=34%20Higashikuj%C5%8D%20Higashigory%C5%8Dch%C5%8D%2C%20Minami-ku%2C%20Kyoto",link:"https://www.airbnb.es/rooms/45213547",notes:"Llegada con recepción del anfitrión. No mascotas. No fumar. Devolver la llave a la caja de llaves."},
    {city:"Osaka",name:"Alojamiento en Naniwa Ward",dates:"29 → 31 mayo",nights:"2 noches",price:"130,57 €",host:"Host Manager.X",address:"3-chōme-12-21 Nanbanaka, Naniwa Ward, Osaka 556-0011, Japón",checkin:"29 mayo · desde las 16:00",checkout:"31 mayo · antes de las 11:00",map:"https://maps.app.goo.gl/w8webNRqCwTn9Ntk7",link:"https://www.airbnb.es/rooms/1588986158819682405?guests=1&adults=1&s=67&unique_share_id=4107fcb3-40cc-4018-95b6-e9c7c93ccd7d",notes:"Entrada autónoma con caja de seguridad. Habitación 502, 5.º piso. Pizza Hut en planta baja y gasolinera al lado. Silencio 21:00–07:00. Check-out tardío: 1.000 ¥/hora si está disponible."}
  ],
  days: [
    ["18","Tokio","✈️ Llegada a Narita · Shibuya"],
    ["19","Tokio","⛩️ Asakusa · 🎮 Akihabara"],
    ["20","Tokio","🐟 Toyosu · 🌊 Odaiba · 🌃 Kabukicho"],
    ["21","Tokio","⛩️ Meiji · Harajuku · Shibuya/Ueno"],
    ["22","Nikko","⛩️ Toshogu · 🌊 Lago Chuzenji / Kegon"],
    ["23","Hakone","🚆 Tokio → Hakone · ♨️ Fukuzumiro"],
    ["24","Kioto","🚄 Hakone → Kioto · Gion · Pontocho"],
    ["25","Kioto","⛩️ Fushimi Inari · Kiyomizu-dera"],
    ["26","Kioto","🎋 Arashiyama · Tenryu-ji"],
    ["27","Nara / Uji","🦌 Nara · ⛩️ Todai-ji · alternativa Uji"],
    ["28","Kioto","🏯 Kinkaku-ji / Ginkaku-ji · tarde libre"],
    ["29","Osaka","🚆 Kioto → Osaka · Dotonbori"],
    ["30","Osaka","🎢 Universal / 🏯 Castillo / 🎮 Den Den Town"],
    ["31","Osaka → Madrid","✈️ KIX → Pekín → Madrid"]
  ]
};
