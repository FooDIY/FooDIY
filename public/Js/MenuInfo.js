//MenuInfo.pug페이지로 부터 ,메세지 보내기 버튼 클릭시 메세지를 보내고자하는 대상의 이메일을불러옴.
//routes/message/index.js 라우팅.
//메세지를 보낼 정당한 사용자라면 /message/conversation_id로 get요청
function sendMessage(email){
  var item={email:email};
  $.ajax({
      method: "POST",
      type: "POST",
      url: "/message",
      data: item,
      success: function (data) {
          if (data ==="1") {
            alert("로그인이 필요한 기능입니다.");
          }
          else if(data ==="2"){
            alert("자기 자신에게는 메세지를 보낼 수 없습니다.");
          }
          else{
              window.location.href='/message/'+data;
          }
      }
  });
}
