/**
 * Created by 순우 on 2017-11-07.
 */

function myMap() {
    var mapCanvas = document.getElementById("map");
    var myCenter = new google.maps.LatLng(36.6251, 127.45718299999999);
    var marker = new google.maps.Marker({position:myCenter});
    var mapOptions = {
        center: myCenter,
        zoom: 14
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
    marker.setMap(map);

    google.maps.event.addListener(marker,'click',function() {
        map.setZoom(17);
        map.setCenter(marker.getPosition());
    });
}