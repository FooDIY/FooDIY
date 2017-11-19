/**
 * Created by Sehyeon on 2017-11-20.
 */
function LogOut() {
    var item;
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/logout",
        data: item,
        success: function (data) {
            if (data == "clear")
                location.reload();
        }
    });
}