StartTest(function(t) {
    
    t.plan(1)
    
    var async1 = t.beginAsync()
    var async2 = t.beginAsync()

    
    use('Request.flXHR', function () {
        
        //===========================================================================================================================================================================================================
        t.diag('Sanity')
        
        t.ok(Request.flXHR, 'Request.flXHR is here')
        
        t.ok(flensed.flXHR, 'Native flXHR class was loaded')

        
        //===========================================================================================================================================================================================================
        t.diag('Instantiation')
        
        var newReq = new flensed.flXHR() 

        t.ok(newReq, 'flXHR class was instantiated')
        
        
        setTimeout(function () {
            //===========================================================================================================================================================================================================
            t.diag('Same-domain XHR request')
            
            Request.flXHR.my.getText('http://catalyst-dev', true, function () {
                
                t.pass('Same-domain XHR was performed')
                
                t.endAsync(async1)
            })

            
            //===========================================================================================================================================================================================================
            t.diag('Cross-domain XHR request')
            
            Request.flXHR.my.getText('http://api.flickr.com/services/rest/', true, function () {
                
                t.pass('Cross-domain XHR was performed')
                
                t.endAsync(async2)
            })
            
            
        }, 2000)
        

        
        
    })    
    
})    