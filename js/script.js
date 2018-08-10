$(document).ready(function() {
    
    function reveal(element) {
    
    var d= 0;
    $(element).each(function() {
        $(this).delay(d).addClass('reveal');
        d += 1000000;
    });
    }
    
    function hide(element) {
    
    var d= 0;
    $(element).each(function() {
        $(this).delay(d).removeClass('reveal');
        d += 1000000;
    });
    }
    
    reveal('.page > *');
    
    $(".nav-toggle").click(function() {
        $("#main-nav").toggleClass("open");
        
        if ($("#main-nav").hasClass("open")) {
            reveal('#main-nav li');
        } else {
            hide('#main-nav li');
        }
    });
        
});