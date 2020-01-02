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

        console.log("archive.js")
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
        console.log("archives script init fired");

        (function () {
          $(".radio-label").on("click", function (e) {
              var month = $("#" + e.currentTarget.control.id)[0];
            if ($(month).is(":checked")) {
              e.preventDefault();
              $('[name=month]#deselected').prop('checked', true);
            }
          });
        })();

        // Stuff in BG

        (function () {
          var i = 0;
          while (i < 1) {
            var topmin = 50;
            var topmax = 100;
            var leftmin = -10;
            var leftmax = 10;
            var top;
            var left;
            var randomstyle = "";
            var randomplacement = function () {
              top = Math.random() * (topmax - topmin) + topmin;
              left = Math.random() * (leftmax - leftmin) + leftmin;
              randomstyle = 'left:' + left + '%; top: ' + top + '%;';
            }
            var array = ['magenta-dot', 'lime-planet', 'lime-ring-small', 'teal-dot', 'teal-ring'];
            array.forEach(function (e) {
              randomplacement();
              $('.space-container').prepend('<div class="main-space ' + e + '" style="' + randomstyle + '"></div>');
            })
            i++;
          }
        })();

        (function () {
          var i = 0;
          while (i < 1) {
            var topmin = 0;
            var topmax = 100;
            var leftmin = 85;
            var leftmax = 110;
            var top;
            var left;
            var randomstyle = "";
            var randomplacement = function () {
              top = Math.random() * (topmax - topmin) + topmin;
              left = Math.random() * (leftmax - leftmin) + leftmin;
              randomstyle = 'left:' + left + '%; top: ' + top + '%;';
            }
            var array = ['lime-planet', 'lime-ring-large', 'teal-planet', 'teal-ring'];
            array.forEach(function (e) {
              randomplacement();
              $('.space-container').prepend('<div class="main-space ' + e + '" style="' + randomstyle + '"></div>');
            })
            i++;
          }
        })();


      },
      finalize: function () {
        // JavaScript to be fired on all pages, after page specific JS is fired


        $(window).on('load', function(){
          var years = "";
          i = 1;
          $("#post-dates .post-year").each(function () {
            var year = ($(this).attr("years"));
            if (i < $("#post-dates .post-year").length) {
              var yearhtml = '<span class="checkbox"><input class="year-radio" name="year" type="radio" id="' + year + '"><label for="' + year + '" data-text="' + year + '/" >' + year + "/</label></span>";
            } else {
              var yearhtml = '<span class="checkbox"><input class="year-radio" name="year" type="radio" id="' + year + '" checked><label for="' + year + '" data-text="' + year + '" >' + year + "</label></span>";
            }
            years = years.concat(yearhtml)
            i = i + 1;
          })
          $("#year-radio-container").html(years);
          getMonths();

          $('.year-radio').on('change', function () {
            console.log("month radio on change");
            getYear();
            getMonth();
            getMonths();
            getSort();
            updateFilters();
          });
        })


        var getMonths = function (){
          var selectedYear = $(".year-radio:checked").attr("id");
          console.log(selectedYear);
          $("#post-dates .post-month").each(function () {
            if ($(this).attr("year") == selectedYear) {
              var month = ($(this).attr("month"));
              month = "#" + month;
              $(".month").removeClass("visible");
              $(month).addClass("visible");
            };
          });
        }




        var post_month;
        var month_div;
        var post_year;
        var sort_by;
        var page_number;

        var getMonth = function () {
          post_month = $('.month-radio:checked').attr('id');
          month_div = '#' + post_month + '-posts';
          post_month = $('.month-radio:checked').attr('int');
          console.log(post_month);
        };

        var getYear = function () {
          post_year = $('.year-radio:checked').attr('id');
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
          formData.month = post_month;
          formData.year = post_year;
          formData.meta_key = sort_by;
          formData.paged = page_number;

          $.ajax({
            method: 'POST',
            url: ajaxurl,
            data: formData,
            beforeSend: function () {
              $(month_div).addClass('loading');
            },
            success: function (data) {
              $(month_div).removeClass('loading');
              $(month_div).html(data);
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

        

        $('.month-radio').on('change', function () {
          getMonth();
          getYear();
          getSort();
          updateFilters();
        });

        

        $('.sort').on('change', function () {
          getSort();
          getCats();
          updateFilters();
        });

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

})(window.jQuery, window.Clique); // Fully reference jQuery after this point.
