var email;
function signuppass(val) {
    var item = {email: val.email.value, password: val.password.value,firstname:val.firstName.value,lastname:val.lastName.value};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/users/signup",
        data: item,
        success: function (data) {
            if (data == "clear") {
                location.replace('/users/Validation');
                // $("#reconfirmbutton").show();
                // $("#reconfirmtext").html("입력하신 메일 주소로 인증 메일을 보냈습니다. 인증 확인 후 최종 회원가입 처리가 완료됩니다.");
                // email=item.email;
                // $('#mail_confirm').modal('toggle');
                // $('#pop-up-sign').modal('toggle');
                //$("#temp_email").val(item.email);
                //location.reload();
            }
            else {
                $("#alert-messageIn").css({ opacity: 1 });
                $("#alert-messageIn").css("display", "block");
                $("#alert-messageIn").html(data);
                window.setTimeout(function(){
                  $(this).show();
                  $("#alert-messageIn").fadeTo(500,0).slideUp(500,function(){

                    $("#alert-messageIn").css("display", "none");
                  });
                },3000) ;
                return false;
            }
        }
    });
}

//에러메세지 테스트케이스
// $(document).ready(function(){
//   $("#alert-messageIn").css("display", "block");
//   $("#alert-messageIn").html("빰빰");
//   window.setTimeout(function(){
//     $("#alert-messageIn").fadeTo(500,0).slideUp(500,function(){
//       $("#alert-messageIn").css("display", "none");
//     });
//   },3000) ;
//   $("#alert-messageIn").css("display", "block");
//   window.setTimeout(function(){
//     $("#alert-messageIn").fadeTo(500,0).slideUp(500,function(){
//
//       $("#alert-messageIn").html("빰빰");
//       $("#alert-messageIn").css("display", "block");
//
//     });
//   },4000) ;
//   window.setTimeout(function(){
//     $("#alert-messageIn").fadeTo(500,0).slideUp(500,function(){
//       $("#alert-messageIn").css("display", "none");
//     });
//   },6000) ;
// });
