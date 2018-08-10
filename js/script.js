$(document).ready(function() {
    $(".nav-toggle").click(function() {
        $("#main-nav").toggleClass("open");
    });
    
    var d= 0;
$('.page > *').each(function() {
    $(this).delay(d).fadeTo('fast', 1).css('margin-top', 'unset');
    d += 100;
});

    $(function() {
        $('.lazy').lazy();
    });
        
});