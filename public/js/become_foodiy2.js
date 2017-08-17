angular.module('seller2', ['ngAnimate','ui.bootstrap']);
angular.module('seller2').controller('ctrl', function ($scope,$http) {
    $scope.accountOpen = true;
    $scope.personalOpen = true;
    $http.get("https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;flag").then(function(response) {
        // var firstchoice = {"flag":"","name":"Choose your country","alpha2Code":""}
        // response.data.unshift(firstchoice);
        $scope.countries = response.data;
    });



});



$(function() {
      $('#menu_description').keyup(function (e){
          var content = $(this).val();
          $(this).height(((content.split('\n').length + 1) * 7) + 'em');
          $('#counter').html(content.length + '/1000');
      });
      $('#menu_description').keyup();
});
