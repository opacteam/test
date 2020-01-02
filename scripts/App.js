define(function(require, exports, module) {
  // jshint ignore:line
  "use strict";

  var $ = jQuery; // require('jquery');
  var picturefill = require("picturefill");
  var MobileMenuView = require("views/MobileMenuView");
  var StickyMenu = require("views/StickyMenu");
  var PicturefillView = require("views/PicturefillView");
  var AccordionView = require("views/AccordionView");
  var SearchView = require("views/SearchView");
  var CarouselView = require("views/CarouselView");
  var SearchCollectionsView = require("views/SearchCollectionsView");
  var bsn = require("bootstrap/bootstrap.native.dropdown.min");
  /**
   * Initial application setup. Runs once upon every page load.
   *
   * @class App
   * @constructor
   */
  var App = function() {
    this.init();
  };

  var proto = App.prototype;

  /**
   * Initializes the application and kicks off loading of prerequisites.
   *
   * @method init
   * @private
   */
  proto.init = function() {
    // Create your views here

    this.mobileMenuView = new MobileMenuView(
      $(".js-navMobile"),
      $(".js-navToggle")
    );

    this.StickyMenu = new StickyMenu($("#refresh-header"));

    this.PicturefillView = new PicturefillView();

    this.AccordionView = new AccordionView($("body"));

    this.SearchView = new SearchView($(".js-search"), $(".js-searchToggle"));

    this.CarouselView = new CarouselView($(".js-carousel"));

    this.SearchCollectionsView = new SearchCollectionsView(
      $(".js-search-collections")
    );
  };

  return App;
});
