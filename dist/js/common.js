var debugTimes=!1;$(document).ready(function(){$("#region, #city, #city_popup").select2({sorter:function(e){return e.sort(function(e,t){return e=e.text.toLowerCase(),(t=t.text.toLowerCase())<e?1:e<t?-1:0})}});var i={map:null,dataLoaded:!1,regions:[],cities:[],data:[],currentRegion:"",currentCity:"",loadData:function(){$.get("assets/data/data_new.json",function(e){i.data=e,i.createlists()},"json")},init:function(){this.loadData()},createlists:function(){$.each(i.data,function(e,t){-1==i.regions.indexOf(t[0])&&i.regions.push(t[0]),void 0===i.cities[t[0]]&&(i.cities[t[0]]=[]),-1==i.cities[t[0]].indexOf(t[1])&&i.cities[t[0]].push(t[1])}),this.fillRegions()},fillRegions:function(){$selectRegion=$('select[name="region"]'),$selectRegion.html(""),$.each(i.regions,function(e,t){$selectRegion.append("<option value='"+t+"'>"+t+"</option>")}),this.fillCity(),$('select[name="region"]').on("change",function(){i.fillCity()}),$('select[name="city"]').on("change",function(){i.changeFunc()})},fillCity:function(){$currentRegion=$('select[name="region"]').val(),$selectCity=$('select[name="city"]'),$selectCity.html(""),$.each(i.cities[$currentRegion],function(e,t){$selectCity.append("<option value='"+t+"'>"+t+"</option>")}),this.changeFunc()},changeFunc:function(){i.currentRegion=$('select[name="region"]').val(),i.currentCity=$('select[name="city"]').val(),this.drawPlaceMarks()},placemarks:[],drawPlaceMarks:function(){i.map.geoObjects.removeAll(),i.placemarks=[],i.helperCoors=[],$.each(i.data,function(e,t){if(t[0]!=i.currentRegion)return!0;if(t[1]!=i.currentCity)return!0;if("нет на карте"==t[9])return!0;t[9]=t[9].replace(" ",""),t[9]=t[9].replace(" ",""),t[9]=t[9].replace(" ","");var o,n,a=t[9].split(",");i.helperCoors.push(a),t[4]=t[4].replace(new RegExp("&qout;","ig"),'"'),n=/Значком STIHL/i.test(t[8])?(o=ymaps.templateLayoutFactory.createClass('<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'),new ymaps.Placemark(a,{zIndex:3,balloonContent:"<strong>"+t[4]+"</strong><br>"+t[3]+"<br>"+t[5]},{iconLayout:"default#imageWithContent",iconImageHref:"../assets/images/icon.png",iconImageSize:[35,50],iconImageOffset:[-17,-50],iconContentOffset:[17,25],iconContentLayout:o})):new ymaps.Placemark(a,{balloonContent:"<strong>"+t[4]+"</strong><br>"+t[3]+"<br>"+t[5]},{zIndex:2,preset:"islands#icon",iconColor:"#0095b6"}),i.placemarks.push(n),i.map.geoObjects.add(n)}),setTimeout(function(){i.setZoom()},500)},helperCoors:[],setZoom:function(){i.map.setCenter(i.helperCoors[0],11)}};ymaps.ready(function(){i.map=new ymaps.Map("map",{center:[55.76,37.64],zoom:7}),i.init(),i.map.behaviors.disable("scrollZoom")}),$(".js-slick-main").each(function(e,t){$(t).slick({slidesToShow:1,slidesToScroll:1,prevArrow:$(t).parent().find(".js-slider-prev"),nextArrow:$(t).parent().find(".js-slider-next"),asNavFor:".js-slick-row"})}),$(".js-slick-row").slick({slidesToShow:6,slidesToScroll:1,asNavFor:".js-slick-main",arrows:!1,draggable:!1,swipe:!1,touchMove:!1,infinite:!0}),$(".js-item-slide").on("click",function(){var e=$(this).attr("data-num");$(".js-slick-main").slick("slickGoTo",e)}),$(".js-slick-two").each(function(e,t){$(t).slick({slidesToShow:1,slidesToScroll:1,fade:!0,speed:500,cssEase:"linear",prevArrow:$(t).parent().find(".js-slider-prev"),nextArrow:$(t).parent().find(".js-slider-next")})}),0<$(".js-navigation").length&&$(document).scroll(function(){!function(){$(".js-navigation").offset().top+$(".js-navigation").height()>=$(".js-map").offset().top-100&&$(".js-navigation").css("position","absolute").css("bottom","1500px");$(document).scrollTop()+window.innerHeight<$(".js-map").offset().top&&$(".js-navigation").css("position","fixed").css("bottom","50%")}()}),$("body").on("click",'.js-nav-scrolling[href*="#"]',function(e){$("html,body").stop().animate({scrollTop:$(this.hash).offset().top-160},1e3),e.preventDefault()}),0<$(".js-navigation").length&&$(document).on("scroll",function(){var o=($("body").scrollTop()||$("html").scrollTop()||$(document).scrollTop())+window.innerHeight/2,e=$(".js-screen"),t=e.filter(function(){var e=$(this).offset().top,t=e+$(this).innerHeight();return e<=o&&o<=t}),n=e.index(t),a=$(".js-nav-line");a.removeClass("active"),a.eq(n).addClass("active")}),$(".js-menu").on("click","a",function(e){e.preventDefault();var t=$(this).attr("href"),o=$(t).offset().top;$("body,html").animate({scrollTop:o},1e3)}),$(document).on("click",".js-burg",function(){var e=$("html").scrollTop()||$("body").scrollTop()||$(document).scrollTop();$(this).hasClass("is-active")?($(this).removeClass("is-active"),$(".js-menu").removeClass("is-active"),$("html, body").removeClass("is-hidden-mobile")):($(this).addClass("is-active"),$(".js-menu").addClass("is-active"),$("html, body").addClass("is-hidden-mobile")),$("html, body").scrollTop(e),$(document).scrollTop(e)}),$(document).on("click",".header__nav-link",function(){$(window).width()<=768&&($(".js-menu").removeClass("is-active"),$(".js-burg").removeClass("is-active"),$("html, body").removeClass("is-hidden-mobile"))}),$(document).on("click",".js-click",function(){$(window).width()<=1280&&($(".js-menu").removeClass("is-active"),$(".js-burg").removeClass("is-active"),$("html, body").removeClass("is-hidden-mobile"))});var e=document.getElementById("parallax"),t=(new Parallax(e),document.getElementById("parallax1")),o=(new Parallax(t),document.getElementById("parallax2")),n=(new Parallax(o),document.getElementById("parallax3")),a=(new Parallax(n),document.getElementById("parallax4")),s=(new Parallax(a),document.getElementById("parallax5")),l=(new Parallax(s),document.getElementById("parallax6")),r=(new Parallax(l),document.getElementById("parallax7")),c=(new Parallax(r),document.getElementById("parallax8"));new Parallax(c);$.extend($.validator.messages,{required:"Поле должно быть заполнено!",remote:"Пожалуйста, введите правильное значение.",url:"Пожалуйста, введите корректный URL.",date:"Пожалуйста, введите корректную дату.",dateISO:"Пожалуйста, введите корректную дату в формате ISO.",number:"Пожалуйста, введите число.",digits:"Пожалуйста, вводите только цифры.",creditcard:"Пожалуйста, введите правильный номер кредитной карты.",equalTo:"Пожалуйста, введите такое же значение ещё раз.",extension:"Пожалуйста, выберите файл с правильным расширением.",maxlength:$.validator.format("Пожалуйста, введите не больше {0} символов."),minlength:$.validator.format("Пожалуйста, введите не меньше {0} символов."),rangelength:$.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),range:$.validator.format("Пожалуйста, введите число от {0} до {1}."),max:$.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),min:$.validator.format("Пожалуйста, введите число, большее или равное {0}.")}),$.validator.addMethod("js-input-phone",function(e,t){return this.optional(t)||10===$(t).inputmask("unmaskedvalue").length},"Введите корректный номер"),$("[data-validate]").each(function(e,t){$(t).validate({errorPlacement:function(e,t){t.parent().append(e)},submitHandler:function(e){$(e).trigger("formSubmit")},onkeyup:function(e){$(e).valid()}})}),$(".js-input-phone").inputmask("+7 (999) 999-99-99");var d=window.innerWidth-$(window).width();$(".js-popup").magnificPopup({items:{src:"#one-popup",type:"inline"},callbacks:{beforeOpen:function(){var e=$("html").scrollTop()||$("body").scrollTop()||$(document).scrollTop();$("html, body").css("padding-right",d),$("html, body").addClass("is-hidden-mobile"),$("html, body").scrollTop(e),$(document).scrollTop(e),$("#one-popup").removeClass("fade-Out").addClass("fade-In")},beforeClose:function(){var e=$("html").scrollTop()||$("body").scrollTop()||$(document).scrollTop();$("html, body").css("padding-right",""),$("html, body").removeClass("is-hidden-mobile"),$("html, body").scrollTop(e),$(document).scrollTop(e)}}}),$(".js-popup-outside, .js-popup-close").on("click",function(){$("html, body").css("padding-right"," "),$.magnificPopup.close()}),$(".js-form").on("formSubmit",function(){$(".js-content").hide(),$(".js-success").show()})});