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
function selectFile() {
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
        <button id="ingresubmit'+fileCnt+'"  type="button" style="margin-top: 15px; height: 70px;" class="btn btn-primary col-xs-1" onclick="selectFile();">등록</button>\
        <button id="ingrereset'+fileCnt+'" type="button" style="margin-top: 15px; height: 70px; margin-left: 15px;" class="btn btn-danger col-xs-1" >초기화</button></div>';
    $("#ingre_fix").append(tmpTag);
    fileCnt++;
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