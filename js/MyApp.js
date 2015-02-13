//Role('LibLoader', {
//    has : {
////      to_load     : { is : "rw", init: (function() {return []})() },
//        loaded      : { is : "rw", init: (function() {return {}})() },
//        when_done   : { is : "rw" },
//        libs        : { is : "rw", init: (function() {return []})() },//named libs here
////      caller      : { is : "rw" },
//    },
//    methods : {
//        is_loaded : function ( lib_url ) {
//            return this.loaded[ lib_url ];
//        },
//        load : function ( libs ) {
//            var _this = this;
//            if ( libs && libs.length ) {
//                //keep_loading libs
//                var current = libs.shift();
//                var lib = {
//                    name : current.name || undefined,
//                    url  : current.url  || current,
//                };

//                if ( this.is_loaded( lib.url ) ) {
//                    _this.load(libs);
//                } else {
//                    var head = document.getElementsByTagName('head').item(0);
//                    var script = document.createElement('script');
//                    script.setAttribute('type','text/javascript');
//                    script.setAttribute('src', lib.url);
//                    script.onload = function () {
//                        _this.loaded[lib.url] = 1;
//                        if ( lib.name ) {
//                            _this.libs.push( eval( lib.name ) );
//                        }
//                      //if(classname)_this.create_instance(classname);
//                        _this.load(libs);
//                    }
//                    head.appendChild(script);
//                }
//            } else {
//                console.log( _this.loaded );
//                console.log( _this.libs );
//                (this.when_done)
//                    ? this.when_done( this.libs )
//                    : undefined
//                    ;
//            }
//        },
//    },
//    after : {
//        initialize : function () {
//            if ( this.deps.length ) 
//                this.load( this.deps );
//        }
//    }
//})

Class('MyApp', {
    does : [],
    has : {
        deps : {
            is  : "rw",
          //init: (function() {
          //    jloader.load('./js/jquery.min.js', { eval : false })
          //    return [
          //        jloader.load('ClassTest2'),
          //        jloader.load('ClassTest1')
          //    ]
          //})()
        },
        lib_loader  : { is  : "rw" },
        instances   : { is  : "rw", 
        init        : (function(){ return [];})() },
    },
    methods : {
        load_libs : function () {
            var _this = this;
            this.when_done = _this.carregou_libs;
        },
        init : function () {
            var _this = this;
            for (var i=0, myclass; myclass = this.deps[i]; i++) {
              //this.instances.push( new myclass( {
              //    elem        : $( item ),
              //    app   : _this,
              //} )               var myinstance = new myclass();
                var myinstance = new myclass({
                    app : _this
                });
                ( myinstance.init )
                    ? myinstance.init()
                    : undefined
                    ;
              //myinstance.init();
            }
//          $.each( $(selectors), function(i,item) {
//              //console.log( $( item ) );
//              _this.instances.push( new lib( {
//                  elem        : $( item ),
//                  app   : _this,
//              } ) );
//          } ); 
        }
    },
    after : {
        initialize: function () {
            console.log('MyApp inicializada');
        },
//      init: function () { 
//          var _this = this;
//          console.log( _this.instances, 'instances ^^' );
//      }
    },
    before : {
        initialize : function () {
            jloader.load('./js/jquery.min.js', { eval : false })
//          jloader.load('./js/handlebars-v3.0.0.js', { eval : false })
//          console.log( Handlebars );
        }
    }
})
