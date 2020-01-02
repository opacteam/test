/**
 * Application configuration declaration.
 *
 * This configuration file is shared between the website and the build script so
 * that values don't have to be duplicated across environments. Any non-shared,
 * environment-specific configuration should placed in appropriate configuration
 * files.
 *
 * Paths to vendor libraries may be added here to provide short aliases to
 * otherwise long and arbitrary paths. If you're using bower to manage vendor
 * scripts, running `grunt inject` will automatically add paths aliases as
 * needed.
 *
 * @example
 *     paths: {
 *         'jquery': '../vendor/jquery/jquery',
 *         'jquery-cookie': '../vendor/jquery-cookie/jquery-cookie'
 *     }
 *
 * Shims provide a means of managing dependencies for non-modular, or non-AMD
 * scripts. For example, jQuery UI depends on jQuery, but it assumes jQuery is
 * available globally. Because RequireJS loads scripts asynchronously, jQuery
 * may or may not be available which will cause a runtime error. Shims solve
 * this problem.
 *
 * @example
 *     shim: {
 *         'jquery-cookie': {
 *             deps: ['jquery'],
 *             exports: null
 *          }
 *     }
 */
require.config({
    paths: {
        // this empty string tells r.js to use single quotes when injecting
        // bower modules automatically. Otherwise it defaults to double quotes.
        requirejs: '../vendor/requirejs/require',
        jquery: 'polyfills/cmsJquery',
        'static-jquery': '../vendor/jquery/dist/jquery',
        velocity: '../vendor/velocity/velocity',
        'velocity.ui': '../vendor/velocity/velocity.ui',
        picturefill: '../vendor/picturefill/dist/picturefill',
        EventEmitter: '../vendor/EventEmitter.js/EventEmitter',
        jsondiffpatch: '../vendor/jsondiffpatch/public/build/jsondiffpatch',
        Waypoints: '../../node_modules/waypoints/src/waypoint'
    },

    shim: {
        'static-jquery': {
            exports: '$'
        },
        velocity: {
            deps: [
                'jquery'
            ]
        }
    },

    waitSeconds: 120,
    packages: [

    ]
});