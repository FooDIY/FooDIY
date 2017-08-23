$(function() {
      $('#menu_description').keyup(function (e){
          var content = $(this).val();
          $(this).height(((content.split('\n').length + 1) * 7) + 'em');
          $('#counter').html(content.length + '/1000');
      });
      $('#menu_description').keyup();
});
