/**
 * Created by Sehyeon on 2017-11-18.
 */
function submitmenu(val){
    var a = $("#tag").val();
    alert(a);
    var item = {menu_name: val.menu_name.value, price:val.price.value, minTime:val.time1.value, maxTime:val.time2.value, content: val.content.value, menu_pic:val.menu_pic.value,
        ingre_pic:val.ingre_pic.value, ingre_name:val.ingre_name.value,
        madeby:val.madeby.value, hash:a};
    alert(val.time1.value);
    jQuery.ajaxSettings.traditional=true;
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/submit_menu",
        data: item,
        success: function (data) {
            if (data === "clear") {
                location.replace("/seller");
            }
        }
    });
}

function add_item(){
    // pre_set 에 있는 내용을 읽어와서 처리..
    var div = document.createElement('div');
    div.innerHTML = document.getElementById('pre_set').innerHTML;
    document.getElementById('field').appendChild(div);
}

function remove_item(obj){
    // obj.parentNode 를 이용하여 삭제
    document.getElementById('field').removeChild(obj.parentNode);
}
