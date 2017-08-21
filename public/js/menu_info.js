/**
 * Created by Sehyeon on 2017-08-07.
 */
function myMap(x,y) {
    var center = new google.maps.LatLng(x, y);
    if(!x) {
        var mapOptions = {
            center: new google.maps.LatLng(37, 127),
            zoom: 10,
            //mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    }
    else {
        var mapOptions = {
            center: center,
            zoom: 15,
            disableDefaultUI:true,
            navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
            //mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var myCity = new google.maps.Circle({
        center:center,
        radius:200,
        strokeColor:"#0000FF",
        strokeOpacity:0.8,
        strokeWeight:2,
        fillColor:"#0000FF",
        fillOpacity:0.1
    });

    myCity.setMap(map);
    //google.maps.event.addDomListener(window, 'load', initialize);
}

function premessage(session){
    if(!session)
    {
        //alert('로그인 해주세요');
        $("#loginfail").html('로그인이 필요한 서비스입니다.');
        $("#loginfail").css("color", "red");
        $('#pop-up-login').modal('toggle');
        return false;
    }
    return true;
}
//google.maps.event.addDomListener(window, 'load', initialize);
function comment(session){
    if(session==='null')
    {
        $("#loginfail").html('로그인이 필요한 서비스입니다.');
        $("#loginfail").css("color", "red");
        $('#pop-up-login').modal('toggle');
        return false;
    }
    var item = {
        text: $("#comment").val(),
        email: session,
        menunum: $("#menunum").val()
    };
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/menu_info/comment",
        data: item,
        success: function (data) {
            if (data == "clear") {
                location.reload(true);
            }
            else {
                alert(data);
            }
        }
    });
}