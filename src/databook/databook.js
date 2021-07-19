const pageName = "databook";

requiredLogin(pageName, true); //login is required

function resizeBar() {
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

function tabBehavior() {
    let $tabContent = $(`.table-content`);
    let $tabHeader = $(`.tab-header`);
    let $tabBody = $(`.tab-body`);

    $($tabHeader, $tabContent).each(function () {
        $(this).click(function () {
            let tabId = $(this).attr("tab-control");
            $tabHeader.removeClass("active");
            if (!$(this).hasClass('active')) {
                $(this).addClass("active");
            }

            $($tabBody, $tabContent).removeClass("active");
            $(`.tab-body#${tabId}`, $tabContent).addClass("active");
        })
    })
};

function tableContentBehavior() {
    let $tabContent = $(`.table-content`);
    let $icon = $(`.body-content-wrap li i.content-icon`);

    $($icon, $tabContent).each(function () {
        let $this = $(this);
        $this.click(() => {
            if ($this.hasClass("fa-plus-circle")) {
                //change icon from plus to minus
                $this.removeClass("fa-plus-circle");
                $this.addClass("fa-minus-circle");
                //expand children menu
                if ($this.parent("li").children("ul").length > 0) {
                    let $ul = $this.parent("li").children("ul");
                    if ($ul.hasClass("collapsed")) {
                        $ul.removeClass("collapsed");
                        $ul.addClass("expanded");
                    }
                }
            } else {
                //change icon from minus to plus
                $this.removeClass("fa-minus-circle");
                $this.addClass("fa-plus-circle");
                //collapse children menu
                if ($this.parent("li").children("ul").length > 0) {
                    let $ul = $this.parent("li").children("ul");
                    if ($ul.hasClass("expanded")) {
                        $ul.removeClass("expanded");
                        $ul.addClass("collapsed");
                    }
                }

            }
        })
    })
};

function databookLoad(id) {
    $(`#databook-view`).load(`/src/databook/data/data.html ${id}`, function (response, status, xhr) {
        if (status == "error") {
            console.log('rer')
            $(`#databook-view`).html("");
        }
    });

}

$(function () {
    resizeBar();
    tabBehavior();
    tableContentBehavior();
    let href = hrefString.split("#")[1];
    if (href != null) {
        databookLoad(`#${href}`);
    }
    $(`.body-content-wrap ul li a`).each(function () {
        let $this = $(this);
        $this.click(() => {
            let href = $this.attr("href");
            $(`.body-content-wrap ul li a`).removeClass("current");
            $this.addClass("current");
            databookLoad(href);
        })
    })


})