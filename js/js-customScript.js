jQuery(document).ready(function () {

    jQuery('#mainHomeSlider').owlCarousel({
        loop: true,
        center: true,
        nav: true,
        responsive: {
            0: {
                items: 1
            }
        }
    })
    jQuery(".owl-prev").html('<i class="fa fa-chevron-left"></i>');
    jQuery(".owl-next").html('<i class="fa fa-chevron-right"></i>');


    jQuery('#testimonialSlider').owlCarousel({
        loop: true,
        center: true,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })


});

(function ($) {
    "use strict";
    var openBtn = $("#open-button"),
        colseBtn = $("#close-button"),
        menu = $(".menu-wrap");
    openBtn.on("click", function () {
        menu.addClass("active");
    });

    colseBtn.on("click", function () {
        menu.removeClass("active");
    });

    $(document).on("click", function (e) {
        var target = $(e.target);
        if (target.is(".menu-wrap, .menu, .icon-list, .icon-list a, .icon-list a span, #open-button") === false) {
            menu.removeClass("active");
            e.stopPropagation();
        }
    });
})(jQuery);


var stgPadding;
if ($(window).width() < 1199) {
    stgPadding = 0;
} else {
    stgPadding = 250;
}

$(document).ready(function () {
    var bigimage = $("#big");
    var thumbs = $("#thumbs");
    var syncedSecondary = true;

    bigimage
        .owlCarousel({
            items: 1,
            smartSpeed: 450,
            stagePadding: stgPadding,
            nav: true,
            autoplayHoverPause: true,
            dots: false,
            loop: true,
            responsiveRefreshRate: 200,
            navText: [
                '<i class="fa fa-arrow-left" aria-hidden="true"></i><span>1/14</span>',
                '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
            ]
        })
        .on("changed.owl.carousel", syncPosition);

    thumbs
        .on("initialized.owl.carousel", function () {
            thumbs
                .find(".owl-item")
                .eq(0)
                .addClass("current");
        })
        .owlCarousel({
            items: 4,
            dots: true,
            nav: true,
            navText: [
                '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
                '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
            ],
            smartSpeed: 800,
            slideSpeed: 800,
            slideBy: 4,
            responsiveRefreshRate: 100
        })
        .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        thumbs
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = thumbs.find(".owl-item.active").length - 1;
        var start = thumbs
            .find(".owl-item.active")
            .first()
            .index();
        var end = thumbs
            .find(".owl-item.active")
            .last()
            .index();

        if (current > end) {
            thumbs.data("owl.carousel").to(current, 100, true);
        }
        if (current < start) {
            thumbs.data("owl.carousel").to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            bigimage.data("owl.carousel").to(number, 100, true);
        }
    }

    thumbs.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        bigimage.data("owl.carousel").to(number, 300, true);
    });

    $(".btn-contact").click(function () {
		$('.contact-popup').addClass('show');
	});

	$(".closerequest-icon").click(function () {
		$('.contact-popup').removeClass('show');
		$('.overlay').removeClass('show');
	});
});

var a = 0;
$(window).scroll(function () {

    var oTop = $('#counter').offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
        $('.counter-value').each(function () {
            var $this = $(this),
                countTo = $this.attr('data-count');
            $({
                countNum: $this.text()
            }).animate({
                    countNum: countTo
                },

                {

                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                        //alert('finished');
                    }

                });
        });
        a = 1;
    }

});