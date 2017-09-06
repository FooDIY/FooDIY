/**
 * Created by Sehyeon on 2017-08-03.
 */
function submitmenu(val){
    var item = {menu_name: val.menu_name.value, content: val.content.value, menu_pic:val.menu_pic.value, ingre_pic:val.ingre_pic.value, ingre_name:val.ingre_name.value, madeby:val.madeby.value, price:val.price.value, amount:val.amount.value};

    jQuery.ajaxSettings.traditional=true;
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/submit_menu",
        data: item,
        success: function (data) {
            if (data == "clear") {
                location.replace("/seller/manage");
            }
            else {
                $("#submitmenufail").html(data);
                $("#submitmenufail").css("color", "red");
                return false;
            }
        }
    });
}
$(function() {
    $("#inputImg1").on('change', function(){
        readURL1(this);
    });
    $("#inputImg2").on('change', function(){
        readURL2(this);
    });
    $("#inputImg3").on('change', function(){
        readURL3(this);
    });
    $("#inputImg4").on('change', function(){
        readURL4(this);
    });
});
function imgClick1(){
  $("#buttonImg1").css('display','none')
  $('#blah1').attr('src', '#');
  $("#blah1").css('display','none')
  $("#inputImg1").show();
  $("#inputImg1").attr('data-title', 'Click or Drag');
  $("#inputImg1").val('');
  alert('선택하신 이미지가 취소됐습니다.')
}
function imgClick2(){
  $("#buttonImg2").css('display','none')
  $('#blah2').attr('src', '#');
  $("#blah2").css('display','none')
  $("#inputImg2").show();
  $("#inputImg2").attr('data-title', 'Click or Drag');
  $("#inputImg2").val('');
  alert('선택하신 이미지가 취소됐습니다.')
}
function imgClick3(){
  $("#buttonImg3").css('display','none')
  $('#blah3').attr('src', '#');
  $("#blah3").css('display','none')
  $("#inputImg3").show();
  $("#inputImg3").attr('data-title', 'Click or Drag');
  $("#inputImg3").val('');
  alert('선택하신 이미지가 취소됐습니다.')
}
function imgClick4(){
  $("#buttonImg4").css('display','none')
  $('#blah4').attr('src', '#');
  $("#blah4").css('display','none')
  $("#inputImg4").show();
  $("#inputImg4").attr('data-title', 'Click or Drag');
  $("#inputImg4").val('');
  alert('선택하신 이미지가 취소됐습니다.')

}
function readURL1(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#buttonImg1").css('display','block')
            $('#blah1').attr('src', e.target.result);
            $("#blah1").css('display','inline')
            $("#inputImg1").hide();
            // $('#inputImg1').css('background-image', 'url('+e.target.result+')');
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function readURL2(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $("#buttonImg2").css('display','block')
          $('#blah2').attr('src', e.target.result);
          $("#blah2").css('display','inline')
          $("#inputImg2").hide();
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function readURL3(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $("#buttonImg3").css('display','block')
          $('#blah3').attr('src', e.target.result);
          $("#blah3").css('display','inline')
          $("#inputImg3").hide();
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function readURL4(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $("#buttonImg4").css('display','block')
          $('#blah4').attr('src', e.target.result);
          $("#blah4").css('display','inline')
          $("#inputImg4").hide();
        };

        reader.readAsDataURL(input.files[0]);
    }
}

var fileCnt = 1;
var tmpTag = '';
var ingreCount=0;
// function ingreURL(input,count) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//
//         reader.onload = function (e) {
//             $('#ingreblah'+count).attr('src', e.target.result);
//         };
//         document.getElementById('ingreblah'+(fileCnt-1)).style="display:inline";
//         reader.readAsDataURL(input.files[0]);
//     }
// }
$(document).ready(function() {
      var mname_flag;
      var mdes_flag;
      var mprice_flag;
      var mamount_flag;
      // (([가-힣a-zA-Z0-9]+[가-힣a-zA-Z0-9 ]*[가-힣a-zA-Z0-9]+)|([가-힣a-zA-Z0-9]))
      var mname_pattern=/^(([가-힣a-zA-Z0-9]+[가-힣a-zA-Z0-9 ]*[가-힣a-zA-Z0-9]+)|([가-힣a-zA-Z0-9]+))$/;
      var mprice_pattern=/^([1-9]+[0-9]*|[1-9]+)$/;
      var mamount_pattern=/^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;


      $('#menu_name').on('input', function () {
      var value=$('#menu_name').val();
      if(mname_pattern.test(value) && value.length>0 && value.length<30)
      {
        $('#menu_name').css('border', 'solid 1px green');
        mname_flag=1;
        $( "#name_alert" ).hide();
      }
      else {
        $('#menu_name').css('border', 'solid 1px red');
        mname_flag=0;
        $( "#name_alert" ).show();
      }
    });

    $('#menu_description').on('input', function () {
    var value=$.trim($('#menu_description').val());
      if(value.length>0)
      {
        $('#menu_description').css('border', 'solid 1px green');
        mdes_flag=1;
      }
      else {
        $('#menu_description').css('border', 'solid 1px red');
        mdes_flag=0;
      }
    });

      $('#price').on('input', function () {
      var value=$('#price').val();
      if(mprice_pattern.test(value) && value.length>0 && value.length<8)
      {
        $('#price').css('border', 'solid 1px green');
        mprice_flag=1;
      }
      else {
        $('#price').css('border', 'solid 1px red');
        mprice_flag=0;
      }
    });

    $('#amount').on('input', function () {
    var value=$('#amount').val();
    if(mamount_pattern.test(value) && value.length>0 && value.length<4)
    {
      $('#amount').css('border', 'solid 1px green');
      mamount_flag=1;
    }
    else {
      $('#amount').css('border', 'solid 1px red');
      mamount_flag=0;
    }
    });

    $('#nodap').on('keyup change click', function () {
    if(mamount_flag && mprice_flag && mname_flag && mdes_flag&&fileCnt>1&&($('#inputImg1').val()||$('#inputImg2').val()||$('#inputImg3').val()||$('#inputImg4').val()))
    {
      $('#sub_res').prop('disabled',false);
      $('#sub_res').removeAttr('title');
    }
    else {
      $('#sub_res').prop('disabled','disabled');
      $('#sub_res').attr('title', '올바른 메뉴 이름과 메뉴설명,메뉴 이미지, 판매 가격,가용 수량을 입력하시고 하나이상의 재료를 입력해주세요.');
    }
  });
});
$(document).ready(function() {
  var flag1=0;
  var flag2=0;
  $('#inputIngre0').on('change',function(){

    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#ingreblah0').attr('src', e.target.result);
        };
        $('#inputIngre0').hide();
        document.getElementById('ingreblah0').style="display:inline";
        reader.readAsDataURL(this.files[0]);
    }
  });
  $('#nodap').on('input change', function () {
      var value=$('#ingre_name0').val();
      var value2=$('#ingre_from0').val();
      var pattern = /[^가-힣a-zA-Z0-9]/gi;
      var pattern2 = /[^가-힣a-zA-Z0-9]/gi;

      if(!pattern.test(value)) {
        $('#ingre_name0').css('border', 'solid 1px green');
        flag1=1;
      }
      else {
        $('#ingre_name0').css('border', 'solid 1px red');
        flag1=0;
      }
      if(!pattern2.test(value2)) {
        $('#ingre_from0').css('border', 'solid 1px green');
        flag2=1;
      }
      else {
        $('#ingre_from0').css('border', 'solid 1px red');
        flag2=0;
      }
      if (value.length>0 && flag1 && flag2 && $('#inputIngre0').val() && value2.length>0) {
          $('#ingresubmit0').prop('disabled', false);
          $('#ingresubmit0').removeAttr('title');
      } else {
          $('#ingresubmit0').prop('disabled', 'disabled');
          $('#ingresubmit0').attr('title', '올바른 재료이름과 원산지,이미지를 입력해주세요');
      }
  });
  $('#ingrereset0').on('click',function(){
    $('#ingre_name0').val('');
    $('#ingre_from0').val('');
    $('#inputIngre0').val('');
    $('#inputIngre0').show();
    $('#ingreblah0').hide();
    $('#inputIngre0').attr('data-title', 'Click or Drag');
  });

});

