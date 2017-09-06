$(document).ready(function(){
  msgcheck();
});

function msgcheck() {
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/msg_check",
        success: function (data) {
            if (data>0) {
                alert(data+'개의 새로운 메세지가 도착했습니다.');
            }
        }
    });
}
