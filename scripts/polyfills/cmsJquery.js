/**
 * Created by arichards on 11/9/15.
 */

// CMS fix. Checks to see if jQuery is already present in window. If it is we will utilize
// that instead of loading jQuery from config.js. This prevents issues with 3rd party
// plugins attempting to load secondary versions or failing because one cannot be found.

define(function (require) {
    'use strict';

    if (typeof window.jQuery === 'function') {
        return window.jQuery;
    }
    return require('static-jquery');
});

