/**
 * Created by 순우 on 2017-07-15.
 */
$('.nav-show').hide();

$("li:has(ul)").click(function(){
    if($(this).hasClass('open')) {
        $(this).removeClass('open').find('ul').slideUp();
    }
    else {
        $(this).addClass('open').find('ul').slideDown();
    }
});
function delmenu(val){
    var item = {menuid:val.menuid.value};

    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/del_menu",
        data: item,
        success: function (data) {
            if(data=="clear")
                location.reload();
                alert("삭제되었습니다.")
        }
    });
}