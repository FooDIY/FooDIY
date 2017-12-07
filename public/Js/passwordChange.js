/**
 * Created by Sehyeon on 2017-12-07.
 */

function passchange(val) {
    alert('start');
    //var now=document.getElementsByName("now").value;
    //var next=document.getElementsByName("next").value;
    now=val.now.value;
    next=val.next.value;
    var item = {now:now, next:next};
    alert(now);
    alert(next);
    alert('send');
    console.log(item);
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/users/passwordchange",
        data: item,
        success: function (data) {
            if (data === "clear") {
                location.href='/users/profile';
            }
            else{
                alert("wow");
            }
        }
    });
}