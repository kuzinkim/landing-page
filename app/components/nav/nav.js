if($('.js-navigation').length > 0){
    $(document).scroll(function() {
        checkOffsetNav();
    });
    function checkOffsetNav() {
        if($('.js-navigation').offset().top + $('.js-navigation').height() 
                                            >= $('.js-map').offset().top - 100)
            $('.js-navigation').css('position', 'absolute').css('bottom', '1500px');
        if($(document).scrollTop() + window.innerHeight < $('.js-map').offset().top)
            $('.js-navigation').css('position', 'fixed').css('bottom', '50%'); 
    }
}
$('body').on('click', '.js-nav-scrolling[href*="#"]', function(e){
    var fixed_offset = 160;
    $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
    e.preventDefault();
});

var nav = $('.js-navigation').length;
if(nav > 0){
    $(document).on('scroll', function(){
        var scroll = $('body').scrollTop() || $('html').scrollTop() || $(document).scrollTop();
        var center = scroll + window.innerHeight / 2;
        var $screens = $('.js-screen');
        var $activeScreen = $screens.filter(function() { 
            var top = $(this).offset().top; 
            var bottom = top + $(this).innerHeight();
            return (top <= center && bottom >= center); 
        });
        var ind = $screens.index($activeScreen);
        var $line = $('.js-nav-line');
        $line.removeClass('active');
        $line.eq(ind).addClass('active');
    });
}