function selectFile() {
    if(fileCnt==100)
    {
      alert('너무 많은 요청이 시도됐습니다.');
    }
    else if(ingreCount==10)
    {
        alert('너무 많이 등록됐습니다!');
    }
    else{
    var cntm=fileCnt-1;
    var schemeFileDiv = document.getElementById('ingre_fix');
    var ingre_img = document.getElementById('inputIngre'+cntm);
    var ingre_thisname = document.getElementById('ingre_name'+cntm);
    var ingre_madeby = document.getElementById('ingre_from'+cntm);
    var ingre_submit = document.getElementById('ingresubmit'+cntm);
    var ingre_reset = document.getElementById('ingrereset'+cntm);
    //tmpTag += '<input type="file" name="ingre_name[]" id="schemeFile'+fileCnt+'" style="display: block;"/>';
    //ingre_img.style="display:none;";
    $('#inputIngre'+cntm).hide();
    //ingre_submit.width="0px";
    //ingre_reset.width="0px";
    $('#ingresubmit'+cntm).hide();
    $('#ingrereset'+cntm).hide();
    $('#ingredelete'+cntm).show();


    $('#ingre_name'+cntm).attr('name', 'ingre_name[]');
    $('#ingre_from'+cntm).attr('name', 'madeby[]');
    //추가부분

    // ingreURL(ingre_img,cntm);
    ingre_thisname.readOnly="readonly";
    ingre_madeby.readOnly="readonly";
    tmpTag='<div id="ingre_img'+fileCnt+'" style="padding: 0; border: 2px solid black; height: 105px;" class="col-sm-12"><div class="col-sm-3 offset-sm-3"> \
        <div class="form-group inputDnD"><input id="inputIngre'+fileCnt+'" type="file" accept="image/*" name="ingre_pic" onchange="readUrl(this)" style="position: absolute; z-index: 2;" data-title="Click or Drag" class="form-control-file text-warning font-weight-bold"/> \
        <img id="ingreblah'+fileCnt+'" src="#" alt="your image" height="100px" style="display:none;"/>\
        </div>\
        </div>\
        <div style="margin-top: 11px;" class="col-xs-offset-1 col-xs-5">\
        <input id="ingre_name'+fileCnt+'" type="text" name="ingre" placeholder="재료 이름" class="text-primary form-control">\
        <input id="ingre_from'+fileCnt+'" type="text" name="made" placeholder="원산지" style="margin-top: 10px;" class="text-primary form-control">\
        </div>\
        <button id="ingresubmit'+fileCnt+'"  type="button" style="margin-top: 15px; height: 70px;" class="btn btn-primary col-xs-1" onclick="selectFile();" disabled="disabled" title="올바른 재료이름과 원산지,이미지를 입력해주세요">등록</button>\
        <button id="ingrereset'+fileCnt+'" type="button" style="margin-top: 15px; height: 70px; margin-left: 15px;" class="btn btn-danger col-xs-1" >초기화</button>\
        <button id="ingredelete'+fileCnt+'" type="button" style="margin-top: 15px; height: 70px; margin-left: 15px; display: none;" class="btn btn-danger col-xs-1" >삭제</button></div>';
    $("#ingre_fix").append(tmpTag);

    // <input id="ingre_name'+fileCnt+'" type="text" name="ingre_name[]" placeholder="재료 이름" class="text-primary form-control">\
    // <input id="ingre_from'+fileCnt+'" type="text" name="madeby[]" placeholder="원산지" style="margin-top: 10px;" class="text-primary form-control">
    //등록되지않은 입력 제출막기위해서 이름을 바꿨음

    $(document).ready(function() {
      var temp=cntm+1;
      var flag1=0;
      var flag2=0;
      $('#ingre_img'+temp).on('input change', function () {
          var value=$('#ingre_name'+temp).val();
          var value2=$('#ingre_from'+temp).val();
          var pattern = /[^가-힣a-zA-Z0-9]/gi;
          var pattern2 = /[^가-힣a-zA-Z0-9]/gi;
          if(!pattern.test(value)) {
            $('#ingre_name'+temp).css('border', 'solid 1px green');
            flag1=1;
          }
          else {
            $('#ingre_name'+temp).css('border', 'solid 1px red');
            flag1=0;
          }
          if(!pattern2.test(value2)) {
            $('#ingre_from'+temp).css('border', 'solid 1px green');
            flag2=1;
          }
          else {
            $('#ingre_from'+temp).css('border', 'solid 1px red');
            flag2=0;
          }
          if (value.length>0 && flag1 && flag2 && $('#inputIngre'+temp).val() && value2.length>0) {
              $('#ingresubmit'+temp).prop('disabled', false);
              $('#ingresubmit'+temp).removeAttr('title');
          } else {
              $('#ingresubmit'+temp).prop('disabled', 'disabled');
              $('#ingresubmit'+temp).attr('title', '올바른 재료이름과 원산지,이미지를 입력해주세요');
          }
      });
      $('#ingredelete'+cntm).on('click',function(){
        ingreCount--;
        alert('등록한 재료가 삭제됐습니다.');
        $('#ingre_img'+cntm).remove();
      });
      $('#ingrereset'+temp).on('click',function(){
        $('#ingre_name'+temp).val('');
        $('#ingre_from'+temp).val('');
        $('#inputIngre'+temp).val('');
        $('#inputIngre'+temp).show();
        $('#ingreblah'+temp).hide();
        $('#inputIngre'+temp).attr('data-title', 'Click or Drag');
      });
      $('#inputIngre'+temp).on('change',function(){

        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#ingreblah'+temp).attr('src', e.target.result);
            };
            $('#inputIngre'+temp).hide();
            document.getElementById('ingreblah'+temp).style="display:inline";
            reader.readAsDataURL(this.files[0]);
        }
      });
    });
    fileCnt++;
    ingreCount++;
  }

}


function submit2menu(val){
    alert(val.menu_pic[0]);
    //var item = {menu_name: val.menu_name.value, content: val.content.value, 'menu_pic[]':val.menu_pic.value, 'ingre_pic[]':val.ingre_pic.value, 'ingre_name[]':val.ingre_name.value, 'madeby[]' :val.madeby.value, price:val.price.value, amount:val.amount.value};
    alert("ww");
    alert(item.menu_pic[1]);
    /*jQuery.ajaxSettings.traditional=true;
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/submit_menu",
        data: item,
        success: function (data) {
            if (data == "clear") {
                location.replace("/seller/manage");
            }
            else {
                $("#submitmenufail").html(data);
                $("#submitmenufail").css("color", "red");
                return false;
            }
        }
    });*/
}
