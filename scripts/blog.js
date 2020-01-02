/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function ($, _c, undefined) {
  'use strict';

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.

  var Sage = {
    // All pages
    'common': {
      init: function () {

        // JavaScript to be fired on all pages

        $('.hamburger').on('click', function () {
          $(this).toggleClass('is-active');
          if ($(this).hasClass('is-active')) {
            $('.topnav').slideDown(500);
          } else {
            $('.topnav').slideUp(500);
          }
        });
        $(window).resize(function () {
          $('.topnav').attr('style', '');
          $('.hamburger').removeClass('is-active');
        });

        // Scroll To
        (function () {
          $('.scrollto').on('click', function (e) {
            e.preventDefault();
            var section = $(this).attr('href');
            $('html, body').animate({
              scrollTop: $(section).offset().top
            }, 1000);
          });
        })();

        // // Form
        // (function () {
        //   $('select').selectric();
        // })();


        // Create Random Elements

        //Stars in NAV

        (function () {
          var i = 0;
          while (i < 15) {
            var scale = Math.random() * (1 - 0.5) + 0.5;
            var top = Math.random() * 80;
            var left = Math.random() * (97 - 1) + 1;
            $('.star-container').prepend('<div class="nav-star" style="left:' + left + '%; top:' + top + '%;transform:scale(' + scale + ');" ></div>');
            i++;
          }
        })();

        //carly code start
        $.fn.truncate = function (lines, readmore) {
          lines = typeof lines !== 'undefined' ? lines : 1;
          readmore = typeof readmore !== 'undefined' ? readmore : '.readmore';
          var lineHeight = 26;
          if (this.attr('title')) {
            this.text(this.attr('title'));
          }
          if (!this.attr('data-link') && this.find('a' + readmore).length > 0) {
            this.attr('data-link', this.find('a' + readmore)[0].outerHTML);
          }
          var link = this.attr('data-link');
          if (this.height() > lines * lineHeight) {
            if (!this.attr("title")) {
              this.attr("title", this.html());
            }
            var words = this.attr("title").split(" ");
            var str = "";
            var prevstr = "";
            this.text("");
            for (var i = 0; i < words.length; i++) {
              if (this.height() > lines * lineHeight) {
                this.html(prevstr.trim() + "&hellip; " + (typeof link !== 'undefined' ? ' ' + link : ''));
                break;
              }
              prevstr = str;
              str += words[i] + " ";
              this.html(str.trim() + "&hellip;" + (typeof link !== 'undefined' ? ' ' + link : ''));
            }
            if (this.height() > lines * lineHeight) {
              this.html(prevstr.trim() + "&hellip; " + (typeof link !== 'undefined' ? ' ' + link : ''));
            }
          }
          return this;
        };
        $("[rel=tag]").each(function(){
          var tag = $(this).html();
          $(this).attr("href", "https://www.adlerplanetarium.org/blog/search/?searchvar=" + tag);
        });
        //carly code end
        $('.featured-article-card .txt h2').each(function () {
          $(this).truncate(4);
        });

        $('.featured-article-card .txt .body').each(function () {
          if ($(window).width() >= 1024) {
            $(this).truncate(5);
            $(this).addClass('visible');
          } else {
            $(this).truncate(4);
            $(this).addClass('visible');
          }
        });

        $('.latest-articles-card .txt h3').each(function () {
          $(this).truncate(3);
        });

        $('.latest-articles-card .txt .body').each(function () {
          if ($(window).width() >= 1024) {
            $(this).truncate(4);
            $(this).addClass('visible');
          } else {
            $(this).truncate(3);
            $(this).addClass('visible');
          }
        });

        //Waypoints
        if ($('.reveal').length > 0) {
          $('.reveal').each(function (e) {
            var reveal = $(this);
            var waypoint_reveal = new Waypoint({
              element: reveal[0],
              handler: function (direction) {
                if (direction === 'down') {
                  reveal.addClass('on');
                }
              },
              offset: '95%'
            });
          });
        }

        //parallax 
        $(window).scroll(function () {
          var scrollTop = $(window).scrollTop();
          var imgPos = scrollTop / 6 + 'px';
          $('.space-container').css('transform', 'translateY(' + imgPos + ')');
        });

        // Stuff in BG

        (function () {
          var topmin = 0;
          var topmax = 3;
          var leftmin = 0;
          var leftmax = 15;
          var top;
          var left;
          var randomstyle = "";
          var randomplacement = function () {
            top = Math.random() * (topmax - topmin) + topmin;
            left = Math.random() * (leftmax - leftmin) + leftmin;
            randomstyle = 'left:' + left + '%; top: ' + top + '%;';
          }
          var array = ['magenta-dot', 'lime-planet', 'teal-dot', 'teal-planet'];
          array.forEach(function (e) {
            randomplacement();
            $('.space-container').prepend('<div class="main-space ' + e + '" style="' + randomstyle + '"></div>');
          })
        })();

        (function () {
          var i = 0;
          while (i < 3) {
            var topmin = 10;
            var topmax = 90;
            var leftmin = 0;
            var leftmax = 75;
            var top;
            var left;
            var randomstyle = "";
            var randomplacement = function () {
              top = Math.random() * (topmax - topmin) + topmin;
              left = Math.random() * (leftmax - leftmin) + leftmin;
              randomstyle = 'left:' + left + '%; top: ' + top + '%;';
            }
            var array = ['magenta-dot', 'lime-planet', 'lime-ring-small', 'lime-ring-large', 'teal-dot', 'teal-planet', 'teal-ring'];
            array.forEach(function(e){
              randomplacement();
              $('.space-container').prepend('<div class="main-space ' + e + '" style="' + randomstyle + '"></div>');
            })
            i++;
          }
        })();
      },
      finalize: function () {
        // JavaScript to be fired on all pages, after page specific JS is fired
        var sticky = new Waypoint.Sticky({
          element: $('#sticky')[0],
          wrapper: false,
          offset: 25,
        });

        $("[rel=tag]").each(function(){
          var tag = $(this).html();
          $(this).attr("href", "https://www.adlerplanetarium.org/blog/search/?searchvar=" + tag);
        })

        var waypoint = new Waypoint({
          element: $('.latest-articles-container')[0],
          handler: function (direction) {
            if (direction == "down") {
              $('#sticky').css({
                position: "absolute",
                bottom: "0",
                top: "auto"
              });
            }
            if (direction == "up") {
              $('#sticky').css({
                position: "",
                bottom: "",
                top: ""
              });
            }
          },
          offset: function () {
            return (-this.element.clientHeight + $('#sticky').height() + 125);
          }
        });

        $(window).on("load resize", function () {
          $('.featured-article-card .txt h2').each(function () {
            $(this).truncate(4);
          });

          $('.featured-article-card .txt .body').each(function () {
            if ($(window).width() >= 1024) {
              $(this).truncate(5);
              $(this).addClass('visible');
            } else {
              $(this).truncate(4);
              $(this).addClass('visible');
            }
          });

          $('.latest-articles-card .txt h3').each(function () {
            $(this).truncate(3);
          });

          $('.latest-articles-card .txt .body').each(function () {
            if ($(window).width() >= 1024) {
              $(this).truncate(4);
              $(this).addClass('visible');
            } else {
              $(this).truncate(3);
              $(this).addClass('visible');
            }
          });
        })
      }
    },
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function (func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = funcname === undefined ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function () {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      };

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);
  var classnm = document.body.className.replace(/-/g, '_').split(/\s+/);
  // $(document).ready(UTIL.fire(classnm[1]));
  // $(document).ready(UTIL.fire(classnm[1], 'finalize'));
  
})(window.jQuery, window.Clique); // Fully reference jQuery after this point.
