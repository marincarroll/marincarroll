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
            var scrollLeft = $('main').scrollLeft(),
                scrollRight = $('main').width() + scrollLeft,
                contents = '#' + currentPage + ' .contents > *';
            if (scrollRight >= leftEdge) {
                reveal(contents, 0, 100);
                if (currentPage == "contact") {
                    $('main').css('border-right','none'); 
                    
                } else {
                    $('main').css('border-right','10px solid transparent');
                }
            }        
            /*if (scrollLeft >= rightEdge) {
                hide(contents, 0, 100);
            }*/
        } 
        
        pagePositions();
        $('main').scroll(pagePositions);
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

$(document).ready(function() {
    $(".nav-toggle").click(function() {
    
    /*$(function() {
        $("main").mousewheel(function(evt, chg) {
            this.scrollLeft -= (chg * 1);
            evt.preventDefault();
            console.log(chg);
        });
    });*/
    
     $(function() {
        $('a').bind('click',function(event){
            var $anchor = $(this);

            $('main').stop().animate({
                scrollLeft: $($anchor.attr('href')).offset().left
            }, 900);
            event.preventDefault();
        });
    });
    
    $(".nav-toggle").click(function () {
        
        $("#main-nav").toggleClass("open");
        
        if ($("#main-nav").hasClass("open")) {
            reveal('#main-nav li', 100, 100);          
            setTimeout(function(){
                navBorder();
            }, (500 - (500 * contactEdgePercent)));
        } else {
            hide('#main-nav li', 100, 0);         
            setTimeout(function(){
                navBorder();
            }, 500 - (1 - contactEdgePercent));
        }       
    });
});    
    navBorder();
    scrolledTo();
    $(window).resize(scrolledTo, navBorder);
    $('main').scroll(navBorder);
});
