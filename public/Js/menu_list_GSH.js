/**
 * Created by 순우 on 2017-07-10.
 */

//var x = document.getElementById("demo");
var map;
var marker=[];
var infowindow=[];

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    //lat = position.coords.latitude;
    //lon = position.coords.longitude;
    var lat="36.174755";
    var lon="127.841779";
    latlon = new google.maps.LatLng(lat, lon);
    mapholder = document.getElementById('mapholder');
    mapholder.style.marginTop = '85px';
    mapholder.style.height = '100%';
    // mapholder.style.width = '465px';

    var myOptions = {
        center:latlon,zoom:8,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:false,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    };

    map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    /*map.addListener('bounds_changed', function() {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        var bounds = map.getBounds();
        var southWest = bounds.getSouthWest();
        var northEast = bounds.getNorthEast();
        var item={bigx:northEast.lat(),smallx:southWest.lat(),bigy:northEast.lng(),smally:southWest.lng()};
        var data=mapchange(item);
        //$("#items").empty();
        for(var j in marker)
        {
            marker[j].setMap(null);
        }
        for (var i in data) {

            tmpTag = '<a href="/menu_info/' + data[i]._id + '">\
                        <li data-lat="' + data[i].address.x + '" data-lon="' + data[i].address.y + '" class="items__item">\
                            <img src="' + data[i].image[0].image_url + '" alt="" class="items__img"/>\
                            <h3 class="items__title">' + data[i].menu_name + '</h3>\
                        </li>\
                    </a>';

            //$("#items").append(tmpTag);

            var datalatlon = new google.maps.LatLng(data[i].address.x, data[i].address.y);

            marker[i] = new google.maps.Marker({
                position: datalatlon,
                map: map,
                title: data[i].menu_name,
            });

            infowindow[i] = new google.maps.InfoWindow({
                content: data[i].menu_name,
                maxWidth: 300
            });

            marker[i].addListener('click', function () {
                infowindow[i].open(map, marker[i]);
            });
        }
    });*/
}
function mapchange(item) {
    var savedata;
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/map_change",
        data: item,
        async:false,
        success: function (data) {
            if (data == "nothing")
                alert("nothing");
            else{
                savedata=data;
            }
        }
    });
    return savedata;
}
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
}

function addMarker(x,y){
    var myCity = new google.maps.Marker({
        center:center,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#0000FF",
        fillOpacity:0.1
    });

    myCity.setMap(map);
}

// if (window.matchMedia("(max-width: 910px)").matches){
//     $("#gohome").addClass("col-xs-3");
//     $("#home_logo").addClass("img-responsive");
//     $(".hamburger").addClass("col-xs-2");
// }
//google.maps.event.addDomListener(window, 'load', initialize);
//mapholder.innerHTML = showPosition();
