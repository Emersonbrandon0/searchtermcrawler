var Crawler = require("crawler");
var hyperlink;

var c = new Crawler({
    maxConnections : 1,
    rateLimit: 0,
    // This will be called for each crawled page
    callback : function (error, result, done) {
        if(error){
            console.log(error);
        } else{
            var $ = result.$;
            var page=result.body;
            var searchTerm='crawler'

            var re = new RegExp(searchTerm, 'i');
            var res=page.match(re);


            //var res=page.match(/searchTerm/i);
            if (res && res.length >0){
                console.log("Your search term:"+"'"+searchTerm+"'"+" was found at the following locations");
                console.log("   "+$('title').text());
                console.log("   Page Location: "+result.options.uri);
            }
        }

        $('a').each(function(index,a){
            if(a['attribs']['href']){

                hyperlink=a['attribs']['href']
                var pat = /^https?:\/\//i;

                if(pat.test(hyperlink)){
                    c.queue([hyperlink]);
                }
            }
        });

        done(function(){
            console.log('Finished');
        });
    }
});



c.queue(['https://github.com/bda-research/node-crawler']);

