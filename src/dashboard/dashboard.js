const pageName = "dashboard";
requiredLogin(pageName);

$(function () {
    $('.carousel').carousel({
        interval: 2000
    })

    console.log(getAuth())
    if (getAuth().type == "premium") {
        if ($(`.premium-type`).hasClass("hidden")) {
            $(`.premium-type`).removeClass("hidden");
        } else {
            $(`.premium-type`).addClass("hidden");
        }
    }
})