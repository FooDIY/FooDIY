/**
 * Created by Sehyeon on 2017-11-16.
 */
function LoginCheck(val) {
    //var snum=document.getElementsById("snum").value;
    var item = {
        email: val.email.value,
        password: val.password.value
    };
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/users/login",
        data: item,
        success: function (data) {
            if (data == "clear") {
                location.replace('/');
            }
            else if(data==="이메일 에러"||data==="패스워드 에러"||data==="타사연동으로 가입된 회원입니다. 위 버튼을 이용해서 로그인해주세요")
            {
                alert(data);
                //$("#loginfail").html(data);
                //$("#loginfail").css("color", "red");
            }
            else {
                alert("미 인증된 메일입니다. 인증 확인 후 로그인 해 주세요.");
                /*$("#reconfirmtext").html("미 인증된 메일입니다. 인증 확인 후 로그인 해 주세요.");
                $("#reconfirmbutton").show();
                email=item.email;
                $('#mail_confirm').modal('toggle');
                $('#pop-up-login').modal('toggle');*/
            }
        }
    });
}
function goToSignup(){
  location.href="/SignUp";
}
