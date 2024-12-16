(function ($) {
  "use strict";

  var windowOn = $(window);

  windowOn.on("load", function () {
    wowAnimation();
  });

  // wow
  function wowAnimation() {
    var wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: false,
      live: true,
    });
    wow.init();
  }

  // preloader
  windowOn.on("load", function () {
    $("#loading").fadeOut(500);
  });




  /*===========================================
	=         Sticky Fix         =
    =============================================*/
  $(window).scroll(function () {
    var topPos = $(this).scrollTop();
    if (topPos > 245) {
      $(".sticky-wrapper").addClass("header-sticky animated slideInDown");
    } else {
      $(".sticky-wrapper").removeClass("header-sticky animated slideInDown");
    }
  });

  /*===========================================
	=         Mobile Menu Active         =
    =============================================*/

  if ($(".mobile-menu").length) {
    var mobileMenuContent = $(".nav-header .main-menu .navigation").html();

    $(".mobile-menu .navigation").append(mobileMenuContent);
    $.fn.mobilemenu = function (options) {
      var opt = $.extend(
        {
          menuToggleBtn: ".menu-toggle",
          bodyToggleClass: "body-visible",
          subMenuClass: "submenu-class",
          subMenuParent: "submenu-item-has-children",
          subMenuParentToggle: "active-class",
          meanExpandClass: "mean-expand-class",
          appendElement: '<span class="mean-expand-class"></span>',
          subMenuToggleClass: "menu-open",
          toggleSpeed: 400,
        },
        options
      );

      return this.each(function () {
        var menu = $(this);

        function menuToggle() {
          menu.toggleClass(opt.bodyToggleClass);

          var subMenu = "." + opt.subMenuClass;
          $(subMenu).each(function () {
            if ($(this).hasClass(opt.subMenuToggleClass)) {
              $(this).removeClass(opt.subMenuToggleClass);
              $(this).css("display", "none");
              $(this).parent().removeClass(opt.subMenuParentToggle);
            }
          });
        }

        menu.find("li").each(function () {
          var submenu = $(this).find("ul");
          submenu.addClass(opt.subMenuClass);
          submenu.css("display", "none");
          submenu.parent().addClass(opt.subMenuParent);
          submenu.prev("a").append(opt.appendElement);
          submenu.next("a").append(opt.appendElement);
        });

        function toggleDropDown($element) {
          var $parent = $($element).parent();
          var $siblings = $parent.siblings();

          $siblings.removeClass(opt.subMenuParentToggle);
          $siblings
            .find("ul")
            .slideUp(opt.toggleSpeed)
            .removeClass(opt.subMenuToggleClass);

          $parent.toggleClass(opt.subMenuParentToggle);
          $($element)
            .next("ul")
            .slideToggle(opt.toggleSpeed)
            .toggleClass(opt.subMenuToggleClass);
        }

        var expandToggler = "." + opt.meanExpandClass;
        $(expandToggler).each(function () {
          $(this).on("click", function (e) {
            e.preventDefault();
            toggleDropDown($(this).parent());
          });
        });

        $(opt.menuToggleBtn).each(function () {
          $(this).on("click", function () {
            menuToggle();
          });
        });

        menu.on("click", function (e) {
          e.stopPropagation();
          menuToggle();
        });

        menu.find("div").on("click", function (e) {
          e.stopPropagation();
        });
      });
    };
    $(".mobile-menu-wrapper").mobilemenu();
  }


   /*===========================================
	=         Magic Cursor         =
    =============================================*/

      // Add the custom cursor element to the body
      $("body").append('<div class="magic-cursor"></div>');

      var cursor = $(".magic-cursor");

      // Update cursor position on mouse move
      $(window).on("mousemove", function (e) {
          cursor.css({
              transform: "translate(" + (e.clientX - 15) + "px," + (e.clientY - 15) + "px)",
              visibility: "inherit"
          });
      });

      // Handle hover states for links and buttons
      $("a, button, .theme-button, .scroll-top").on("mouseenter", function () {
          cursor.addClass("cursor-grow");
      });

      $("a, button, .theme-button, .scroll-top").on("mouseleave", function () {
          cursor.removeClass("cursor-grow");
      });

    // smooth scroolling

      const lenis = new Lenis();
      lenis.on('scroll', (e) => {
          // console.log(e);
      });

      function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);



  /*===========================================
	=         Popup Sidebox         =
    =============================================*/

  $("body").removeClass("open-sidebar");
  $(document).on("click", ".sidebar-trigger", function (e) {
    e.preventDefault();
    $("body").toggleClass("open-sidebar");
  });
  $(document).on("click", ".sidebar-close-btn, #sidebar-overlay", function (e) {
    e.preventDefault();
    $("body.open-sidebar").removeClass("open-sidebar");
  });

  /*
        Circle Rotate Text In JS
        ============================*/
  // const circleRotateElm = $(".circle-rotate-text");
  // if (circleRotateElm.length) {
  //   circleRotateElm.each(function () {
  //     const elm = $(this);
  //     const options = elm.data("circle-text");
  //     if (typeof options === "string") {
  //       const parsedOptions = JSON.parse(options);
  //       elm.circleType(parsedOptions);
  //     } else if (typeof options === "object") {
  //       elm.circleType(options);
  //     }
  //   });
  // }

  //==================  animation text new js

  const text = document.querySelector(".text p");
  text.innerHTML = text.innerText
    .split("")
    .map(
      (char, i) =>
        `<span style="transform:rotate(${i * 8.9}deg)">${char}</span>`
    )
    .join("");

  /*
       Slider
       ============================*/
  $(".slider-wrapper").slick({
    slidesToShow: 1,
    infinite: true,
    autoplay: false,
    draggable: true,
    arrows: false,
    slidesToScroll: 1,
    loop: true,
    dots: true,
    customPaging: function (slider, i) {
      return '<button>' +(i+1)+ '</button>';
    },
    // lazyLoad: 'progressive',
    // cssEase: 'linear',
    appendDots: $(".hero-custom-dots"),
    speed: 1500,
    vertical: true,
    rtl: false,
    prevArrow:
      "<button type='button' class='prev-btn'><i class='fa-solid fa-arrow-left-long'></i></button>",
    nextArrow:
      "<button type='button' class='next-btn'><i class='fa-solid fa-arrow-right-long'></i></button>",

    responsive: [
      {
        breakpoint: 767,
        settings: {
          autoplay: true,
        },
      },
    ],
  });






    /*===========================================
  =         Counter Up Odometer         =
  =============================================*/

  if ($('.count-number').length) {
    $('.count-number').appear(function () {
        var odo = $(this); 
        var countNumber = odo.attr("data-count");

        odo.html(countNumber);

        setTimeout(function () {
            odo.html(countNumber);
        }, 1000);
    }, {
        accY: 0
    });
}
    /*
       Jquery Tilt Js
       ============================*/
       $(".tilt-animate").tilt({
        maxTilt: 12,
        perspective: 700,
      });



          /*===========================================
	=         Marquee Active         =
    =============================================*/

      if ($(".marquee_mode").length) {
          $('.marquee_mode').marquee({
              speed: 40,
              gap: 0,
              delayBeforeStart: 0,
              direction: 'left',
              duplicated: true,
              pauseOnHover: true,
              startVisible: true,
          });
      }
  





         // service tab option ===============


    // Array of button IDs and corresponding tab IDs
    const buttonTabPairs = [
      { button: "#ajax-tab-btn-1", tab: "#ajax-tab-1" },
      { button: "#ajax-tab-btn-2", tab: "#ajax-tab-2" },
      { button: "#ajax-tab-btn-3", tab: "#ajax-tab-3" },
      { button: "#ajax-tab-btn-4", tab: "#ajax-tab-4" },
      { button: "#ajax-tab-btn-5", tab: "#ajax-tab-5" }
  ];

  buttonTabPairs.forEach(pair => {
      $(pair.button).click(function () {
          // Add 'active' class to the clicked button and corresponding tab
          $(pair.button).addClass("active");
          $(pair.tab).addClass("active");

          // Remove 'active' class from all other buttons
          buttonTabPairs.forEach(otherPair => {
              if (otherPair.button !== pair.button) {
                  $(otherPair.button).removeClass("active");
              }
          });

          // Remove 'active' class from all other tabs
          buttonTabPairs.forEach(otherPair => {
              if (otherPair.tab !== pair.tab) {
                  $(otherPair.tab).removeClass("active");
              }
          });
      });
  });



      // Progress Bar
      if ($('.progress-line').length) {
        $('.progress-line').appear(function () {
            let el = $(this);
            let percent = el.data('width');
            el.css('width', percent + '%');
        }, {
            accY: 0
        });
    }


     //Progress Counter + Text Count
     $(".count-box").appear(
      function () {
          let $t = $(this),
              n = $t.find(".count-text").attr("data-stop"),
              r = parseInt($t.find(".count-text").attr("data-speed"), 10);

          if (!$t.hasClass("counted")) {
              $t.addClass("counted");
              $({
                  countNum: $t.find(".count-text").text()
              }).animate({
                  countNum: n,
              }, {
                  duration: r,
                  easing: "linear",
                  step: function () {
                      $t.find(".count-text").text(Math.floor(this.countNum));
                  },
                  complete: function () {
                      $t.find(".count-text").text(this.countNum);
                  },
              });
          }
      }, {
          accY: 0
      }
  );

  
  


        // Pricing Card current
        if ($(".pricing-single-box").length) {
          $('.pricing-single-box').on('mouseenter', function () {
              $(this).addClass('current');
              $('.pricing-single-box').not(this).removeClass('current');
          });
      }



      // testimonial area
      $('.testi-wrapper').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        prevArrow:
        "<button type='button' class='info-card-arrow-btn prev-btn'><i class='fa-solid fa-arrow-left-long'></i></button>",
        nextArrow:
        "<button type='button' class='info-card-arrow-btn next-btn'><i class='fa-solid fa-arrow-right-long'></i></button>",
      });




         // jarallax
   if ($('.jarallax').length) {
    $('.jarallax').jarallax({
       speed: 0.2,
    });
 }


if ($('.tp_title_anim').length > 0) {
  let splitTitleLines = gsap.utils.toArray(".tp_title_anim");
  splitTitleLines.forEach(splitTextLine => {
      const tl = gsap.timeline({
        scrollTrigger: {
            trigger: splitTextLine,
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: false,
            markers: false,
            toggleActions: 'play none none none'
        }
      });

      const itemSplitted = new SplitText(splitTextLine, { type: "words, lines" });
      gsap.set(splitTextLine, { perspective: 400 });
      itemSplitted.split({ type: "lines" })
      tl.from(itemSplitted.lines, {
        duration: 1,
        delay: 0.3,
        opacity: 0,
        rotationX: -80,
        force3D: true,
        transformOrigin: "top center -50",
        stagger: 0.1
      });
  });
}
  



})(jQuery);
