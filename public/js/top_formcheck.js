//created by ky
var flag1;
var flag2;
var flag3;
var flag4;
var flag5;
var pass1;
var pass2;
var confirm_touch;
$('#email-s').on('input', function () {
  var value=$('#email-s').val();
  var pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/i;
  var item = {id:value};
  $.ajax({
      method: "POST",
      type: "POST",
      url: "/idcheck",
      data: item,
      success: function (data) {
          if (value == "" && data == 1) {
              $("#idcheck").html('');
              checked = 1;
          }
          else if ((data == 0)&&(flag1==1)) {
              $("#idcheck").html('이미 가입된 이메일 입니다.');
              $("#idcheck").css("color", "red");
              $('#email-s').css('border', 'solid 1px red');
              checked = 0;
          }
          else {
            $("#idcheck").html('');
          }
      }
  });
  if(pattern.test(value)) {
    $('#email-s').css('border', 'solid 1px green');
    flag1=1;
    $('#sign-email-alert').hide();
  }
  else {
    $('#email-s').css('border', 'solid 1px red');
    flag1=0;
    $('#sign-email-alert').show();
  }
});

$('#password2-s').on('input',function(){
  confirm_touch=1;
});

$('#password-s, #password2-s').on('input', function () {
  var value1=$('#password-s').val();
  var value2=$('#password2-s').val();
  var pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^*+=-]).{8,20}$/;
  var match_flag;

  if(pattern.test(value1)) {
    $('#password-s').css('border', 'solid 1px green');
    flag2=1;
    $('#sign-password-alert').hide();
  }
  else {
    $('#password-s').css('border', 'solid 1px red');
    flag2=0;
    $('#sign-password-alert').show();
  }
  if(confirm_touch)
  {
    if(value1===value2)  {
      match_flag=1;
      $('#sign-confirm-alert').hide();
    }
    else{
      match_flag=0;
      $('#sign-confirm-alert').show();
    }
    if((match_flag)&& flag2) {
      $('#password2-s').css('border', 'solid 1px green');
      flag3=1;
    }
    else {
      $('#password2-s').css('border', 'solid 1px red');
      flag3=0;
    }
  }
  //비밀번호와 비밀번호 확인을 바인딩했기때문에 비밀번호를 입력하면 바로 비밀번호 확인에서 붉은색으로 변함 . 그걸방지하기위해서 한번이라도 입력이 있었을시를 가정하는 변수를 사용

});

$('#firstName').on('input', function () {
  var value=$('#firstName').val();
  var pattern = /^[a-zA-Z가-힣]+$/;
  if(pattern.test(value)&&value.length<10&&value.length>0) {
    $('#firstName').css('border', 'solid 1px green');
    flag4=1;
    $('#sign-first-alert').hide();
  }
  else {
    $('#firstName').css('border', 'solid 1px red');
    flag4=0;
    $('#sign-first-alert').show();
  }
});
$('#lastName').on('input', function () {
  var value=$('#lastName').val();
  var pattern = /^[a-zA-Z가-힣]+$/;
  if(pattern.test(value)&&value.length<10&&value.length>0) {
    $('#lastName').css('border', 'solid 1px green');
    flag5=1;
    $('#sign-last-alert').hide();
  }
  else {
    $('#lastName').css('border', 'solid 1px red');
    flag5=0;
    $('#sign-last-alert').show();
  }
});

$('#pop-up-sign').on('input', function () {
  if(flag1&&flag2&&flag3&&flag4&&flag5){
    $('#signup-zipbob').prop('disabled',false);
  }
  else {
    $('#signup-zipbob').prop('disabled',"disabled");
  }
});



$('#firstName-p').on('input', function () {
  var value=$('#firstName-p').val();
  var pattern = /^[a-zA-Z가-힣]+$/;
  if(pattern.test(value)&&value.length<10&&value.length>0) {
    $('#firstName-p').css('border', 'solid 1px green');
    pass1=1;
    $('#pass-first-alert').hide();
  }
  else {
    $('#firstName-p').css('border', 'solid 1px red');
    pass1=0;
    $('#pass-first-alert').show();
  }
});
$('#lastName-p').on('input', function () {
  var value=$('#lastName-p').val();
  var pattern = /^[a-zA-Z가-힣]+$/;
  if(pattern.test(value)&&value.length<10&&value.length>0) {
    $('#lastName-p').css('border', 'solid 1px green');
    pass2=1;
    $('#pass-last-alert').hide();
  }
  else {
    $('#lastName-p').css('border', 'solid 1px red');
    pass2=0;
    $('#pass-last-alert').show();
  }
});

$('#pop-up-passport').on('input', function () {
  if(pass1&&pass2){
    $('#passup-zipbob').prop('disabled',false);
  }
  else {
    $('#passup-zipbob').prop('disabled',"disabled");
  }
});
