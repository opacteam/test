/**
 * @fileOverview
 * Accordion Event Handling
 */

define(function (require) {
    'use strict';


    /**
     * Accordion event handling.
     *
     * @class AccordionView
     * @constructor
     */
    function AccordionView ($accordion) {

        this.$accordion = $accordion;

        this.$controls = $accordion.find('[data-accordion-role="control"]');

        this.$expanders = $accordion.find('[data-accordion-role="expander"]')

        this.handleControlClick = this.handleControlClick.bind(this);

        this.init();

    }

    AccordionView.prototype.init = function () {
        this.enable();
    };

    AccordionView.prototype.enable = function () {
        this.$controls.on('click', this.handleControlClick);
    };

    AccordionView.prototype.handleControlClick = function (e) {
        e.preventDefault();
        var $control = $(e.currentTarget);
        var $expander = $control.parents('[data-accordion-role="expander"]');
        
        if ($expander.hasClass('isActive')) {
            // If active expander is triggered, close it:
            $control.removeClass('isActive');
            $expander.removeClass('isActive');
        } else {
            // If inactive expander is triggered,
            // close any open expanders then open the activated expander:
            this.$controls.removeClass('isActive');
            this.$expanders.removeClass('isActive');
            $control.addClass('isActive');
            $expander.addClass('isActive');
        }
        
    };


    return AccordionView;
});
