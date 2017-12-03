/**
 * Created by Sehyeon on 2017-12-03.
 */
function tableFix(val){
    //var item = {choice_mail: document.getElementById('agree_checkbox').value, tell: document.getElementById('phone_num').value, choice_sms:document.getElementById('agree_checkbox2').value, post:document.getElementById('zipNo').value, add1:document.getElementById('roadAddrPart1').value, add2:document.getElementById('addrDetail').value + " " + document.getElementById('roadAddrPart2').value, pointx:document.getElementById('entY').value, pointy:document.getElementById('entX').value};
    var item = {table_name: val.table_name.value, reservationType: val.reservationType.value, reservationTimeMin:val.reservationTimeMin.value, reservationTimeMax:val.reservationTimeMax.value,
        orderValueMin:val.orderValueMin.value, peopleCount:val.peopleCount.value, maxTime:val.maxTime.value, member_id:val.member_id.value, table_id:val.table_id.value};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/table_fix",
        data: item,
        success: function (data) {
            if (data === "clear") {
                location.replace("/seller/modify_profile");
            }
        }
    });
}