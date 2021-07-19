function escapeOutput(toOutput) {
    if (toOutput != null) {
        return toOutput.replace(/\&/g, '&amp;')
            .replace(/\</g, '&lt;')
            .replace(/\>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/\'/g, '&#x27')
            .replace(/\//g, '&#x2F');
    }
}


function loginFunction() {
    var loginInfo;
    let result;
    loginInfo = {
        username: escapeOutput($(`#login-form input[name=username]`).val()),
        password: escapeOutput($(`#login-form input[name=password]`).val())
    }
    result = login(loginInfo);
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.msg,
        footer: '<a href="#">Forgot your password?</a>'
    })
}

$(function () {

    $(`.login_btn`).click(function () {
        loginFunction();
    })
    $(`.input_pass`).focus(() => {
        $(document).on('keypress', function (e) {
            if (e.which == 13) {
                if (($(`.input_pass`).val().length > 0)) {
                    loginFunction();
                }
            }
        });
    })

})