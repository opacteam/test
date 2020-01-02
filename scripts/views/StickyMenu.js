/**
 * @fileOverview
 * Sticky navbar style change
 */

define(function(require) {
  "use strict";

  /**
   * Sticky navbar style change.
   *
   * @class StickyMenu
   * @constructor
   * @param jQuery() element
   */

  function StickyMenu($menu) {
    // VARS
    // for now grouped in object in global scope.
    // possible todo: bind 'em and add polyfill https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill
    // like this: element.addEventListener('click', toggleMenu.bind(null, param1, param2), false);
    window.AdlerStickyMenu = {};
    window.AdlerStickyMenu.element = $menu;
    window.AdlerStickyMenu.ticking = false;
    window.AdlerStickyMenu.latestKnownScrollY = 0;

    // performance approach based on https://www.html5rocks.com/en/tutorials/speed/animations/
    window.AdlerStickyMenu.onScroll = function() {
      window.AdlerStickyMenu.latestKnownScrollY = window.scrollY;
      window.AdlerStickyMenu.requestTick();
    };

    window.AdlerStickyMenu.requestTick = function() {
      if (!window.AdlerStickyMenuTicking) {
        requestAnimationFrame(window.AdlerStickyMenu.update);
      }
      window.AdlerStickyMenu.ticking = true;
    };

    window.AdlerStickyMenu.update = function() {
      if (window.AdlerStickyMenu.latestKnownScrollY > 24) {
        window.AdlerStickyMenu.element.addClass("adler-sticky-menu");
      } else {
        window.AdlerStickyMenu.element.removeClass("adler-sticky-menu");
      }

      // reset the tick so we can capture the next onScroll
      window.AdlerStickyMenu.ticking = false;
    };

    // EVENTS
    // scroll
    window.addEventListener("scroll", window.AdlerStickyMenu.onScroll, false);
    // initial page load in case refreshing already scrolled page
    window.AdlerStickyMenu.onScroll();
  }

  return StickyMenu;
});
