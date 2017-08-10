/**
 * Created by Sehyeon on 2017-08-03.
 */
function submitseller(){
    var item = {choice_mail: document.getElementById('agree_checkbox').value, tell: document.getElementById('phone_num').value, choice_sms:document.getElementById('agree_checkbox2').value, post:document.getElementById('zipNo').value, add1:document.getElementById('roadAddrPart1').value, add2:document.getElementById('addrDetail').value + " " + document.getElementById('roadAddrPart2').value, pointx:document.getElementById('entY').value, pointy:document.getElementById('entX').value};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/submit_seller",
        data: item,
        success: function (data) {
            if (data == "clear") {
                location.replace("/seller/manage");
            }
            else {
                $("#signupfail").html(data);
                $("#signupfail").css("color", "red");
                return false;
            }
        }
    });
}