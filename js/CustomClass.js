window.CustomClass = window.CustomClass || (function ( args ) {
    var _this = this;
    _this.app = undefined;
    _this.version = 0.01;
    _this.target = undefined;
    _this.selectors = ".custom-class";
    _this.counter = 0;
    _this.instance_num = 0;
    _this.custom_dependency = undefined;

    _this.init = function () {
        $(document).ready(function () {
            jQuery.each( jQuery( _this.selectors, 'body' ) , function( i, item ) {
                jloader.load('CustomDependency');
                var target = $(item);
                var instance = new CustomClass({
                    target          : target,
                    app             : _this.app,
                    instance_num    : _this.instance_num++,
                    custom_dependency : new CustomDependency(),
                });
                instance.start();
                _this.app.instances.push( instance );
            }); 
        });
    }
    _this.say_class_name = function () {
        return "This class is called: CustomClass and its not a Joose Class";
    }
    _this.start = function () {
        setInterval( function () { 
            _this.target.html( _this.say_class_name() + " - " + (_this.counter++) + ' - instance num: ' + _this.instance_num + " - " + _this.custom_dependency.msg_from_custom_dep() );
        }, 350 )
    }
    _this.build_args = function () {
        if ( args ) {
            for ( var key in args ) {
                if ( _this.hasOwnProperty( key ) ) {
                    _this[key] = args[key];
                }
            }
        }
    }
    _this.build_args();
});
