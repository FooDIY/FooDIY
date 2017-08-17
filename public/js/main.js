/**
 * Created by 순우 on 2017-07-11.
 */

var modal_sign = document.getElementById("pop-up-sign");
var modal_login = document.getElementById("pop-up-login");
var modal_pass = document.getElementById("pop-up-passport");
var main_sign_btn = document.getElementById("main_signup");
var main_login_btn = document.getElementById("main_login");
var span_close = document.getElementsByClassName("close")[0];


// modal_pass.style.display="block";

main_sign_btn.onclick = function(){
    modal_sign.style.display = "block";
};

window.onclick = function(event){
    if(event.target == modal_sign){
        alert("안녕하세요");
        modal_sign.style.display = "none";
    }
};

main_login_btn.onclick = function(){

        modal_login.style.display = "block";
};

window.onclick = function(event){
    if(event.target == modal_login){

        modal_login.style.display = "none";
    }
};

span_close.onclick = function () {

    modal_sign.style.display = "none";
};

$(document).ready(function () {
    $("#signup-zipbob").click(function(){
        $("#pop-up-sign").css("display","none");
        $("#pop-up-login").css("display","block");
    })
});

$(document).ready(function () {
    $("#sign-up").click(function(){
        $("#pop-up-login").css("display","none");
        $("#pop-up-sign").css("display","block");
    })
});

$(document).ready(function () {
    $("sign-in").click(function () {
        $("#login_form").submit();
    })
});

$(document).ready(function () {
    $("#signup-zipbob").click(function () {
        $("#signup_form").submit();
    })
});

$(function () {
    $(".datepicker").datepicker({
        dateFormat: "yy/mm/dd"
    });
});
