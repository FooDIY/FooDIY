/**
 * Created by Sehyeon on 2017-12-06.
 */
function submit() {
    var mailing = document.getElementsByName("mailing");
    var item = {mailing:mailing[0].checked};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/users/profile",
        data: item,
        success: function (data) {
            if (data === "clear") {
                location.href='/';
            }
        }
    });

}