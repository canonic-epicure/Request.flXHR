Class('Request.flXHR', {
    
    BEGIN : function (ready, resource) {
        var flXHRurl = resource.url.replace(/\/Request\/flXHR\.js.*/, '/Request/flXHR/static/flXHR.js')
        
        use('jsurl://http://catalyst-dev/JavaScript/Request.flXHR/blib/lib/Request/flXHR/static/flXHR.js', ready)
    },
    
    
    my : {
        
        methods : {
            
            getText: function (urlOrOptions, async, callback, scope) {
                var req = new flensed.flXHR({
                    noCacheHeader : false
                })
                
                var headers
                var url
                
                if (typeof urlOrOptions != 'string') {
                    headers = urlOrOptions.headers
                    url = urlOrOptions.url
                    async = async || urlOrOptions.async
                    callback = callback || urlOrOptions.callback
                    scope = scope || urlOrOptions.scope
                } else url = urlOrOptions
                
                req.open('GET', url, async || false)
                
                
                if (headers) Joose.O.eachSafe(headers, function (value, name) {
                    req.setRequestHeader(name, value)
                })
                
                try {
                    req.onerror = function (xhr) { alert(xhr.number) }
                    
                    req.onreadystatechange = function (event) {
                        
                        if (async && req.readyState == 4) {  
                            if (req.status == 200 || req.status == 0) callback.call(scope || this, true, req.responseText)
                            else callback.call(scope || this, false, "File not found: " + url)
                        }  
                    };  
                    req.send(null)
                } catch (e) {
                    throw "File not found: " + url
                }
                
                if (!async)
                    if (req.status == 200 || req.status == 0) return req.responseText; else throw "File not found: " + url
                
                return null
            }
            
            
        }
        
    }
    
})