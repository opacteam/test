define(function (require) {
    'use strict';

    var $ = require('jquery');
    var EventEmitter = require('EventEmitter');


    /**
     * Base class for Views.
     *
     * @class BaseView
     * @constructor
     * @param {jQuery} $element  Sets the baseView.$element property.
     * @param {Object} options   An object used to override the class's default options.
     */
    function BaseView ($element, options) {

        /**
         * An HTMLElement wrapped in jQuery that acts as the main element for this view instance.
         *
         * @property baseView.$element
         * @type {jQuery}
         */
        this.$element = $element;

        /**
         * An object containing configurable instance-specific options.
         *
         * @property baseView.options
         * @type {Object}
         */
        this.options = $.extend({}, this.constructor.defaults, options);

        /**
         * An EventEmitter instance used for triggering and listening for custom events.
         *
         * @property baseView.eventEmitter
         * @type {EventEmitter}
         */
        this.eventEmitter = new EventEmitter();

        this.init();
    }


    /**
     * An empty jQuery object. Useful for defining DOM properties in the constructor for elements that won't exist until render() is called.
     *
     * @property BaseView.$empty
     * @static
     * @type {jQuery}
     */
    BaseView.$empty = $();


    /**
     * An object containing the default options for a class, each key can be overwritten by passing in an `options` object into a View's constructor.
     *
     * @property BaseView.defaults
     * @static
     * @type {Object}
     */
    BaseView.defaults = {};


    /**
     * A precompiled handlebars template used in the render call. Attached to the prototype because it's static but needs to be accessible with `this.template`.
     *
     * @property  BaseView.prototype.template
     * @static
     * @type {Function}
     */
    BaseView.prototype.template = function () {};


    /**
     * Any initialization steps occur in this method. By default, it just calls `baseView.enable`. Is called in the constructor.
     *
     * @method baseView.init
     * @chainable
     */
    BaseView.prototype.init = function () {
        this.enable();
        return this;
    };


    /**
     * Any DOM event binding happens in this method. Meant to be overwritten, is a no-op by default.
     *
     * @method baseView.enable
     * @chainable
     */
    BaseView.prototype.enable = function () {
        return this;
    };


    /**
     * Whatever gets bound in `baseView.enable` should get unbound in `baseView.disable`. Meant to be overwritten, is a no-op by default.
     *
     * @method baseView.disable
     * @chainable
     */
    BaseView.prototype.disable = function () {
        return this;
    };


    /**
     * Pass in some data to render the view. It first cleans up the $element by calling `baseView.disable` and `$element.empty()` then re-fills the $element with the result of rendering the passed in data into the instance's template property.
     *
     * @method baseView.render
     * @param {*} data  Any data with which you'd like to render the template
     * @chainable
     */
    BaseView.prototype.render = function (data) {
        this.disable();
        this.$element.empty();
        this.$element.html(this.template(data));
        this.updateDOMProperties();
        this.enable();
        return this;
    };


    /**
     * Updates references to any DOM properties that may have been blown away by a render call. Meant to be overwritten, is a no-op by default.
     *
     * @method baseView.updateDOMProperties
     * @chainable
     * @example
     *     ViewExtension.prototype.updateDOMProperties = function () {
     *         this.$property = this.$element.find('[data-extension-role="property"]');
     *         return this;
     *     };
     */
    BaseView.prototype.updateDOMProperties = function () {
        return this;
    };


    return BaseView;
});
