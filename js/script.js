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
    $('.page').each(function(index) {
        var currentPage = this.id;
            leftEdge = $(this).position().left,
            scrollPos = $('main').scrollLeft();

        if (scrollPos >= leftEdge){
            console.log(index, leftEdge, scrollPos);
            reveal('#' + currentPage + '> *', 0, 0);
        }       
    });
}

$(document).ready(function () {
    scrolledTo();

    $(".nav-toggle").click(function () {
        $("#main-nav").toggleClass("open");
        
        if ($("#main-nav").hasClass("open")) {
            reveal('#main-nav li', 100, 65);
        } else {
            hide('#main-nav li', 100, 0);
        }
    });
    
    $('main').scroll(scrolledTo);
    $(window).resize(scrolledTo);
});
