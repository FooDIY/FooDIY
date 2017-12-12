//읽지않은 새로운 메시지를 체크하는부분임.

$(document).ready(function(){
  $.ajax({
      method: "POST",
      type: "POST",
      url: "/message/newCheck",
      success: function (data) {
          if(data.message){
            $('#tabNewMessage').show();
            $('#newMessage').show();
            $('#newMessage').text(data.message);
            $('#tabNewMessage').text(data.message);
          }
      }
  });
});
