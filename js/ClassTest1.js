Class("ClassTest1", {
    has : {
        app     : { is : "rw" },
        elem    : { is : "rw" },
        version : (function() {
            return 0.01;
        })(),
        deps : (function() {
            //ClassTest1.prototype.meta.attributes.deps._props
            return [
                {
                    name : 'ClassTest1Dep1',
                    path : './js/ClassTest1Dep1.js'
                }
            ]
        })(),
    },
    methods: {
        test: function() {
            var x = new ClassTest1Dep1();
            alert(x.version);
        }
    },
    before : {
//      init: function () {
//          //load functions before init
//          head.load( this.deps );
//      }
    }
})
