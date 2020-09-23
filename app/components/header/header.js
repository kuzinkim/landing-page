$(".js-menu").on("click", "a", function (event) {
  event.preventDefault();
  var id = $(this).attr('href'),
    top = $(id).offset().top,
    scrollTo = top;
  $('body,html').animate({
    scrollTop: scrollTo
  }, 1000);
});

$(document).on('click', '.js-burg', function () {
  var scrollTop = $('html').scrollTop() || $('body').scrollTop() || $(document).scrollTop();
  if ($(this).hasClass('is-active')) {
    $(this).removeClass('is-active');
    $('.js-menu').removeClass('is-active');
    $('html, body').removeClass('is-hidden-mobile');
  } else {
    $(this).addClass('is-active');
    $('.js-menu').addClass('is-active');
    $('html, body').addClass('is-hidden-mobile');
  }

  $('html, body').scrollTop(scrollTop);
  $(document).scrollTop(scrollTop);
});

$(document).on('click', '.header__nav-link', function () {
  if ($(window).width() <= 768) {
    $('.js-menu').removeClass('is-active');
    $('.js-burg').removeClass('is-active');
    $('html, body').removeClass('is-hidden-mobile');
  }
});

$(document).on('click', '.js-click', function () {
  if ($(window).width() <= 1280) {
    $('.js-menu').removeClass('is-active');
    $('.js-burg').removeClass('is-active');
    $('html, body').removeClass('is-hidden-mobile');
  }
});

var scene = document.getElementById('parallax');
var parallax = new Parallax(scene);

var scene1 = document.getElementById('parallax1');
var parallax1 = new Parallax(scene1);

var scene2 = document.getElementById('parallax2');
var parallax2 = new Parallax(scene2);

var scene3 = document.getElementById('parallax3');
var parallax3 = new Parallax(scene3);

var scene4 = document.getElementById('parallax4');
var parallax4 = new Parallax(scene4);

var scene5 = document.getElementById('parallax5');
var parallax5 = new Parallax(scene5);

var scene6 = document.getElementById('parallax6');
var parallax6 = new Parallax(scene6);

var scene7 = document.getElementById('parallax7');
var parallax7 = new Parallax(scene7);

var scene8 = document.getElementById('parallax8');
var parallax8 = new Parallax(scene8);