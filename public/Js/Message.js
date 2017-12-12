$(document).ready(function(){
  if(document.getElementById('buyerButton')){

      var buttonFlag=0;
      $("#buyerButton").click(function(){
          if(buttonFlag===1){
            buttonFlag=0;
            $("#sellerButton").toggleClass("hovered");
            $("#buyerButton").toggleClass("hovered");
            $("[name='messageState1']").each(function(){$(this).hide()});
            $("[name='messageState0']").each(function(){$(this).show()});
          }
      });
      $("#sellerButton").click(function(){
          if(buttonFlag===0){
            buttonFlag=1;
            $("#buyerButton").toggleClass("hovered");
            $("#sellerButton").toggleClass("hovered");
            $("[name='messageState0']").each(function(){$(this).hide()});
            $("[name='messageState1']").each(function(){$(this).show()});
          }

      });

  }
  // $('#buyerButton').css( "text-align", "black" );
  // //두개 상하 /좌우
  // //4개 위 오른쪽 아래 왼쪽
  // color: black;
  // padding: 15px 32px;
  // text-align: center;
  // text-decoration: none;
  // display: inline-block;
  // font-size: 16px;
  // border-right-color: #BDBDBD;
  // box-shadow: 0 4px 3px -2px grey;
})
