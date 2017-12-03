/**
 * Created by Sehyeon on 2017-12-03.
 */
function table_del(){
    var table_id=[];
    var memberChk = document.getElementsByName("RowCheck");
    var indexid=false;
    for(i=0; i < memberChk.length; i++){
        if(memberChk[i].checked){
            table_id.push(memberChk[i].value);
            indexid=true;
        }
    }
    if(!indexid){
        alert("삭제할 사용자를 체크해 주세요");
        return;
    }
    var item = {table_id:table_id, sunggyu:"못생김"};
    console.log(item);

    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/table_delete",
        data: item,
        success: function (data) {
            if (data === "clear") {
                //location.reload();
            }
        }
    });
}
function del_table(val){
    var table_id=val.thisid.value;
    var item = {table_id:table_id};

    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/table_delete",
        data: item,
        success: function (data) {
            if (data === "clear") {
                location.reload();
            }
        }
    });
}
function fix_table(val){
    var table_id=val.thisid.value;
    location.href="/seller/table_fix/"+table_id;
}