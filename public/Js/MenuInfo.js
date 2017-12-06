//MenuInfo.pug페이지로 부터 ,메세지 보내기 버튼 클릭시 메세지를 보내고자하는 대상의 이메일을불러옴.

function sendMessage(email){
  $.ajax({
      var item=email;
      method: "POST",
      type: "POST",
      url: "/message",
      data: item,
      success: function (data) {
          if (value == "" && data == 1) {
              $("#idcheck").html('');
              checked = 1;
          }
          else {
            $("#idcheck").html('');
          }
      }
  });
}
