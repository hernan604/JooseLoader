Class("Slider", {
    has : {
        auto_start : {
            is : "rw",
            init: (function() {
                return false;
            })()
        },
        app         : { is : "rw" },
        images      : {
            is : "rw", 
            init : ( function() {
                return [
                ]
            })() 
        },
        selectors   : {
            is : "rw", 
            init : ( function () {
                return ".slider-v1";
            } )()  
        },
        target : {
            //referencia do elemento jquery que receberá slider
            is : "rw",
        },
        current_image : {
            is : "rw",
            init: ( function () { return 0 } )()
        },
        interval : {
            is : "rw",
            init : (function () { return 500; })()
        },
        status : {
            is : "rw",
            init: ( function () { return 'stopped' } )(),
        }
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
                        images  : target.data('images'),
                        auto_start : ( 
                            ( target.attr( 'data-auto_start' ) ) 
                                ? target.data( 'auto_start' ) 
                                : false 
                        ),
                    });
                    instance.start();
                    _this.app.instances.push( instance );
                }); 
            }); 
        },
        next_image : function () {
            this.current_image = 
                ( this.current_image >= this.images.length )
                    ? 0
                    : (this.current_image)
                    ;
            return this.images[ this.current_image++ ];
        },
        start : function () {
            var _this = this;
            _this.next();
            if ( _this.auto_start )  {
                this.setStatus('running');
            }
            this.start_interval();            
            this.enable_click();
        },
        start_interval : function () { 
            var _this = this;
            setInterval(function() {
                if ( _this.status == 'stopped' ) return;
                _this.next();
            }, _this.interval );
        },
        next : function () {
            var _this = this;
            var image = $('<img/>')
                .attr('src', this.next_image() )
                ;
            _this.target.html( image );
        },
        stop : function () {
            this.setStatus('stopped');
        },
        enable_click: function () {
            var _this = this;
            this.target.click( function ( ev ) {
                if ( _this.status == 'stopped' ) {
                    //stop others of this type of clas and start this one
                    for ( var i=0, instance; instance = _this.app.instances[i]; i++ ) {
                        if ( instance && instance.meta && instance.meta._name == 'Slider' ) {
                            instance.stop();
                        }
                    }
                    _this.setStatus('running');
                } else {
                    //stop this one.
                    _this.setStatus('stopped');
                }
            }
        )},
    },
    before : {
        setStatus: function () { 
            this.target.removeClass( this.status );
        }
    },
    after : {
        setStatus : function () {
            this.target.addClass( this.status );
        }
    }
})
