/**
 * Created by 순우 on 2017-11-05.
 */

//      arrow
// function sidebarOpen() {
//     var className = ' ' + document.getElementById('topMenuDropdown').className + ' ';
//
//     this.className = ~className.indexOf(' active ') ?
//         className.replace(' active ', ' ') :
//         this.className + ' active';
//
//     document.getElementById("mySidebar").style.display = "block";
// }

document.getElementById('topMenuDropdown').onclick = function() {

    var className = ' ' + topMenuDropdown.className + ' ';

    this.className = ~className.indexOf(' active ') ?
        className.replace(' active ', ' ') :
        this.className + ' active';

    var sidebarStatue = document.getElementById("mySidebar");

    if(sidebarStatue.style.display === "block") {
        sidebarStatue.style.display = "none";
    }
    else {
        sidebarStatue.style.display = "block";
    }
};