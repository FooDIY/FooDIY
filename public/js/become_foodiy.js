angular.module('seller', ['ngAnimate','ui.bootstrap']);
angular.module('seller').controller('ctrl', function ($scope,$http) {
    $scope.accountOpen = true;
    $scope.personalOpen = true;
    $http.get("https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;flag").then(function(response) {
        // var firstchoice = {"flag":"","name":"Choose your country","alpha2Code":""}
        // response.data.unshift(firstchoice);
        $scope.countries = response.data;
    });



});
