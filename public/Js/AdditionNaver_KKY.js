function signuptemp(val) {
    var item = {id:val.id.value, firstname:val.firstName.value,lastname:val.lastName.value};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/users/NaverSignUpTemp",
        data: item,
        success: function (data) {
                location.href = "/";
        }
    });
}
