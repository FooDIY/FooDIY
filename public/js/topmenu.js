/**
 * Created by Sehyeon on 2017-07-25.
 */
function signuppass(val) {
    var item = {email: val.email.value, password: val.pass.value,firstname:val.firstName.value,lastname:val.lastName.value};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/signup",
        data: item,
        success: function (data) {
            if (data == "clear") {
                location.reload();
            }
            else {
                $("#signupfail").html(data);
                $("#signupfail").css("color", "red");
                return false;
            }
        }
    });
}
function signuptemp(val) {
    var item = {email: val.email.value, id:val.id.value, firstname:val.firstName.value,lastname:val.lastName.value,provider:val.provider.value};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/signuptemp",
        data: item,
        success: function (data) {
            if (data == "clear") {
                location.href = "/";
            }
            else {
                alert(data);
                location.href = "/";
            }
        }
    });
}

function iddupcheck(val) {
    var item = {id: val.email.value,pass:"김기영"};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/idcheck",
        data: item,
        success: function (data) {
            if (val.email.value == "" && data == 1) {
                $("#idcheck").html('');
                checked = 1;
            }
            else if (data == 1) {
                $("#idcheck").html('사용 가능한 이메일 입니다.');
                $("#idcheck").css("color", "black");
                checked = 1;
            } else {
                $("#idcheck").html('이미 가입된 이메일 입니다.');
                $("#idcheck").css("color", "red");
                checked = 0;
            }
        }
    });
}
function nickcheck(val) {
    var item = {id: val.nick.value};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/nickcheck",
        data: item,
        success: function (data) {
            if (val.nick.value == "" && data == 1) {
                $("#nickcheck").html('');
                checked = 1;
            }
            else if (data == 1) {
                $("#nickcheck").html('사용 가능한 닉네임 입니다.');
                $("#nickcheck").css("color", "black");
                checked = 1;
            } else {
                $("#nickcheck").html('중복된 닉네임 입니다.');
                $("#nickcheck").css("color", "red");
                checked = 0;
            }
        }
    });
}
function LoginCheck(val) {
    //var snum=document.getElementsById("snum").value;
    var item = {
        email: val.email.value,
        password: val.pass.value
    };
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/login",
        data: item,
        success: function (data) {
            if (data == "clear") {
                location.reload();
            } else {
                $("#loginfail").html(data);
                $("#loginfail").css("color", "red");
            }
        }
    });
}
function LogOut() {
    var item;
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/logout",
        data: item,
        success: function (data) {
            if (data == "clear")
                location.reload();
        }
    });
}
function TempDel() {
    var item;
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/tempout"
    });
}
function submitseller() {
    location.replace("/seller/submit_seller");
}
function manage() {
    location.replace("/seller/manage");
}
function gosign() {
    location.replace("/test");
}
angular.module('profile', ['ngAnimate','ui.bootstrap']);
angular.module('profile').controller('ctrl', function ($scope,$http) {
    $scope.accountOpen = true;
    $scope.personalOpen = true;
    $http.get("https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;flag").then(function(response) {
        // var firstchoice = {"flag":"","name":"Choose your country","alpha2Code":""}
        // response.data.unshift(firstchoice);
        $scope.countries = response.data;
    });



});

angular.module('profile').directive('confirmPassword', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function confirmPassword(value) {
                if (scope.formdata.password == value) {
                    mCtrl.$setValidity('passwordsIdentical', true);
                } else {
                    mCtrl.$setValidity('passwordsIdentical', false);
                }
                return value;
            }
            mCtrl.$parsers.push(confirmPassword);
        }
    };
});

//
// angular.module('profile').directive('validateEmailRemotely', function(AuthenticateService) {
//     return {
//         restrict: 'A',
//         scope: true,
//         require: 'ngModel',
//         link: function(scope, elem, attrs, ctrls) {
//             var ngModel = ctrls;
//             scope.$watch(attrs.ngModel, function(email) {
//                 AuthenticateService.Email(email)
//                     .then(function(result) {
//                         if (result.email_exists) {
//                             ngModel.$setValidity('validEmail', false);
//                         } else {
//                             ngModel.$setValidity('validEmail', true);
//                         }
//                     });
//             });
//         }
//     }
// });
// angular.module('profile').service('AuthenticateService', function($http) {
//     return {
//         Email: function(email) {
//             var url = '13.125.0.15/valid_email?email='+email;
//             return $http.get(url)
//                 .then(function(response) {
//                     return response.data;
//                 }, function(error) {
//                     return error.data;
//                 });
//         }
//     };
// });
