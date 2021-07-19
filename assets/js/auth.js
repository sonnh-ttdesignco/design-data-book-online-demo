let backUrl;
if (urlParams.get("backUrl") != null) {
    backUrl = escapeOutput(urlParams.get("backUrl"));
}

var usersDB = [{
    "username": "demouser1",
    "password": "demo",
    "ava": "/assets/img/auth/img_avatar.png",
    "type": "standard"
}, {
    "username": "demouser2",
    "password": "demo",
    "ava": "/assets/img/auth/img_avatar2.png",
    "type": "premium"
}]


var myAuth = {
    state: 0,
    username: "",
    ava: "",
    type: ""
}

if (typeof (Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    if (!window.sessionStorage.getItem("auth")) {
        window.sessionStorage.setItem("auth", JSON.stringify(myAuth))
    }
} else {
    // Sorry! No Web Storage support..
}

function login(loginInfo) {
    let $username = loginInfo.username;
    let $password = loginInfo.password;
    let user;
    let result = {
        status: "fail",
        msg: "Your username or password is not correct!"
    }
    if (usersDB.findIndex(x => x.username == $username &&
            x.password == $password) > -1) {

        user = usersDB.find(x => x.username == $username &&
            x.password == $password)


        myAuth = {
            state: 1,
            username: user.username,
            ava: user.ava,
            type: user.type
        }

        window.sessionStorage.setItem("auth", JSON.stringify(myAuth))
        switch (backUrl) {
            case 'dashboard':
                window.location.href = "/src/dashboard/dashboard.html";
                break;
            case 'book-category':
                window.location.href = "/src/databook/book-category.html";
                break;
            case 'databook':
                window.location.href = "/src/databook/databook.html";
                break;
            default:
                window.location.href = "/index.html";
                break;
        }
        result = {
            status: "success",
            msg: "Login successfully!"
        };
        return result;

    } else {
        return result;
    }
}

function logout() {
    myAuth = {
        state: 0,
        username: "",
        type: ""
    };
    window.location.href = "/src/auth/login.html";
    window.sessionStorage.setItem("auth", JSON.stringify(myAuth));
}