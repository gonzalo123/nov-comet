/**
 * Lazy Comet. JS client (publisher and subscriber)
 *
 * THIS PROGRAM COMES WITH ABSOLUTELY NO WARANTIES !
 * USE IT AT YOUR OWN RISKS !
 *
 * @author Gonzalo Ayuso <gonzalo123@gmail.com>
 * @copyright under GPL 2 licence
 */

NovComet = {
    sleepTime: 1000,
    _subscribed: {},
    _timeout: undefined,
    _baseurl: "comet.php",
    _args: '',
    _urlParam: 'subscribed',
    
    subscribe: function(id, callback) {
        NovComet._subscribed[id] = {
            cbk: callback,
            timestamp: NovComet._getCurrentTimestamp()
        };
        return NovComet;
    },

    _refresh: function() {
        NovComet._timeout = setTimeout(function() {
            NovComet.run()
        }, NovComet.sleepTime);
    },

    init: function(baseurl) {
        if (baseurl!=undefined) {
            NovComet._baseurl = baseurl;
        }
    },

    _getCurrentTimestamp: function() {
        return Math.round(new Date().getTime() / 1000);
    }, 
    
    run: function() {
        var cometCheckUrl = NovComet._baseurl + '?' + NovComet._args;
        for (var id in NovComet._subscribed) {
            var currentTimestamp = NovComet._subscribed[id]['timestamp'];
            
            cometCheckUrl += '&' + NovComet._urlParam+ '[' + id + ']=' + 
               currentTimestamp;
        }
        cometCheckUrl += '&' + NovComet._getCurrentTimestamp();
        $.getJSON(cometCheckUrl, function(data){
            switch(data.s) {
                case 0: // sin cambios
                    NovComet._refresh();
                    break;
                case 1: // trigger
                    for (var id in data['k']) {
                        NovComet._subscribed[id]['timestamp'] = data['k'][id];
                        NovComet._subscribed[id].cbk(data.k);
                    }
                    NovComet._refresh();
                    break;
            }
        });

    },
    
    publish: function(id) {
        var cometPublishUrl = NovComet._baseurl + '?' + NovComet._args;
        cometPublishUrl += '&publish=' + id;
        $.getJSON(cometPublishUrl);
    }
};
