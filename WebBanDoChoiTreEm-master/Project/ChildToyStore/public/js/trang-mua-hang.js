$(document).ready(function () {
    $(".nav-content .nav-link").click(function (e) { 
        e.preventDefault();
        $(".nav-content .nav-link").removeClass("current");
        $(this).addClass("current");
    });
});