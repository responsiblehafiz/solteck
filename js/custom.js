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
})(jQuery);
