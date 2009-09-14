StartTest(function(t) {
    t.plan(8)
    
    //==================================================================================================================================================================================
    t.diag("Sanity")    
    
    t.ok(JooseX.Attribute.Trigger, "JooseX.Attribute.Trigger is here")
    t.ok(JooseX.Attribute.Lazy, "JooseX.Attribute.Lazy is here")
    
    Joose.Managed.Attribute.meta.extend({
        does : [ JooseX.Attribute.Trigger, JooseX.Attribute.Lazy ]
    })    
    
    //==================================================================================================================================================================================
    t.diag("Trigger testing")
    
    Class('TestClass', {
        has : {
            res : {
                is : 'rw',
                init : 'advanced'
            }
        }
    })    
    
    
    TestClass.meta.extend({ 
        has : {
            trigger : {
                init : 'foo',
                
                trigger : function (value) {
                    this.setRes('triggered'); 
                } 
            }
        }
    })    
    
    var testClass3 = new TestClass({
        required : null,
        trigger : 'bar'
    })    
    
    t.ok(testClass3.trigger == 'bar', "Value of 'trigger' attribute is correct")    
    t.ok(testClass3.res == 'triggered', ".. and the trigger function was executed")    
    

    //==================================================================================================================================================================================
    t.diag("Lazy testing")    
    
    TestClass.meta.extend({ 
        has : {
            lazy1 : {
                lazy : function () { return 'lazy1-value' } 
            },
            
            lazy2 : {
                init : function () { return 'lazy2-value' },
                lazy : true
            }
        }
    })    
    
    var testClass4 = new TestClass({
        required : null
    })    
    
    var testClass5 = new TestClass({
        required : null
    })
    
//    t.ok(testClass4.lazy1 == undefined, "Value of 'lazy1' attribute is not initialized yet")    
    t.ok(typeof testClass4.lazy1 == 'function', "Value of 'lazy1' attribute is not initialized yet")
    t.ok(testClass4.getLazy1() == 'lazy1-value' && testClass4.lazy1 == 'lazy1-value', "Value of 'lazy1' was setuped during 1st getter call")
    
//    t.ok(testClass5.lazy1 == undefined, "Value of 'lazy1' attribute is not initialized yet")
    t.ok(typeof testClass5.lazy1 == 'function', "Value of 'lazy1' attribute is not initialized yet")
    t.ok(testClass5.getLazy1() == 'lazy1-value' && testClass5.lazy1 == 'lazy1-value', "Lazy state is not shared among class instances")
    
//    t.ok(testClass4.lazy2 == undefined, "Value of 'lazy2' attribute is not initialized yet")
    t.ok(typeof testClass4.lazy2 == 'function', "Value of 'lazy2' attribute is not initialized yet")
    t.ok(testClass4.getLazy2() == 'lazy2-value' && testClass4.lazy2 == 'lazy2-value', "Value of 'lazy2' was setuped during 1st getter call")    
    
})    