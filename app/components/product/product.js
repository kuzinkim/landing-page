$('.js-slick-main').each(function(index,element){
    $(element).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:  $(element).parent().find('.js-slider-prev'),
        nextArrow: $(element).parent().find('.js-slider-next'),
        asNavFor: '.js-slick-row'
    });
});

$('.js-slick-row').slick({
  slidesToShow: 6,
  slidesToScroll: 1,
  asNavFor: '.js-slick-main',
  arrows: false,
  draggable: false,
  swipe: false,
  touchMove: false,
  infinite: true
});

$('.js-item-slide').on('click', function(){
  var slideValue = $(this).attr('data-num')
  $('.js-slick-main').slick('slickGoTo', slideValue);
})

$('.js-slick-two').each(function(index,element){
  $(element).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      speed: 500,
      cssEase: 'linear',
      prevArrow:  $(element).parent().find('.js-slider-prev'),
      nextArrow: $(element).parent().find('.js-slider-next'),
  });
});