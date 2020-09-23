$.extend( $.validator.messages, {
    required: "Поле должно быть заполнено!",
    remote: "Пожалуйста, введите правильное значение.",
    url: "Пожалуйста, введите корректный URL.",
    date: "Пожалуйста, введите корректную дату.",
    dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
    number: "Пожалуйста, введите число.",
    digits: "Пожалуйста, вводите только цифры.",
    creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
    equalTo: "Пожалуйста, введите такое же значение ещё раз.",
    extension: "Пожалуйста, выберите файл с правильным расширением.",
    maxlength: $.validator.format( "Пожалуйста, введите не больше {0} символов." ),
    minlength: $.validator.format( "Пожалуйста, введите не меньше {0} символов." ),
    rangelength: $.validator.format( "Пожалуйста, введите значение длиной от {0} до {1} символов." ),
    range: $.validator.format( "Пожалуйста, введите число от {0} до {1}." ),
    max: $.validator.format( "Пожалуйста, введите число, меньшее или равное {0}." ),
    min: $.validator.format( "Пожалуйста, введите число, большее или равное {0}." )
});

$.validator.addMethod('js-input-phone', function(value, element) {
    return this.optional(element) || $(element).inputmask('unmaskedvalue').length === 10;
}, 'Введите корректный номер');

$('[data-validate]').each(function(index,element){
    $(element).validate({
        errorPlacement: function(error, element) {
            var $parent = element.parent();
            $parent.append(error);
        },
        submitHandler: function(form){
            $(form).trigger('formSubmit');
        },
        onkeyup: function(element) {
            $(element).valid(); 
        }
    });
});

$('.js-input-phone').inputmask('+7 (999) 999-99-99');

var pr = window.innerWidth - $(window).width();
$('.js-popup').magnificPopup({
    items: {
        src: '#one-popup',
        type: 'inline',
    },
    callbacks: {
        beforeOpen: function(){
            var scrollTop = $('html').scrollTop() || $('body').scrollTop() || $(document).scrollTop();
            $('html, body').css('padding-right', pr );
            $('html, body').addClass('is-hidden-mobile');
            $('html, body').scrollTop(scrollTop);
            $(document).scrollTop(scrollTop);
            $('#one-popup').removeClass('fade-Out').addClass('fade-In')
        },
        beforeClose: function(){
            var scrollTop = $('html').scrollTop() || $('body').scrollTop() || $(document).scrollTop();
            $('html, body').css('padding-right', '' );
            $('html, body').removeClass('is-hidden-mobile');
            $('html, body').scrollTop(scrollTop);
            $(document).scrollTop(scrollTop);
        },
    }
});


$('.js-popup-outside, .js-popup-close').on( "click", function() {
    $('html, body').css('padding-right', " " );
    $.magnificPopup.close()
});

$('.js-form').on('formSubmit', function(){
    $('.js-content').hide()
    $('.js-success').show()
})