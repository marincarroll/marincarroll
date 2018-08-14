//Setup reveal effect.
function reveal(elements, initialDelay, speed) {
    var delay = initialDelay;
    $(elements).each(function(index) {
        var element = this;
        delay = (initialDelay + (index * speed));
        setTimeout(function() {
            $(element).addClass('reveal');
        }, delay);
    });
}

//Setup hide effect.
function hide(elements, initialDelay, speed) {
    var delay = initialDelay;
    $(elements).each(function(index) {
        var element = this;
        delay = (initialDelay + (index * speed));
        setTimeout(function () {
            $(element).removeClass('reveal');
        }, delay);
    });
}

//Execute reveal/hide on page contents when page is scrolled to.
function scrolledTo() {
    $('.page').each(function() {
        var currentPage = this.id,
            leftEdge = $(this).children(".contents").offset().left,
            rightEdge = leftEdge + $(this).innerWidth();
        function pagePositions() {
            var scrollLeft = $('main').scrollLeft(),
                scrollRight = $('main').width() + scrollLeft,
                contents = '#' + currentPage + ' .contents > *';
            if (scrollRight >= leftEdge) {
                reveal(contents, 0, 100);
            }
            /*if (scrollLeft >= rightEdge) {
                hide(contents, 0, 100);
            }*/
        }
        pagePositions();
        $('main').scroll(pagePositions);
    });
}

//Toggle border effect on nav menu when it overlaps contact page.
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

function scrollSnap() {
    $('.page:not(:last-child)').each(function(){
        var nextTarget = $(this).next().position().left;
        $(this).mousewheel(function(){
            if(event.deltaY >= 50) {
                $('main').animate({
                    scrollLeft: nextTarget
                }, 700);
                console.log("scrolled to: ", nextTarget)
            }
        });
    });
    
    $('.page:not(:first-child)').each(function(){
        var prevTarget = $(this).prev().position().left;
        $(this).mousewheel(function(){
            if(event.deltaY <= -50) {
                $('main').animate({
                    scrollLeft: prevTarget
                }, 700);
                console.log("scrolled to: ", prevTarget)
            }
        });
    });
}

$(document).ready(function() {

    
    //Change vertical scroll to horizontal scroll. 
    $(function() {      
        $("main").mousewheel(function(evt, chg) {
            this.scrollLeft -= (chg);
            evt.preventDefault();
        });
        
        $(document).mousewheel(function(evt){
           evt.preventDefault(); 
        });
    });
    
    //Toggle nav menu.
    $(".nav-toggle").click(function() {
        $("#main-nav").toggleClass("open");
        if ($("#main-nav").hasClass("open")) {
            reveal('#main-nav li', 100, 100);
        } else {
            hide('#main-nav li', 100, 0);
        }
    });
    
    //Smooth scroll effect for all internal links.
    $(document).on('click', 'a[href^="#"]', function(event) {
        event.preventDefault();
        var target = $($.attr(this, 'href'));
        $('main').animate({
            scrollLeft: target.offset().left - $('main').offset().left + $('main').scrollLeft()
        }, 700);
    });
    
    navBorder();
    scrolledTo();
    scrollSnap();
    $(window).resize(scrolledTo, navBorder);
    $('main').scroll(navBorder);
    
});
