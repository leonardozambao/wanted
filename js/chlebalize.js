
function changeState(e, eClass) {
    if ($(e).hasClass(eClass)) {
        return false;
    } else {
        $('section').removeClass(eClass);
        $(e).addClass(eClass);
    }
}

var lastScrollTop = 0;
function divSelect(scroll) {
    $('section').each(function () {
        var posDiv = $(this).offset().top;
        var divHeight = $(this).innerHeight();
        var divPosition = posDiv + divHeight;
        var windowHeight = $(window).innerHeight();
        var scrollPosition = scroll;

        if (scrollPosition > posDiv) {
            changeState($(this), 'state-one');
        }
        if (scrollPosition > posDiv - (windowHeight / 2) && scrollPosition < divPosition + (windowHeight / 2)) {
            changeState($(this), 'state-two');
        }
        if (scrollPosition > posDiv - ((windowHeight / 2) + 200) && scrollPosition < divPosition - windowHeight) {
            changeState($(this), 'state-three');
        }
    });

    if (scroll > lastScrollTop) {
        //descendo scroll
        if (scroll > $('header').innerHeight()) {
            $('header').removeClass('show').addClass('no-top');
        } else {
            $('header').addClass('show').removeClass('no-top');
        }
		changeValue('down');
    } else {
        //subindo scroll
        if (scroll > $('header').innerHeight()) {
            $('header').addClass('no-top');
        } else {
            $('header').removeClass('no-top');
        }
        $('header').addClass('show')
		changeValue('up');
    }
    lastScrollTop = scroll;
};
$(window).scroll(function (e) {
    var scroll = $(this).scrollTop();
    divSelect(scroll);
});

function changeValue(e) {
    $('.state-two [class*="parallax"]').each(function () {
        var target = $(this);
        var cssSelector = '';
        var increment;
        var decrement;
        var unity = 'px';
        var limit = 60;
        var velocity = 2;
        var thisHeight = '';

        if ($(target).hasClass('half-limit')) {
            limit = limit / 2;
        }
        if ($(target).hasClass('double-velocity')) {
            velocity = velocity * 2;
        }
        if ($(target).hasClass('half-velocity')) {
            velocity = velocity / 2;
        }
        if ($(target).hasClass('double-limit')) {
            limit = limit * 2;
        }
        if ($(target).hasClass('parallax-simple')) {
            cssSelector = 'top';
        }
        if ($(target).hasClass('parallax-background')) {
            cssSelector = 'background-position-y';
        }
        if ($(target).hasClass('parallax-horizontal')) {
            if ($(target).hasClass('from-right')) {
                cssSelector = 'right';
            } else {
                cssSelector = 'left';
            }
        }
        //pega valor atual para incrementar posteriormente
        var currentValue = parseFloat($(target).css(cssSelector));
        if (!currentValue) {
            currentValue = 0;
        }

        if (currentValue > - limit) {
            var decrement = (currentValue - velocity);
        }
        if (currentValue < limit) {
            var increment = (currentValue + velocity);
        }
        if (e == 'down') {
            if ($(target).hasClass('reverse')) {
                $(target).css(cssSelector, decrement + unity);
            } else {
                $(target).css(cssSelector, increment + unity);
            }
        } else {
            if ($(target).hasClass('reverse')) {
                $(target).css(cssSelector, increment + unity);
            } else {
                $(target).css(cssSelector, decrement + unity);
            }
        }
    })
}
function changeState(e, eClass) {
    if ($(e).hasClass(eClass)) {
        return false;
    } else {
        $('section').removeClass(eClass);
        $(e).addClass(eClass);
    }
}

function returnTop(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
}

$(document).ready(function(){
    //menu sandwich
    $('.menu-button').on('click', function(){
        $('header').toggleClass('menu-opened');
        $(this).toggleClass('menu-opened');
        return false;
    });

    $('.grid_item').on('click', function(){
        var audio = $(this).attr('href');
        $('.lightbox iframe').attr('src', audio);
        $('.lightbox').fadeIn();
        return false;
    })

    $('.lightbox_background').on('click', function(){
        $('.lightbox').fadeOut();
        $('.lightbox iframe').attr('src', '');
    })
});

function scrollToElement(e, speed, container, margin) {
	var speed = speed != '' ? speed : 3000;
	var container = container != '' ? container : 'html,body';
	var $target = $(e);
	margin = margin != '' ? margin : 0;
	$(container).animate(
		{
			scrollTop: $target.offset().top - margin
		}, {
		duration: speed,
		step: function (now, fx) {
			var newOffset = $target.offset().top - margin;
			if (fx.end !== newOffset)
				fx.end = newOffset;
		}
	}
	);
	return false;
}

$(window).on('load',function () {
    $('.loading-box').fadeOut(400);
})
