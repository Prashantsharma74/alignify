(function ($) {
  "use strict";
  var windowOn = $(window);

  /*======================================
	Preloader activation
	========================================*/
	$(window).on('load', function (event) {
		$('#preloader').delay(500).fadeOut(500);
	});

  /*======================================
	Mobile Menu Js
	========================================*/
  $("#mobile-menu").meanmenu({
    meanMenuContainer: ".mobile-menu",
    meanScreenWidth: "991",
    meanExpand: ['<i class="fa-regular fa-angle-right"></i>'],
  });

  $("#mobile-menu-2").meanmenu({
    meanMenuContainer: ".mobile-menu-2",
    meanScreenWidth: "4000",
    meanExpand: ['<i class="fa-regular fa-angle-right"></i>'],
  });

  /*======================================
	Sidebar Toggle
	========================================*/
  $(".offcanvas__close,.offcanvas__overlay").on("click", function () {
    $(".offcanvas__area").removeClass("info-open");
    $(".offcanvas__overlay").removeClass("overlay-open");
  });
  $(".sidebar__toggle").on("click", function () {
    $(".offcanvas__area").addClass("info-open");
    $(".offcanvas__overlay").addClass("overlay-open");
  });

  /*======================================
	Body overlay Js
	========================================*/
  $(".body-overlay").on("click", function () {
    $(".offcanvas__area").removeClass("opened");
    $(".body-overlay").removeClass("opened");
  });

  /*======================================
	Sticky Header Js
	========================================*/

  $(window).scroll(function () {
    if ($(this).scrollTop() > 250) {
      $("#header-sticky").addClass("bd-sticky");
    } else {
      $("#header-sticky").removeClass("bd-sticky");
    }
  });

  /*======================================
	Data Css js
	========================================*/
  $("[data-background").each(function() {
    $(this).css(
        "background-image",
        "url( " + $(this).attr("data-background") + "  )"
    );
  });

  $("[data-width]").each(function() {
      $(this).css("width", $(this).attr("data-width"));
  });

  $("[data-bg-color]").each(function() {
      $(this).css("background-color", $(this).attr("data-bg-color"));
  });

  /*======================================
	MagnificPopup image view
	========================================*/
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /*======================================
	MagnificPopup video view
	========================================*/
  $(".popup-video").magnificPopup({
    type: "iframe",
  });

  /*======================================
	Counter Js
	========================================*/

  $(".counter").counterUp({
    delay: 10,
    time: 1000,
  });

  /*======================================
	Wow Js
	========================================*/
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: false, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

  /*======================================
	Nice Select Js
	========================================*/
  $(".loan__select, .contact__select").niceSelect();

  /*======================================
	Button scroll up js
	========================================*/
  
    var progressPath = document.querySelector(".backtotop-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
        "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
        "stroke-dashoffset 10ms linear";
    var updateProgress = function() {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength) / height;
        progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 150;
    var duration = 550;
    jQuery(window).on("scroll", function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery(".backtotop-wrap").addClass("active-progress");
        } else {
            jQuery(".backtotop-wrap").removeClass("active-progress");
        }
    });
    jQuery(".backtotop-wrap").on("click", function(event) {
        event.preventDefault();
        jQuery("html, body").animate({
            scrollTop: 0
        }, duration);
        return false;
    });
    
    /*======================================
	One Page Scroll Js
	========================================*/
    function scrollNav() {
        $(".onepage-menu li a").click(function () {
        $(".onepage-menu li a.active").removeClass("active");
        $(this).addClass("active");

        $("html, body")
            .stop()
            .animate(
            {
                scrollTop: $($(this).attr("href")).offset().top - 96,
            },
            300
            );
        return false;
        });
    }
    scrollNav();

    /*======================================
	Smoth animatio Js
	========================================*/

    $(document).on('click', '.smoth-animation', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 50
        }, 300);
    });

  /*======================================
	 Map activation js
	========================================*/
  $(".location-dot").on("mouseenter", function () {
    $(this)
      .addClass("active")
      .parent()
      .siblings()
      .find(".location-dot")
      .removeClass("active");
  });

  $(".features__active").slick({
      slidesToShow: 1,
      vertical: true,
      verticalSwiping: true,
      swipeToSlide: true,
      focusOnSelect: true,
      dots: true,
      arrows: false,
      speed: 500,
  });

  var common = new Swiper(".common__carousel-active", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      roundLengths: true,
      autoplay: {
          delay: 3000,
      },
      navigation: {
          nextEl: ".common__slider-button-next",
          prevEl: ".common__slider-button-prev",
      },
      pagination: {
          el: ".bd-swiper-dot",
          clickable: true,
      },
      breakpoints: {
          1400: {
              slidesPerView: 3,
          },
          1200: {
              slidesPerView: 3,
          },
          992: {
              slidesPerView: 3,
          },
          768: {
              slidesPerView: 2,
          },
          576: {
              slidesPerView: 1,
          },
          0: {
              slidesPerView: 1,
          },
      },
  });

  var common = new Swiper(".team__carousel-active", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      roundLengths: true,
      centeredSlides: true,
      autoplay: {
          delay: 3000,
      },
      navigation: {
          nextEl: ".common__slider-button-next",
          prevEl: ".common__slider-button-prev",
      },
      pagination: {
          el: ".bd-swiper-dot",
          clickable: true,
      },
      breakpoints: {
          1400: {
              slidesPerView: 3,
          },
          1200: {
              slidesPerView: 3,
          },
          992: {
              slidesPerView: 3,
          },
          768: {
              slidesPerView: 2,
          },
          576: {
              slidesPerView: 1,
          },
          0: {
              slidesPerView: 1,
          },
      },
  });

  var servive = new Swiper(".service__active", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      roundLengths: true,
      autoplay: {
          delay: 3000,
      },
      navigation: {
          nextEl: ".service__button-next",
          prevEl: ".service__button-prev",
      },
      pagination: {
          el: ".bd-swiper-dot",
          clickable: true,
      },
      breakpoints: {
          1400: {
              slidesPerView: 3,
          },
          1200: {
              slidesPerView: 3,
          },
          992: {
              slidesPerView: 3,
          },
          768: {
              slidesPerView: 2,
          },
          576: {
              slidesPerView: 1,
          },
          0: {
              slidesPerView: 1,
          },
      },
  });

  var brand = new Swiper(".brnad__active", {
    slidesPerView: 6,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    autoplay: {
        delay: 3000,
    },
    breakpoints: {
        1400: {
            slidesPerView: 6,
        },
        1200: {
            slidesPerView: 5,
        },
        992: {
            slidesPerView: 4,
        },
        768: {
            slidesPerView: 3,
        },
        576: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
  });

  var brandTwo = new Swiper(".brnad__active-2", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    autoplay: {
        delay: 3000,
    },
    breakpoints: {
        1400: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 3,
        },
        576: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },
  });

  var benifite = new Swiper(".benefits__active", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      roundLengths: true,
      autoplay: {
          delay: 3000,
      },
      pagination: {
          el: ".bd-swiper-dot",
          clickable: true,
      },
      breakpoints: {
          1400: {
              slidesPerView: 3,
          },
          1200: {
              slidesPerView: 3,
          },
          992: {
              slidesPerView: 3,
          },
          768: {
              slidesPerView: 2,
          },
          576: {
              slidesPerView: 1,
          },
          0: {
              slidesPerView: 1,
          },
      },
  });

  var loan = new Swiper(".loan__active", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      roundLengths: true,
      autoplay: {
          delay: 3000,
      },
      navigation: {
          nextEl: ".loan__button-next",
          prevEl: ".loan__button-prev",
      },
      pagination: {
          el: ".bd-swiper-dot",
          clickable: true,
      },
      breakpoints: {
          1400: {
              slidesPerView: 3,
          },
          1200: {
              slidesPerView: 3,
          },
          992: {
              slidesPerView: 3,
          },
          768: {
              slidesPerView: 2,
          },
          576: {
              slidesPerView: 1,
          },
          0: {
              slidesPerView: 1,
          },
      },
  });

  /*======================================
  Wealth slider js
  ========================================*/
  var wealth = new Swiper(".wealth__active", {
      slidesPerView: 2,
      spaceBetween: 45,
      loop: true,
      roundLengths: true,
      autoplay: {
          delay: 3000,
      },
      navigation: {
          nextEl: ".wealth__button-next",
          prevEl: ".wealth__button-prev",
      },
      pagination: {
          el: ".bd-swiper-dot",
          clickable: true,
      },
      breakpoints: {
          1200: {
              slidesPerView: 2,
          },
          992: {
              slidesPerView: 2,
          },
          768: {
              slidesPerView: 2,
          },
          576: {
              slidesPerView: 1,
          },
          0: {
              slidesPerView: 1,
          },
      },
  });

  /*======================================
  Range slider js
  ========================================*/
  $(".loan-range-bar").slider({
    range: "min",
    min: 0,
    max: 50000, // Adjust the maximum value as needed
    value: 800,
    slide: function(event, ui) {
        $(".loan-amount").val("$" + ui.value + " USD");
    },
  });

  /*======================================
  Parallax Swiper
  ========================================*/
    var parallaxSlider;
    var parallaxSliderOptions = {
        speed: 1500,
        autoplay: {
            delay: 5000,
        },
        parallax: true,
        loop: true,
    
        pagination: {
            el: ".bd-slider-dot",
            clickable: true,
        },
    
        navigation: {
            nextEl: ".slider__button-prev",
            prevEl: ".slider__button-next",
        },
        on: {
            init: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    $(swiper.slides[i])
                        .find(".slider__thumb-bg")
                        .attr({
                            "data-swiper-parallax": 0.75 * swiper.width,
                        });
                }
            },
            resize: function() {
                this.update();
            },
        },
    };
    parallaxSlider = new Swiper(
        ".slider-prlx .parallax-slider",
        parallaxSliderOptions
    );

  /*======================================
  Slider Swiper
  ========================================*/
  if (jQuery(".slider__active").length > 0) {
    let sliderActive1 = ".slider__active";
    let sliderInit1 = new Swiper(sliderActive1, {
      // Optional parameters
      slidesPerView: 1,
      slidesPerColumn: 1,
      paginationClickable: true,
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      effect: "fade",
      autoplay: {
        delay: 5000,
      },
      navigation: {
        nextEl: ".slider__button-prev",
        prevEl: ".slider__button-next",
      },
      pagination: {
        el: ".bd-slider-dot",
        clickable: true,
      },
      a11y: false,
    });

    function animated_swiper(selector, init) {
      let animated = function animated() {
          $(selector + " [data-animation]").each(function() {
              let anim = $(this).data("animation");
              let delay = $(this).data("delay");
              let duration = $(this).data("duration");

              $(this)
                  .removeClass("anim" + anim)
                  .addClass(anim + " animated")
                  .css({
                      webkitAnimationDelay: delay,
                      animationDelay: delay,
                      webkitAnimationDuration: duration,
                      animationDuration: duration,
                  })
                  .one(
                      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                      function() {
                          $(this).removeClass(anim + " animated");
                      }
                  );
          });
      };
      animated();
      // Make animated when slide change
      init.on("slideChange", function() {
          $(sliderActive1 + " [data-animation]").removeClass("animated");
      });
      init.on("slideChange", animated);
  }

  animated_swiper(sliderActive1, sliderInit1);
  }

  var testimonial = new Swiper(".testimonial__active", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    autoplay: {
        delay: 3000,
    },
    navigation: {
        nextEl: ".testimonial__button-next",
        prevEl: ".testimonial__button-prev",
    },
    pagination: {
        el: ".bd-swiper-dot",
        clickable: true,
    },
  });

  $(".testimonial-slide").slick({
    speed: 300,
    autoplay: true,
    arrows: false,
    prevArrow: '<button type="button" class="slick-prev"><i class="fa-regular fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fa-regular fa-chevron-right"></i></button>',
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [{
            breakpoint: 1400,
            slidesToShow: 2,
        },
        {
            breakpoint: 1200,
            slidesToShow: 2,
        },
        {
            breakpoint: 992,
            slidesToShow: 1,
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                centerMode: false,
                slidesToShow: 1,
            },
        },
    ],
  });

  /*======================================
  Feedback activation js
  ========================================*/

  $(".feedback__active").slick({
    focusOnSelect: true,
    pauseOnHover: false,
    centerMode: true,
    autoplay: 3000,
    dots: true,
    centerPadding: "0px",
    infinite: true,
    prevArrow: '<button type="button" class="slick-prev feedback__button-prev"><i class="fa-regular fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next feedback__button-next"><i class="fa-regular fa-chevron-right"></i></button>',
    appendArrows: $(".feedback__navigation"),
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [{
            breakpoint: 1400,
            slidesToShow: 1,
        },
        {
            breakpoint: 1200,
            slidesToShow: 2,
        },
        {
            breakpoint: 992,
            slidesToShow: 1,
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                centerMode: false,
                slidesToShow: 1,
            },
        },
    ],
  });

  var feedbackTwo = new Swiper(".feedback__active-2", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    roundLengths: true,
    fadeEffect: { crossFade: true },
    effect: "cards",
    grabCursor: true,
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: ".feedback__button-next-2",
        prevEl: ".feedback__button-prev-2",
    },
  });

  var feedbackThree = new Swiper(".feedback__active-3", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    autoplay: {
        delay: 3000,
    },
    navigation: {
        nextEl: ".feedback__button-prev",
        prevEl: ".feedback__button-next",
    },
    pagination: {
        el: ".bd-swiper-dot",
        clickable: true,
    },
    breakpoints: {
        1200: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 2,
        },
        576: {
            slidesPerView: 1,
        },
        0: {
            slidesPerView: 1,
        },
    },
  });

  var feedbackFour = new Swiper(".feedback__active-4", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    autoplay: {
        delay: 3000,
    },
    navigation: {
        nextEl: ".feedback__button-prev-4",
        prevEl: ".feedback__button-next-4",
    },
    pagination: {
        el: ".bd-swiper-dot",
        clickable: true,
    },
  });

  var feedbackFive = new Swiper(".feedback__active-5", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    roundLengths: true,
    autoplay: {
        delay: 3000,
    },
    navigation: {
        nextEl: ".feedback__button-prev-5",
        prevEl: ".feedback__button-next-5",
    },
    pagination: {
        el: ".bd-swiper-dot",
        clickable: true,
    },
  });

  var feedbackSix = new Swiper(".feedback__active-6", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 3000,
    },
    pagination: {
        el: ".bd-swiper-dot",
        clickable: true,
    },
  });

  var feedbackSeven = new Swiper(".feedback__active-7", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 3000,
    },
    navigation: {
        nextEl: ".common__slider-button-next",
        prevEl: ".common__slider-button-prev",
    },
    pagination: {
        el: ".bd-swiper-dot",
        clickable: true,
    },
  });

})(jQuery);
