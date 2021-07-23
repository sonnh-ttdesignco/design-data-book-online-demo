const pageName = "3d-cad";
requiredLogin(pageName);

function resizeBar() {
    console.log('asdads')
    let databookPageWidth = $(`.databook-page`).width();
    $('#dragbar').mousedown(function (e) {
        e.preventDefault();
        $(document).mousemove(function (e) {
            $('.table-content-wrap').css("width", e.pageX + 2);
            $('.databook-wrap').css("width", databookPageWidth - (e.pageX + 2));
        })
    });

    $(document).mouseup(function (e) {
        $(document).unbind('mousemove');
    });
};


$(function () {
    resizeBar();
})