/**
 * @fileOverview
 * Search Collection Query
 */

define(function (require) {
    'use strict';
    // var $ = require('jquery');



    /**
     * Search Collection Query
     *
     * @class SearchCollectionsView
     * @constructor
     */
    function SearchCollectionsView ($element) {

        this.$element = $element;

        this.$searchSubmit = $element.find('.js-search-btn');

        this.init();

    }

    SearchCollectionsView.prototype.init = function () {
        this.enable();
    };

    SearchCollectionsView.prototype.enable = function () {
        this.$searchSubmit.on('click', this.querySearchTerm);
    };

    SearchCollectionsView.prototype.querySearchTerm = function(e) {
        // original js sent by client as a reference
        // var variable = document.getElementById("searchTxt").value
        // window.location="http://dev.adler.minisisinc.com?" + variable;

        var searchTerm = document.getElementById('searchCollectionInput').value;
        console.log(searchTerm);

        window.location = "http://dev.adler.minisisinc.com?" + searchTerm;
    };

    return SearchCollectionsView;
});
