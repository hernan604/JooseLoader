Class("ClassTest1Dep1", {
    has : {
        version : { 
            is : "rw",
            init: (function() { 
                return "ClassTest1Dep1 0.01";
            })(),
        }
    },
    methods: {
        class_test1_dep : function () {
            console.log('--->' + this.version);
            return this.version;
        }
    }
})
