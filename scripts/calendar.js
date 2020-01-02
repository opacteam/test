(function (factory) {
    'use strict';

    if (document.getElementById('calendar')) {
        factory(window.jQuery, document.getElementById('calendar'));
    }

})(function ($, element) {
    'use strict';

    // globals
    var moment = window.moment;

    // vars
    var today = moment().format('YYYY-MM-DD');

    // functions
    function isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            return true;
        }
        return false;
    }

    function onCategoryClick(e) {
        // vars
        var $button = $(e.target);
        var $siblings = $button.siblings();
        var category = $button.text();

        // guards
        if ($button.hasClass('active')) {
            return;
        }

        // update ui
        $siblings.removeClass('active');
        $button.addClass('active');
        $('.calendar-item').not('.' + category).slideUp();
        $('.calendar-item.' + category).slideDown();
    }

    function onEverythingClick(e) {
        var $button = $(e.target);
        var $siblings = $button.siblings();

        // guards
        if ($button.hasClass('active')) {
            return;
        }
        $siblings.removeClass('active');
        $button.addClass('active');
        $('.calendar-item').slideDown();
    }

    function renderDayView(event) {
        var eventendtext = "";
        var displayDates = [event.start.format('MM.DD.YY')];
        var displayImage = (event.image) ? event.image : 'http://placehold.it/350x150';
        if (event.end) {
            displayDates.push(event.end.format('MM.DD.YY'));
            eventendtext = ' data-end-date="' + event.end.format('YYYY-MM-DD') + '"';
        }
        var startTimes = "";
        var parsedHour = 0;
        var parsedMinute = 0;
        var parsedAmPm = "am";
        var split;
        var startMoment;
        var now = moment();
        if (event.allDay != true) {
            for (var i = 0; i < event.startTimesArray.length; i++) {
                if (event.startTimesArray[i] !== null && event.startTimesArray[i] != "") {
                    split = event.startTimesArray[i].match(/([0-9]+):([0-9]{2})[\s]?([ap]m)/);
                    if (split) {
                        var parsedHour = parseInt(split[1]);
                        var parsedMinute = parseInt(split[2]);
                        if ((split[3] === "pm") && (parsedHour != 12)) {
                            parsedHour += 12;
                        }
                        if (parsedHour == 24) {
                            parsedHour = 0;
                        }
                    } else {
                        var parsedHour = 0;
                        var parsedMinute = 0;
                    }
                    var tmpMoment = moment(event.start);
                    var datetime = tmpMoment.format('YYYY-MM-DD') + " " + String('00' + parsedHour).slice(-2) + ":" + String('00' + parsedMinute).slice(-2);
                    if (tmpMoment.isDST()) {
                        datetime += "-6";
                    } else {
                        datetime += "-5";
                    }
                    startMoment = moment(datetime).tz('America/Chicago');
                    if ((event.onSale[i] == "" || moment(event.onSale[i], 'X').isBefore(now)) && startMoment.isAfter(now) && (parseInt(event.ticketsAvailable[i]) > 0 || event.ticketsAvailable[i] == "")) {
                        startTimes += '<span class="time">' + event.startTimesArray[i] + '</span>';
                    } else {
                        startTimes += '<span class="time"><strike>' + event.startTimesArray[i] + '</strike></span>';
                    }
                }
            }
        }

        return [
            '<div class="calendar-item ' + event.category + '" data-start-date="' + event.start.format('YYYY-MM-DD') + '"' + eventendtext + '>',
            '<div class="calendar-item-row">',
            '<figure class="calendar-item-figure">',
            '<img src="' + displayImage + '">',
            '</figure>',
            '<div class="calendar-item-body">',
            '<span class="calendar-item-category calendar-item-category-' + event.category + '">' + event.category + '</span>',
            '<h2 class="calendar-item-title"><a href="' + event.permalink + '">' + $('<textarea />').html(event.title).text() + '</a></h2>',
            '<time class="calendar-item-date">' + displayDates.join(' - ') + '</time>',
            startTimes ? '<p class="times">' + startTimes + '</p>' : '',
            '<p class="calendar-item-description">' + event.listDescription + '</p>',
            event.isLimited ? '<p class="calendar-item-alert">Limited tickets available. Buy yours now!</p>' : '',
            '<a class="permalink" href="' + event.permalink + '">&rarr;</a>',
            '</div>',
            '</div>',
            '</div>',
        ].join('');
    }

    function renderWeekView(event) {
        var startTimes = "";
        var anyTickets = false;
        var startTimes = "";
        var parsedHour = 0;
        var parsedMinute = 0;
        var parsedAmPm = "am";
        var split;
        var startMoment;
        var now = moment();
        if (event.allDay != true) {
            for (var i = 0; i < event.startTimesArray.length; i++) {
                if (event.startTimesArray[i] !== null && event.startTimesArray[i] != "") {
                    split = event.startTimesArray[i].match(/([0-9]+):([0-9]{2})[\s]?([ap]m)/);
                    if (split) {
                        var parsedHour = parseInt(split[1]);
                        var parsedMinute = parseInt(split[2]);
                        if ((split[3] === "pm") && (parsedHour != 12)) {
                            parsedHour += 12;
                        }
                        if (parsedHour == 24) {
                            parsedHour = 0;
                        }
                    }
                } else {
                    var parsedHour = 0;
                    var parsedMinute = 0;
                }
                var tmpMoment = moment(event.start);
                var datetime = tmpMoment.format('YYYY-MM-DD') + " " + String('00' + parsedHour).slice(-2) + ":" + String('00' + parsedMinute).slice(-2);
                if (tmpMoment.isDST()) {
                    datetime += "-6";
                } else {
                    datetime += "-5";
                }
                startMoment = moment(datetime).tz('America/Chicago');

                if (startMoment.isAfter(now)) {
                    if (moment(event.onSale[i], 'X').isBefore(now)) {
                        if (event.ticketsAvailable[i] > 0) {
                            startTimes += '<span class="time">' + event.startTimesArray[i] + '</span>';
                        } else {
                            startTimes += '<span class="time"><strike>' + event.startTimesArray[i] + '</strike></span>';
                        }
                    } else {
                        startTimes += '<span class="time">' + event.startTimesArray[i] + '</span>';
                    }
                } else {
                    startTimes += '<span class="time"><strike>' + event.startTimesArray[i] + '</strike></span>';
                }

                if ((parseInt(event.ticketsAvailable[i]) > 0 || event.ticketsAvailable[i] == "") && startMoment.isAfter(now)) {
                    anyTickets = true;
                }
            }
        }

        return [
            '<div class="calendar-item week-view calendar-item-category-' + event.category + ' ' + event.category + '"" data-times="">',
            '<h2 class="calendar-item-title"><a target="_blank" href="' + event.permalink + '">' + $('<textarea />').html(event.title).text() + '</a></h2>',
            (event.startTimes !== "") ? '<p class="times">' + startTimes + '</p>' : '',
            event.alert ? '<p class="alerts">' + event.alert + '</p>' : '',
            '<div class="tooltip">',
            '<a href="#" class="close">✕</a>',
            '<h2><a href="' + event.permalink + '">' + $('<textarea />').html(event.title).text() + '</a></h2>',
            '<p><span class="calendar-item-category calendar-item-category-' + event.category + '">' + event.category + '</span>',
            (event.startTimes !== "") ? '<span class="times">' + startTimes + '</span>' : '',
            '<p class="calendar-item-description">' + event.listDescription + '</p>',
            event.isLimited ? '<p class="calendar-item-alert">Limited tickets available. Buy yours now!</p>' : '',
            anyTickets && !event.nonTicketed ? '<div class="button-row"><a target="_blank" href="' + ((event.ticketsLink != "") ? event.ticketsLink : 'https://tickets.adlerplanetarium.org/WebStore/shop/ViewItems.aspx?CG=PGA&C=AAP') + '" class="button">' + event.ctaText + '</a></div>' : '',
            !anyTickets && !event.nonTicketed ? '<span class="button">Sold Out</span>' : '',
            '<div class="tooltip-point"></div>',
            '</div>',
            '</div>',
        ].join('');
    }

    // render calendar
    $(element).fullCalendar({
        customButtons: {
            cat0: {
                text: 'everything',
                click: onEverythingClick,
            },
            cat1: {
                text: 'shows',
                click: onCategoryClick,
            },
            cat2: {
                text: 'events',
                click: onCategoryClick,
            },
            cat3: {
                text: 'experiences',
                click: onCategoryClick,
            },
            cat4: {
                text: 'exhibits',
                click: onCategoryClick,
            }
        },
        header: {
            left: 'cat0 cat1 cat2 cat3 cat4',
            center: 'prev,title,next,today',
            right: 'listWeek,basicWeek,month',
        },
        views: {
            listWeek: {buttonText: 'list', titleFormat: '', eventLimit: 10},
            basicWeek: {
                titleFormat: 'MMMM D, YYYY'
            },
            month: {
                titleFormat: 'MMMM YYYY'
            },
        },
        columnFormat: 'dddd',
        defaultView: 'listWeek',
        displayEventTime: true,
        noEventsMessage: 'No events to display for this date.',
        lazyFetching: true,
        eventSources: [
            {
                url: ajax_object.ajax_url,
                method: 'POST',
                data: {action: 'load_events'},
                error: function (jsXHR, error, textStatus) {
                    console.log("Error loading events: " + textStatus);
                }
            }
        ],
        eventRender: function (event, ele, view) {
            var html;
            switch (view.name) {
                case 'listWeek' :
                    html = renderDayView(event);
                    break;
                case 'basicWeek' :
                case 'month' :
                    html = renderWeekView(event);
                    break;
            }

            if (html) {
                ele.html(html);
            }
        },
        viewRender: function (view, element) {
            if (!$('.fc-view .spinner').length) {
                $('.fc-view').prepend('<div class="spinner"><img src="/wp-content/themes/adler/assets/media/images/ajax-loader.gif" /></div>');
            }

            $('.fc-view .spinner').show();

            $('.fc-center > div:first-child').addClass('fc-nav');
            if (view.name === 'listWeek') {
                var currentDate = $('#calendar').fullCalendar('getDate').startOf('week');
                var endWeek = $('#calendar').fullCalendar('getDate').endOf('week');
                var createNewDate = "";
                var parsedDate;
                var alreadySelected = false;

                var weekHtml = "<div class='week'>";
                for (var i = 0; i < 7; i++) {
                    createNewDate = currentDate.format('YYYY-MM-DD');
                    //createNewDate = currentDate.getFullYear()+"-"+(parseInt(currentDate.getMonth()) + 1)+"-"+currentDate.getDate();
                    parsedDate = $.fullCalendar.moment(createNewDate).add(i, 'days');
                    weekHtml += '<div class="day';
                    if (currentDate.isSameOrBefore($.fullCalendar.moment().startOf('day')) && endWeek.isSameOrAfter($.fullCalendar.moment().startOf('day'))) {
                        if (parsedDate.isSame($.fullCalendar.moment().startOf('day'), 'day')) {
                            weekHtml += ' selected';
                        }
                    } else {
                        if (i === 0) {
                            weekHtml += ' selected';
                        }
                    }
                    if (parsedDate.isBefore($.fullCalendar.moment().startOf('day').subtract(1, 'days'))) {
                        weekHtml += ' past';
                    }
                    weekHtml += '" data-date="' + parsedDate.format('YYYY-MM-DD') + '"><span class="day-header">';
                    if (parsedDate.format('YYYY-MM-DD') === $.fullCalendar.moment().format('YYYY-MM-DD')) {
                        weekHtml += "Today";
                    } else if (parsedDate.format('YYYY-MM-DD') === $.fullCalendar.moment().add(1, 'days').format('YYYY-MM-DD')) {
                        weekHtml += "Tomorrow";
                    } else {
                        weekHtml += parsedDate.format('dddd');
                    }
                    weekHtml += "</span><span class='month'>";
                    weekHtml += parsedDate.format('MMM');
                    weekHtml += '</span>';
                    weekHtml += "<span class='date'>";
                    weekHtml += parsedDate.format('D');
                    weekHtml += '</span></div>';
                }
                weekHtml += "</div>";
                if ($('.week').length > 0) {
                    $('.week').remove();
                }
                $('.fc-center').append(weekHtml);
                $('.week .day').on('click', function () {
                    var date = $(this).data('date');
                    if ($('.fc-list-table .fc-list-heading[data-date="' + date + '"]').length > 0) {
                        $('body, html').animate({
                            scrollTop: $('.fc-list-table .fc-list-heading[data-date="' + date + '"]').offset().top
                        }, 300);
                    }
                });
            } else {
                if (view.name === 'basicWeek') {
                    var currentDate = $('#calendar').fullCalendar('getDate').startOf('week');
                    var endWeek = $('#calendar').fullCalendar('getDate').endOf('week');
                    if (currentDate.isSameOrBefore($.fullCalendar.moment().startOf('day')) && endWeek.isSameOrAfter($.fullCalendar.moment().startOf('day'))) {
                        $('.fc .fc-day-header[data-date="' + $.fullCalendar.moment().format('YYYY-MM-DD') + '"]').addClass('today');
                    }
                }
                if ($('.fc-nav').not(':visible').length > 0) {
                    $('.fc-nav').slideDown();
                }
                if ($('.week').is(':visible')) {
                    $('.week').slideUp();
                }

                $('.fc-day-header span').each(function () {
                    var content = $(this).text();
                    var shortName = content.slice(0, 3);
                    var shortestName = content[0];
                    $(this).before('<span class="weekday-tablet">' + shortName + '</span>');
                    $(this).before('<span class="weekday-mobile">' + shortestName + '</span>');
                });

            }
        },
        eventAfterAllRender: function () {
            var $alerts = $('.fc-toolbar').next('.custom-alerts');

            $('.fc-unselectable').removeClass('fc-unselectable');

            $('.fc-day-grid-event').each(function () {
                var classes = $(this).attr('class');
                var $item = $(this).find('.calendar-item').clone();
                $(this).after($item);
                $(this).next().wrap("<span class='" + classes + "'></span>");
                $(this).remove();
            });


            // if(isMobile()){
            //     $('.fc-day-grid-event a').on('click', function(e) {
            //     	e.preventDefault();
            //         window.open($(this).attr('href'));
            //     });
            // }

            $('.fc-day-grid').off('selectstart');

            // $('.tooltip a').on('click', function() {
            // 	console.log('click event on tooltip a');
            // });

            if ($alerts.length == 0) {
                $('.fc-toolbar').after([
                    '<div class="custom-alerts">',
                    '<p>Want to see one of these exciting shows? Buy a Museum Entry +2 pass now!</p>',
                    '<a href="http://www.adlerplanetarium.org/visit/ticketing-options/" class="tickets-link">Purchase Tickets</a>',
                    '</div>',
                    '<div class="strikethrough-note">Strikethrough denotes show/event is sold out.</div>',
                ].join(''));
            }

            var weekScroll = $('.fc-list-table .fc-list-heading').waypoint({
                handler: function (direction) {
                    var date = $(this.element).data('date');
                    $('.fc-center .week').find('[data-date="' + date + '"]').addClass('selected').siblings().removeClass('selected');
                },
                offset: '50%'
            });

            var weekOffset = $('.fc-center .week').offset();

            $(window).on('scroll', function () {
                if (weekOffset.top <= $(window).scrollTop()) {
                    $('.fc-center .week').addClass('floating');
                } else {
                    $('.fc-center .week').removeClass('floating');
                }
            });

            $('.fc-list-table').after('<div class="weeknav"><button type="button" class="fc-prev-button fc-button fc-state-default"><span class="fc-icon fc-icon-left-single-arrow"></span></button><button type="button" class="fc-next-button fc-button fc-state-default"><span class="fc-icon fc-icon-right-single-arrow"></span></button>');

            function eventTooltipPosition() {
                if ($("#calendar .fc-event-container").length > 0) {
                    $("#calendar .fc-event-container").each(function () {
                        var windowWidth = $(window).width();
                        var eventLeft = $(this).offset().left;
                        var eventCenter = eventLeft + ($(this).width() / 2);
                        var toolTipWidth = $(this).find(".tooltip").width() + parseFloat($(this).find(".tooltip").css("padding-left")) + parseFloat($(this).find(".tooltip").css("padding-right"));
                        var toolTipLeft = eventCenter - (toolTipWidth / 2);
                        var toolTipRight = eventCenter + (toolTipWidth / 2);
                        if (toolTipLeft < 0) {
                            var left = -1 * toolTipLeft + 10;
                            $(this).find(".tooltip").css("left", "calc(50% + " + left + "px)");
                            $(this).find(".tooltip-point").css("left", "calc(50% - " + (left - 4) + "px)");
                        } else if (toolTipRight > windowWidth) {
                            var right = (toolTipRight - windowWidth) + 10;
                            $(this).find(".tooltip").css("left", "calc(50% - " + right + "px)");
                            $(this).find(".tooltip-point").css("left", "calc(50% + " + (right - 4) + "px)");
                        }
                    })
                }
            }

            eventTooltipPosition();

            $(window).on('resize', function () {
                eventTooltipPosition();
            })
        },
        loading: function (isLoading, view) {
            if (isLoading) {
                $('.no-events').remove();
            } else {
                $('.fc-view .spinner').hide();

                $('.fc-event-container').each(function () {
                    var tooltip = $(this).find('.tooltip').clone();
                    $(this).find('.tooltip').remove();
                    $(this).append(tooltip);
                });
            }
        }
    });

    $(document).on('click', '#tooltip-content .close', function (e) {
        e.preventDefault();
        $('#tooltip-content').removeClass('show');
    });

    $(document).on('click', '.fc-event-container', function (e) {
        if (isMobile()) {
            e.preventDefault();
        }
        var tooltipContent = $(this).find('.tooltip').html();
        $('#tooltip-content').html(tooltipContent).addClass('show');
    });

    $(document).ready(function () {
        $('.fc-left .fc-button').first().addClass('active');
    });
});