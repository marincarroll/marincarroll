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
            leftEdge = $(this).children(".contents").offset().left;
        
        function positions() {
            var scrollPos = $('main').width() + $('main').scrollLeft();        
            if (scrollPos >= leftEdge) {
                reveal('#' + currentPage + ' .contents > *', 0, 100);
                if (currentPage == "contact") {
                    $('main').css('border-right','none');
                }
            }
        } 
        
        positions();
        $('main').scroll(positions);
    });
}

$(document).ready(function () {
    
    /*$(function() {
   $("main").mousewheel(function(evt, chg) {
      this.scrollLeft -= (chg * 1); //need a value to speed up the change
      evt.preventDefault();
   });
});*/
    
 $(function() {
	$('#main-nav a').bind('click',function(event){
		var $anchor = $(this);
		
		$('main').stop().animate({
			scrollLeft: $($anchor.attr('href')).offset().left
		}, 900);
		event.preventDefault();
	});
});
    
    scrolledTo();

    $(".nav-toggle").click(function () {
        $("#main-nav").toggleClass("open");
        
        if ($("#main-nav").hasClass("open")) {
            reveal('#main-nav li', 100, 100);
        } else {
            hide('#main-nav li', 100, 0);
        }
    });
    
    $(window).resize(scrolledTo);
});
