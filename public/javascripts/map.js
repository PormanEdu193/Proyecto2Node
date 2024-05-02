
var map = L.map('mainMap');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var zoom = 13;

        console.log("Su posicion: " + lat + ", " + lon);
        map.setView([lat, lon], zoom);

        // Dentro de la función de éxito de getCurrentPosition, realizamos la solicitud AJAX
        $.ajax({
            dataType: "json",
            url: '/api/bicyclesApi',
            success: function(result){
                console.log(result);
                result.bicycles.forEach(function(bicycle){
                    L.marker(bicycle.location, {title: bicycle.id}).addTo(map);
                });
            }
        });
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}
