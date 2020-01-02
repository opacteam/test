var wpfc_loaded = false;
var wpfc_counts = {};
var adler_last_view = false;
jQuery(document).ready( function($){
    var fullcalendar_args = {
        timeFormat: WPFC.timeFormat,
        defaultView: WPFC.defaultView,
        weekends: WPFC.weekends,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: WPFC.header.right
        },
        month: WPFC.month,
        year: WPFC.year,
        theme: WPFC.wpfc_theme,
        firstDay: WPFC.firstDay,
        editable: false,
        eventSources: [{
            url : WPFC.ajaxurl,
            data : WPFC.data,
            ignoreTimezone: true,
            allDayDefault: false
        }],
        eventRender: function(event, element) {
            if( event.post_id > 0 && WPFC.wpfc_qtips == 1 ){
                var event_data = { action : 'wpfc_qtip_content', post_id : event.post_id, event_id:event.event_id };
                element.qtip({
                    content:{
                        text : 'Loading...',
                        ajax : {
                            url : WPFC.ajaxurl,
                            type : "POST",
                            data : event_data
                        }
                    },
                    position : {
                        my: WPFC.wpfc_qtips_my,
                        at: WPFC.wpfc_qtips_at
                    },
                    style : { classes:WPFC.wpfc_qtips_classes }
                });
            }
        },
        loading: function(bool) {
            if (bool) {
                var position = $('#wpfc-calendar').position();
                $('.wpfc-loading').css('left',position.left).css('top',position.top).css('width',$('#calendar').width()).css('height',$('#calendar').height()).show();
            }else {
                wpfc_counts = {};
                $('.wpfc-loading').hide();
            }
        },
        viewDisplay: function(view) {
            if (view.name == 'month') {
                WPFC.data['event-categories'] = '15';
            }
            else {
                delete(WPFC.data['event-categories']);
            }
            if ((view.name == 'month' && adler_last_view != 'month') || (view.name != 'month' && adler_last_view == 'month')) {
                $('#wpfc-calendar').fullCalendar('removeEventSource', WPFC.ajaxurl).fullCalendar('addEventSource', {url : WPFC.ajaxurl, allDayDefault:false, ignoreTimezone: true, data : WPFC.data});
            }
            adler_last_view = view.name;
        }
    };
    if( WPFC.wpfc_locale ){
        $.extend(fullcalendar_args, WPFC.wpfc_locale);
    }
    $(document).trigger('wpfc_fullcalendar_args', [fullcalendar_args]);
    $('#wpfc-calendar').fullCalendar(fullcalendar_args);
});