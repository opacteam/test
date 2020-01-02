/**
 * @fileOverview
 * Search Form Toggling
 */

define(function (require) {
    'use strict';


    /**
     * Search form toggling.
     *
     * @class SearchView
     * @constructor
     */
    function SearchView ($search, $searchToggle) {

        this.$search = $search;

        this.$toggle = $searchToggle;
        
        this.$searchInput = $search.find('.js-searchInput');
        
        this.handleToggleClick = this.handleToggleClick.bind(this);
        
        this.init();

    }

    SearchView.prototype.init = function () {
        this.enable();
    };

    SearchView.prototype.enable = function () {
        this.$toggle.on('click', this.handleToggleClick);
    };

    SearchView.prototype.handleToggleClick = function (e) {
        e.preventDefault();
        this.$search.toggleClass('isActive');
        this.$searchInput.delay(800).focus();
    };

    return SearchView;
});
