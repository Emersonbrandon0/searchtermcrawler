var Crawler = require("crawler");
var hyperlink;

var foundArray=[];

var c = new Crawler({
    maxConnections : 100,
    //No wait between requests
    rateLimit: 0,
    
    callback : function (error, result, done) {
        if(error){
            console.log(error);
        } else{
            var $ = result.$;
            var page=result.body;

            //The search term that we are looking for
            var searchTerm='crawler';

            //Creates regular expression to search for matches to the search term on the page
            var re = new RegExp(searchTerm, 'i');
            var res=page.match(re);

            //Only runs if that page contains the search term
            if (res && res.length >0){
                //Makes sure that the page is not recorded if it has already been found
                if(foundArray.indexOf(result.options.uri)!=-1){
                    console.log('Already found!');
                };

                if(foundArray.indexOf(result.options.uri)==-1){
                    //Logs info to the console about the page that the searchTerm was found
                    console.log("Your search term:"+"'"+searchTerm+"'"+" was found at the following location:");
                    console.log("   "+$('title').text());
                    console.log("   Page Location: "+result.options.uri);
                    foundArray.push(result.options.uri);
                    console.log(foundArray);
                }
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

        done();
    }
});


//The starting URL

c.queue(['https://github.com/bda-research/node-crawler']);