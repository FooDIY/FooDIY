/**
 * Created by 순우 on 2017-12-10.
 */

var main = document.getElementById("mainbtn");
var sub = document.getElementsByClassName("subbtn");

$(document).ready(function(){
   $(main).click(function(){
       if(main.value==="none"){
           for (var i=0; i< sub.length; i++){
               sub[i].style.display = "inline";
           }
           main.innerHTML = "적용하기";
           main.value = "inline";
       }
       else if(main.value=="inline"){
           for (var j=0; j< sub.length; j++){
               sub[j].style.display = "none";
           }
           main.innerHTML = "수정하기";
           main.value = "none";
       }
   })
});


$(document).ready(function(){

    $(sub).click(function() {
        var index = $(sub).index(this);

        if(this.value === "apply"){
            var previous2 = document.getElementsByClassName("changeinput");
            var value = $(previous2[index]).val();
            var next2;

            if(index===5){
                next2 = document.createElement("p");
            }
            else{
                next2 = document.createElement("span");
            }

            previous2[index].parentNode.replaceChild(next2, previous2[index]);
            next2.classList.add("changeinput");
            next2.innerHTML = value;
            this.innerHTML = "수정";
            this.value = "modify";
        }
        else{
            var previous = document.getElementsByClassName("changeinput");
            var next ;

            if(index===5){
                next = document.createElement('textarea');
                next.style.width= "100%";
                next.style.height = 10;
            }
            else if(index===4){
                $(document).ready(function(){
                    alert("calendar pop-up");
                })
            }
            else{
                next = document.createElement("input");
                next.classList.add("input-xs");
                next.classList.add("col-xs-4");
            }
            if(index!==4){
                next.classList.add("changeinput");
                previous[index].parentNode.replaceChild(next, previous[index]);
                this.innerHTML = "적용";
                this.value = "apply";
            }
        }
    })

});


