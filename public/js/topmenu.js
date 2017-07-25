/**
 * Created by Sehyeon on 2017-07-25.
 */
function signup(val) {
    var item = {email: val.email.value, password: val.pass.value, nick: val.nick.value};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/signup",
        data: item,
        success: function (data) {
            if (data == "clear") {
                location.reload();
            }
            else {
                $("#signupfail").html(data);
                $("#signupfail").css("color", "red");
                return false;
            }
        }
    });
}
function iddupcheck(val) {
    var item = {id: val.email.value};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/idcheck",
        data: item,
        success: function (data) {
            if (val.email.value == "" && data == 1) {
                $("#idcheck").html('');
                checked = 1;
            }
            else if (data == 1) {
                $("#idcheck").html('사용 가능한 이메일 입니다.');
                $("#idcheck").css("color", "black");
                checked = 1;
            } else {
                $("#idcheck").html('이미 가입된 이메일 입니다.');
                $("#idcheck").css("color", "red");
                checked = 0;
            }
        }
    });
}
function nickcheck(val) {
    var item = {id: val.nick.value};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/nickcheck",
        data: item,
        success: function (data) {
            if (val.nick.value == "" && data == 1) {
                $("#nickcheck").html('');
                checked = 1;
            }
            else if (data == 1) {
                $("#nickcheck").html('사용 가능한 닉네임 입니다.');
                $("#nickcheck").css("color", "black");
                checked = 1;
            } else {
                $("#nickcheck").html('중복된 닉네임 입니다.');
                $("#nickcheck").css("color", "red");
                checked = 0;
            }
        }
    });
}
function LoginCheck(val) {
    //var snum=document.getElementsById("snum").value;
    var item = {
        email: val.email.value,
        password: val.pass.value
    };
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/login",
        data: item,
        success: function (data) {
            if (data == "clear") {
                location.reload();
            } else {
                $("#loginfail").html(data);
                $("#loginfail").css("color", "red");
            }
        }
    });
}
function LogOut() {
    var item;
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/logout",
        data: item,
        success: function (data) {
            if (data == "clear")
                location.reload();
        }
    });
}