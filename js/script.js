function reveal(elements, initialDelay, speed) {
    var delay = initialDelay;
    $(elements).each(function (index) {
        var element = this;
        delay = (initialDelay + (index * speed));
        setTimeout(function () {
            $(element).addClass('reveal');
        }, delay);
    });
}
    
function hide(elements, initialDelay, speed) {
    var delay = initialDelay;
    $(elements).each(function (index) {
        var element = this;
        delay = (initialDelay + (index * speed));
        setTimeout(function () {
            $(element).removeClass('reveal');
        }, delay);
    });
}

function scrolledTo() {
    $('.page').each(function (index) {
        var currentPage = this.id,
            leftEdge = $(this).children(".contents").offset().left,
            rightEdge = leftEdge + $(this).innerWidth();
        function pagePositions() {
            var scrollLeft = $('.container').scrollLeft(),
                scrollRight = $('.container').width() + scrollLeft,
                contents = '#' + currentPage + ' .contents > *';
            if (scrollRight >= leftEdge) {
                reveal(contents, 0, 100);
                if (currentPage == "contact") {
                    //$('main').css('border-right','0px solid transparent'); 
                    
                } else {
                    //$('main').css('border-right','10px solid transparent');
                }
            }
            /*if (scrollLeft >= rightEdge) {
                hide(contents, 0, 100);
            }*/
        }
        
        pagePositions();
        $('.container').scroll(pagePositions);
    });
}

function navBorder() {
    var navEdge = $('.nav-toggle').offset().left + $('.nav-toggle').height(),
        contactEdge = $('#contact').offset().left;
    if (navEdge >= contactEdge) {
        $('#main-nav').css('border-color', 'initial');
        $('.nav-toggle').css('border-color', 'initial');
    } else {
        $('#main-nav').css('border-color', 'transparent');
        $('.nav-toggle').css('border-color', 'transparent');
    }
}

function smoothScroll() {
    $('a[href*=\\#]').each(function (index) {
        function linkPositions(){
            var hash = this.hash;
            leftEdge = $(hash).offset().left;
        }
        
        function scroller() {
            $(this).on('click', function(event){     
                event.preventDefault();
                $('.container').animate({scrollLeft:leftEdge}, 500);
            });
            linkPositions();
        }
        
        linkPositions();
        scroller();
    });
}

$(document).ready(function() {
    
    /*$(function() {
        $("main").mousewheel(function(evt, chg) {
            this.scrollLeft -= (chg * 1);
            evt.preventDefault();
            console.log(chg);
        });
    });*/
    
    $(".nav-toggle").click(function () {
        
        $("#main-nav").toggleClass("open");
        
        if ($("#main-nav").hasClass("open")) {
            reveal('#main-nav li', 100, 100);          

        } else {
            hide('#main-nav li', 100, 0);         

        }       
    });
    
    navBorder();
    scrolledTo();
    smoothScroll();
    $(window).resize(scrolledTo, navBorder, smoothScroll);
    $('.container').scroll(navBorder);
});
