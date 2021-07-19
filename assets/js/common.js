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

const queryString = window.location.search;
const hrefString = window.location.href;
const urlParams = new URLSearchParams(queryString);

function getAuth() {
    return JSON.parse(sessionStorage.getItem("auth"));
}

function requiredLogin(pageName, premium = false) {
    if (getAuth().state == 0) {
        switch (pageName) {
            case 'dashboard':
                window.location.href = "/src/auth/login.html?backUrl=dashboard";
                break;
            case 'book-category':
                window.location.href = "/src/auth/login.html?backUrl=book-category";
                break;
            case 'databook':
                window.location.href = "/src/auth/login.html?backUrl=databook";
                break;
            default:
                window.location.href = "/src/auth/login.html";
        }
    }

    if (premium == true && getAuth().type != "premium") {
        switch (pageName) {
            case 'dashboard':
                window.location.href = "/src/auth/login.html?backUrl=dashboard";
                break;
            case 'book-category':
                window.location.href = "/src/auth/login.html?backUrl=book-category";
                break;
            case 'databook':
                window.location.href = "/src/auth/login.html?backUrl=databook";
                break;
            default:
                window.location.href = "/src/auth/login.html";
        }
    }
}

function userMenuBtnBehavior() {
    $userWrap = $(".user-wrap");
    $btn = $(`.user-menu-btn`);
    $menu = $(`.user-menu-wrap`);

    $userWrap.click(function (e) {
        e.preventDefault();
        if ($btn.hasClass("fa-caret-up")) {
            //close
            $btn.removeClass("fa-caret-up");
            $btn.addClass("fa-caret-down");
            if (!$menu.hasClass("hidden")) {
                $menu.addClass("hidden");
            }
        } else {
            //open
            $btn.removeClass("fa-caret-down");
            $btn.addClass("fa-caret-up");
            if ($menu.hasClass("hidden")) {
                $menu.removeClass("hidden");
            }
        }
    });
}

$(function () {
    if (getAuth().state == 1) {
        if ($(`.nav-bar .user-wrap`).hasClass("hidden")) {
            $(`.nav-bar .user-wrap`).removeClass("hidden");
            $(`.nav-bar .user-wrap span.user-name`).text(getAuth().username);
            $(`.nav-bar .user-wrap .user-info img`).attr("src", getAuth().ava);
        }
        if ($(`.nav-bar-menu .logout`).hasClass("hidden")) {
            $(`.nav-bar-menu .logout`).removeClass("hidden");
        }
        if (!$(`.nav-bar-menu .login`).hasClass("hidden")) {
            $(`.nav-bar-menu .login`).addClass("hidden");
        }
    } else {
        if (!$(`.nav-bar .user-wrap`).hasClass("hidden")) {
            $(`.nav-bar .user-wrap`).addClass("hidden");
        }
        if (!$(`.nav-bar-menu .logout`).hasClass("hidden")) {
            $(`.nav-bar-menu .logout`).addClass("hidden");
        }
        if ($(`.nav-bar-menu .login`).hasClass("hidden")) {
            $(`.nav-bar-menu .login`).removeClass("hidden");
        }
    }

    userMenuBtnBehavior();
})