/**
 * Created by Sehyeon on 2017-11-18.
 */
function submitmenu(val){
    var item = {menu_name: val.menu_name.value, price:val.price.value, minTime:val.time1.value, maxTime:val.time2.value, content: val.content.value, menu_pic:val.menu_pic.value,
        ingre_pic:val.ingre_pic.value, ingre_name:val.ingre_name.value,
        madeby:val.madeby.value};
    alert(val.time1.value);
    jQuery.ajaxSettings.traditional=true;
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/submit_menu",
        data: item,
        success: function (data) {
            if (data == "clear") {
                location.replace("/seller");
            }
            else {
                $("#submitmenufail").html(data);
                $("#submitmenufail").css("color", "red");
                return false;
            }
        }
    });
}