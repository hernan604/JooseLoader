Class("Clock", {
    has : {
        app         : { is : "rw" },
        selectors   : {
            is : "rw", 
            init : ( function () {
                return ".clock-v1";
            } )()  
        },
        target : {
            //referencia do elemento jquery que receberá clock
            is : "rw",
        },
        interval : {
            is : "rw",
            init : (function () { return 1000; })()
        }
    },
    methods : {
        init : function () {
            var _this = this;
            $(document).ready(function () {
                jQuery.each( jQuery( _this.selectors ) , function( i, item ) {
                    var class_name = eval(_this.meta._name);
                    var target = jQuery(item);
                    var instance = new class_name({
                        target  : target,
                        app     : _this.app,
                    });
                    instance.start();
                  //_this.app.instances.push( instance );
                }); 
            }); 
        },
        start : function () {
            var _this = this;
            _this.show_time();
            setInterval(function() {
                _this.show_time();
            }, _this.interval );
        },
        show_time : function () {
            var _this = this;
            _this.target.html( new Date() );
        }
    }
})
