Class('Request.flXHR', {
    
    BEGIN : function (ready, resource) {
        var flXHRUrl = resource.url.replace(/Request\/flXHR\.js.*/, 'Request/flXHR/static/flXHR.js')
        
        if (!flXHRUrl.match(/^http/i) && !flXHRUrl.match(/^\//)) {
            
            flXHRUrl = window.location.href.replace(/\?.*$/, '').replace(/\/[^/]*$/, '/') + flXHRUrl
        }
        
        use('jsurl://' + flXHRUrl, ready)
    },
    
    
    have : {
        req                 : null,
        
        noCacheHeader       : false
    },
    
    
    methods: {
        
        initialize: function () {
            this.req = new flensed.flXHR({
                noCacheHeader : this.noCacheHeader
            })
        },
        
        

        getText: function (urlOrOptions, async, callback, scope) {
            var req = this.req
            
            var headers, url, data
            var method = 'GET'
            
            if (typeof urlOrOptions != 'string') {
                method = 'GET' || urlOrOptions.method
                data = urlOrOptions.data || null
                headers = urlOrOptions.headers
                url = urlOrOptions.url
                async = async || urlOrOptions.async
                callback = callback || urlOrOptions.callback
                scope = scope || urlOrOptions.scope
            } else url = urlOrOptions
            
            req.open(method, url, async || false)
            
            if (headers) Joose.O.eachSafe(headers, function (value, name) {
                req.setRequestHeader(name, value)
            })
            
            try {
                req.onerror = function (xhr) {
                    throw xhr.message
                }
                
                req.onreadystatechange = function (event) {  
                    if (async && req.readyState == 4) {  
                        if (req.status == 200 || req.status == 0) 
                            callback.call(scope || this, true, req.responseText)
                        else 
                            callback.call(scope || this, false, "File not found: " + url)
                    }  
                };  
                req.send(data)
            } catch (e) {
                throw "File not found: " + url
            }
            
            if (!async)
                if (req.status == 200 || req.status == 0) return req.responseText; else throw "File not found: " + url
            
            return null
        }
        
    }
    
})
