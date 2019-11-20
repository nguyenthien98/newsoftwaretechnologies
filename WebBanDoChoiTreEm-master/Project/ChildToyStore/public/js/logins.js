// function Login()
// {
//     console.log('da vo toi day');
//     var username = document.getElementById("username").value;
//     var password = document.getElementById("password").value;
//     //console.log(username);
//     //console.log(password);
//     if (username == "") {
//         alert("Username must be filled!");
//         return;
//     }
//     if (password == "") {
//         alert("Password must be filled!");
//         return;
//     }
//     window.location = "/accounts/" + username + "/" + password;
// } 
$(document).ready(function () {
    $(".dangNhap").click(function(){
        var username = $('#username').val();
        var password = $('#password').val();
        console.log(username)
    });
    // $('#username').keypress(function (e) {
    //     //console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaa');
    //     if (e.keyCode == 13) {
    //         var username = $('#username').val();
    //         var password = $('#password').val();
    //         Login(username, password);
    //     }
    // });

    // $('#password').keypress(function (e) {
    //     if (e.keyCode == 13) {
    //         var username = $('#username').val();
    //         var password = $('#password').val();
    //         // Login(username, password);
    //         if (username == "") {
    //             alert("Username must be filled!");
    //             return;
    //         }
    //         if (password == "") {
    //             alert("Password must be filled!");
    //             return;
    //         }
    //     }
    //     window.location = "/accounts/" + username + "/" + password;
    // });

    // function Login(username, password) {
    //     if (username == "") {
    //         alert("Username must be filled!");
    //         return;
    //     }
    //     if (password == "") {
    //         alert("Password must be filled!");
    //         return;
    //     }
    //     window.location = "/accounts/" + username + "/" + password;
    // }
});