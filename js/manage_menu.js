/**
 * Created by 순우 on 2017-07-15.
 */
$('.nav-show').hide();

$("li:has(ul)").click(function(){
    if($(this).hasClass('open')) {
        $(this).removeClass('open').find('ul').slideUp();
    }
    else {
        $(this).addClass('open').find('ul').slideDown();
    }
});