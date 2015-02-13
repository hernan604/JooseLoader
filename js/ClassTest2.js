Class("ClassTest2", {
    does : [ jloader.load('SomeRole') ],
    has : {
        app   : { is : "rw" },
        elem        : { is : "rw" },
        version     : { is : "rw", init : (function() { return 0.02 })() },
        selectors   : {
            is : "rw",
            init : (function () { return '.class-test2,.class-test2-other-selector' })()
        },
        deps : {
            is      : "rw",
            init    : (function() {
                return [
//                  './js/jquery.min.js',
                    jloader.load('ClassTest1Dep1')
                ]
            } )()
        },
    },
    methods: {
        init: function () {
            var _this = this;
            $(document).ready(function () {
                jQuery.each( jQuery( _this.selectors, 'body' ) , function(i,item) {
                    var class_name = eval(_this.meta._name);
                    var instance = new class_name({
                        elem        : $(item),
                        app   : _this.app,
                    });
                    instance.start();
                    _this.app.instances.push( instance );
                }); 
            }); 

        },
        start: function ( args ) {
            var class_test1_dep = new ClassTest1Dep1();
            this.elem.html( "(ClassTest2 + ClassTest1Dep1) - time now :" + new Date().getTime() + new Date().getTime() + ' with ' + class_test1_dep.class_test1_dep() + this.print_some_role() );
        },
        stop : function () {
        }
    },
    before : {
//      init: function () {
//          //load deps
//      }
    },
    after : {
        initialize: function () {
          //this.when_done = this.start;
          //this.init();
        }
    }
})
