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

        (function () {
          var topmin = 0;
          var topmax = 90;
          var leftmin = 0;
          var leftmax = 5;
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

        $('.featured-article-card .txt h2').each(function () {
          $(this).truncate(7);
        });

        $('.featured-article-card .txt .body').each(function () {
          $(this).truncate(2);
        });

        $('.latest-articles-card .txt h3').each(function () {
          $(this).truncate(4);
        });

        $('.latest-articles-card .txt .body').each(function () {
          $(this).truncate(2);
        });
        //carly code end

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

        
      },
      finalize: function () {
        // JavaScript to be fired on all pages, after page specific JS is fired

        $("#search-input").val(searchvar);

        var search_filter;
        var sort_by;
        var page_number;

        var getSea = function () {
          search_filter = $('#search-input').val();
        };

        var getSort = function () {
          var sort;
          sort = $('.sort:checked').attr('id');
          if (sort == 'most-viewed') {
            sort_by = 'views';
          } else if (sort == 'most-recent') {
            sort_by = '';
          }
        };

        var updateFilters = function () {
          var formData = {};
          formData.action = "ACTION_NAME";
          formData.search_word = search_filter;
          formData.category_name = "";
          formData.meta_key = sort_by;
          formData.paged = page_number;

          $.ajax({
            method: 'POST',
            url: ajaxurl,
            data: formData,
            beforeSend: function () {
              $('#test').addClass('loading');
            },
            success: function (data) {
              $('#test').removeClass('loading');
              $('#test').html(data);
              $('.latest-articles-card .txt h3').each(function () {
                $(this).truncate(4);
              });
              $('.latest-articles-card .txt .body').each(function () {
                $(this).truncate(2);
              });
              $('.page-numbers').on('click', function (e) {
                page_number = $(e.target).attr('href').match(/([0-9]+)/g)[0];
                updateFilters();
              })
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
            }
          });
        };

        $('#search-form').on('submit', function(e) {
          e.preventDefault();
          getSea();
          getSort();
          updateFilters();
        });

        $('.sort').on('change', function () {
          getSea();
          getCats();
          updateFilters();
        });

        if (!searchvar.length == 0) {
          search_filter = searchvar;
          getSort();
          updateFilters();
        };
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
      document.body.className.replace(/-/g, '_').split(/\s+/),
        function (i, classnm) {
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
