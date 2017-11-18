/**
 * Created by Sehyeon on 2017-11-18.
 */
function submitmenu(val){
    var item = {menu_name: val.name.value, price:val.price.value, minTime:val.time1.value, maxTime:val.time2.value, content: val.description.value, menu_pic:val.menu_pic.value, ingre_pic:val.ingre_pic.value, ingre_name:val.ingredent-name.value,
        madeby:val.from.value};

jQuery.ajaxSettings.traditional=true;
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/submit_menu",
        data: item,
        success: function (data) {
            if (data == "clear") {
                location.replace("/seller/manage");
            }
            else {
                $("#submitmenufail").html(data);
                $("#submitmenufail").css("color", "red");
                return false;
            }
        }
    });
}