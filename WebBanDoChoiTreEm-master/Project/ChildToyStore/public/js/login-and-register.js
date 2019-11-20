$(document).ready(function () {
    $(".dangNhap").click(function (e) { 
        e.preventDefault();
        $(".register").removeClass("hienForm");
        $(".login").removeClass("anForm");
        $(".register").addClass("anForm");
        $(".login").addClass("hienForm");
    });

    $(".dangKy").click(function (e) { 
        e.preventDefault();
        $(".login").removeClass("hienForm");
        $(".register").removeClass("anForm");
        $(".login").addClass("anForm");
        $(".register").addClass("hienForm");
        
    });

    $("#btnDangnhap").click(function(e){
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        // alert(username)
        //var num = 'a';
        //alert(num);
        //import {md5} from 'md5';
        //var passwordhash = md5(password);
        // console.log(passwordhash);
        window.location = "/accounts/" + username + "/" + password ;
    });
    $("#dangKy").click(function(e){
        e.preventDefault();
        // alert('aaaaaa')
        window.location = "/registers";
    })
    // $("#btnDangky").click(function(e){
    //     e.preventDefault();
    //     var regusername = $("#regis-username").val();
    //     alert(regusername);
    // })
});