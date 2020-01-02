/**
 * @fileOverview
 * Mobile nav Menu Event Handling
 */

define(function (require) {
    'use strict';


    /**
     * Mobile nav menu event handling.
     *
     * @class MobileMenuView
     * @constructor
     */
    function MobileMenuView ($menu, $menuToggle) {

        this.$menu = $menu;

        this.$togglers = $menuToggle;

        this.$expanders = $menu.find('[data-mobile-menu-role="expander"]');

        this.$expanderLists = $menu.find('[data-mobile-menu-role="expander-list"]')

        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleExpanderClick = this.handleExpanderClick.bind(this);

        this.init();

    }

    MobileMenuView.prototype.init = function () {
        this.enable();
    };

    MobileMenuView.prototype.enable = function () {
        this.$togglers.on('click', this.handleToggleClick);
        this.$expanders.on('click', this.handleExpanderClick);
        this.$menu.on('click', this.handleMenuClick);
    };

    MobileMenuView.prototype.handleToggleClick = function (e) {
        e.preventDefault();
        this.$menu.toggleClass('isActive');
    };

    MobileMenuView.prototype.handleMenuClick = function (e) {
        if ($(e.target).is(this.$menu)) {
            e.preventDefault();
            this.$menu.toggleClass('isActive');
        }
    };

    MobileMenuView.prototype.handleExpanderClick = function (e) {
        if ($(e.target).parent().attr('data-mobile-menu-role') === 'expander') {
            e.preventDefault();
            var $expander = $(e.currentTarget);
            var $expanderList = $expander.find(this.$expanderLists);
            
            if ($expander.hasClass('isActive')) {
                // If active expander is clicked, close it:
                $expander.removeClass('isActive');
                $expanderList.removeClass('isActive');
            } else {
                // If inactive expander is clicked,
                // close any open expanders then open the clicked expander:
                this.$expanders.removeClass('isActive');
                this.$expanderLists.removeClass('isActive');
                $expander.addClass('isActive');
                $expanderList.addClass('isActive');
            }
        }
    };


    return MobileMenuView;
});
