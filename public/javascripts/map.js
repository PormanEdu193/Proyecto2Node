var map = L.map('mainMap');
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let lat=0;
let lon=0; 
let zoom=0;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        zoom = 13;
        map.setView([lat, lon], zoom);
    }    
    );
}else{
    lat = 0;
    lon = 0;
    zoom = 2;
    map.setView([lat, lon], zoom);
}