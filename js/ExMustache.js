Class('ExMustache', {
    has : {
        app         : { is : "rw" },
        selectors   : {
            is : "rw", 
            init : ( function () {
                return ".mustache";
            } )()  
        },
        target : {
            //referencia do elemento jquery que receberá slider
            is : "rw",
        },
        template : {
            is : "rw",
            init : (function () { 
                return "<div>My name is <span class='name'>{{name}}</span>, i have <span class='age'>{{age}}</span> years.</div>";
            } )()
        },
    },
    methods : {
        init : function () {
            jloader.load('./js/mustache.js', { eval : false })
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
            var tpl = _this.template;
            var rendered = $( Mustache.render( tpl, {
                name  : _this.target.data('name'),
                age   : _this.target.data('age')
            } ) );
            _this.bind_events( rendered );
            _this.target.html( rendered );
        },

        bind_events : function ( markup ) { 
            markup.find( '.name' ).click( function ( ev ) { 
                alert( 'Clicked name:' + $( ev.currentTarget ).html() );
            } );
        }
    }
})
