/**
 * Created by Sehyeon on 2017-11-19.
 */
function delmenu(val){
    var item = {menuid:val.menuid.value};

    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/del_menu",
        data: item,
        success: function (data) {
            if(data==="clear")
                location.reload();
            alert("삭제되었습니다.")
        }
    });
}

function is_selling(val){
    var item = {menuid:val.menuid.value};

    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/is_selling",
        data: item,
        success: function (data) {
            if(data==="clear")
                if(val.is_sell.checked===true) {
                    val.selling.value = "판매중";
                }
                else {
                    val.selling.value = "판매중지";
                }
        }
    });
}