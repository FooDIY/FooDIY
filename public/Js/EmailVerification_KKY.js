function reconfirm(){
    var item = {
        email: email
    };
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/reconfirm",
        data: item,
        success: function (data) {
            $("#reconfirmbutton").hide();
            $("#reconfirmtext").html("입력하신 메일 주소로 새로운 인증 메일을 보냈습니다.");
            //$('#mail_confirm').modal('show');
            //$('#pop-up-login').modal('toggle');

        }
    });
}
