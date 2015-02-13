Class('Youtube', {
    has : {
        app         : { is : "rw" },
        selectors   : {
            is : "rw", 
            init : ( function () {
                return "[data-embed^='https://www.youtube']";
            } )()  
        },
        target : {
            //referencia do elemento jquery que receberá slider
            is : "rw",
        },
    },
    methods : {
        init : function () {
            var _this = this;
            $(document).ready(function () {
                jQuery.each( jQuery( _this.selectors, 'body' ) , function( i, item ) {
                    var class_name = eval(_this.meta._name);
                    var target = $(item);
                    var instance = new class_name({
                        target  : target,
                        app     : _this.app,
                    });
                    instance.start();
                    _this.app.instances.push( instance );
                }); 
            }); 
        },
        start : function () {
            var _this = this;
            var iframe = this.youtube_iframe();
            _this.target.html( iframe );
        },
        youtube_iframe : function () {
            var video_url= this.target.data('embed');
            var video_id = video_url.replace(/(.+)v=([a-zA-Z0-9-_]+)/ig, '$2');
            var iframe = $('<iframe/>')
                .attr('height', 315)
                .attr('width', 560)
                .attr('src', 'https://www.youtube.com/embed/'+video_id)
            ;
            return iframe;
        }
    }
})
