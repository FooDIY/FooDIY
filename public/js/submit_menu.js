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

function readURL1(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah1').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function readURL2(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah2').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function readURL3(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah3').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function readURL4(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah4').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}


var fileCnt = 1;
var tmpTag = '';

function ingreURL(input,count) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#ingreblah'+count).attr('src', e.target.result);
        };
        document.getElementById('ingreblah'+(fileCnt-1)).style="display:inline";
        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function() {
      var mname_flag;
      var mdes_flag;
      var mprice_flag;
      var mamount_flag;
      var mname_pattern=/^[가-힣a-zA-Z0-9]*$/;
      var mprice_pattern=/^([1-9]+[0-9]*|[1-9]+)$/;
      var mamount_pattern=/^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$/;


      $('#menu_name').on('keyup', function () {
      var value=$.trim($('#menu_name').val());
      if(mname_pattern.test(value) && value.length>0)
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

    $('#menu_description').on('keyup', function () {
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

      $('#price').on('keyup', function () {
      var value=$.trim($('#price').val());
      if(mprice_pattern.test(value) && value.length>0)
      {
        $('#price').css('border', 'solid 1px green');
        mprice_flag=1;
      }
      else {
        $('#price').css('border', 'solid 1px red');
        mprice_flag=0;
      }
    });

    $('#amount').on('keyup', function () {
    var value=$.trim($('#amount').val());
    if(mamount_pattern.test(value) && value.length>0)
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
    if(mamount_flag && mprice_flag && mname_flag && mdes_flag&&fileCnt>1)
    {
      $('#sub_res').prop('disabled',false);
      $('#sub_res').removeAttr('title');
    }
    else {
      $('#sub_res').prop('disabled','disabled');
      $('#sub_res').attr('title', '올바른 메뉴 이름과 메뉴설명, 판매 가격,가용 수량을 입력하시고 하나이상의 재료를 입력해주세요.');
    }
  });
});
$(document).ready(function() {
  var flag1=0;
  var flag2=0;
  $('#nodap').on('keyup change', function () {
      var value=$.trim($('#ingre_name0').val());
      var value2=$.trim($('#ingre_from0').val());
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
    $('#inputIngre0').attr('data-title', 'Click or Drag');
  });

});

function selectFile() {
    if(fileCnt==10)
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
    ingreURL(ingre_img,cntm);
    ingre_thisname.readOnly="readonly";
    ingre_madeby.readOnly="readonly";
    tmpTag='<div id="ingre_img'+fileCnt+'" style="padding: 0; border: 2px solid black; height: 105px;" class="col-sm-12"><div class="col-sm-3 offset-sm-3"> \
        <div class="form-group inputDnD"><input id="inputIngre'+fileCnt+'" type="file" accept="image/*" name="ingre_pic" onchange="readUrl(this)" style="position: absolute; z-index: 2;" data-title="Click or Drag" class="form-control-file text-warning font-weight-bold"/> \
        <img id="ingreblah'+fileCnt+'" src="#" alt="your image" height="100px" style="display:none;"/>\
        </div>\
        </div>\
        <div style="margin-top: 11px;" class="col-xs-offset-1 col-xs-5">\
        <input id="ingre_name'+fileCnt+'" type="text" name="ingre_name[]" placeholder="재료 이름" class="text-primary form-control">\
        <input id="ingre_from'+fileCnt+'" type="text" name="madeby[]" placeholder="원산지" style="margin-top: 10px;" class="text-primary form-control">\
        </div>\
        <button id="ingresubmit'+fileCnt+'"  type="button" style="margin-top: 15px; height: 70px;" class="btn btn-primary col-xs-1" onclick="selectFile();" disabled="disabled" title="올바른 재료이름과 원산지,이미지를 입력해주세요">등록</button>\
        <button id="ingrereset'+fileCnt+'" type="button" style="margin-top: 15px; height: 70px; margin-left: 15px;" class="btn btn-danger col-xs-1" >초기화</button></div>';
    $("#ingre_fix").append(tmpTag);

    $(document).ready(function() {
      var temp=cntm+1
      var flag1=0;
      var flag2=0;
      $('#nodap').on('keyup change', function () {
          var value=$.trim($('#ingre_name'+temp).val());
          var value2=$.trim($('#ingre_from'+temp).val());
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
      $('#ingrereset'+temp).on('click',function(){
        $('#ingre_name'+temp).val('');
        $('#ingre_from'+temp).val('');
        $('#inputIngre'+temp).val('');
        $('#inputIngre'+temp).attr('data-title', 'Click or Drag');
      });
    });
    fileCnt++;
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
