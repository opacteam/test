/**
 * @fileOverview
 * Picturefill Runner
 */

define(function (require) {
    'use strict';


    /**
     * Picturefill view.
     *
     * @class PicturefillView
     * @constructor
     */
    function PicturefillView () {

        this.init();

    }

    PicturefillView.prototype.init = function () {
        this.enable();
    };

    PicturefillView.prototype.enable = function () {
        picturefill();
    };


    return PicturefillView;
});
