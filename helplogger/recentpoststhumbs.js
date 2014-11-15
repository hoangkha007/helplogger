function showlatestpostswiththumbs(json) {
    document.write('<ul class="recent-posts-container">');
    for (var i = 0; i < numposts; i++) {
        var entry = json.feed.entry[i];
        var posttitle = entry.title.$t;
        var posturl;
        if (i == json.feed.entry.length) break;
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
                var commenttext = entry.link[k].title;
                var commenturl = entry.link[k].href;
            }
            if (entry.link[k].rel == 'alternate') {
                posturl = entry.link[k].href;
                break;
            }
        }
        var recenthumb;
        try {
            recenthumb = entry.media$thumbnail.url;
        } catch (error) {
            s = entry.content.$t;
            a = s.indexOf("<img");
            b = s.indexOf("src=\"", a);
            c = s.indexOf("\"", b + 5);
            d = s.substr(b + 5, c - b - 5);
            if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
                recenthumb = d;
            } else recenthumb = 'http://2.bp.blogspot.com/-C3Mo0iKKiSw/VGdK808U7rI/AAAAAAAAAmI/W7Ae_dsEVAE/s1600/no-thumb.png';
        }
        var postdate = entry.published.$t;
        var showyear = postdate.substring(0, 4);
        var showmonth = postdate.substring(5, 7);
        var showday = postdate.substring(8, 10);
        var monthnames = new Array();
        monthnames[1] = "Jan";
        monthnames[2] = "Feb";
        monthnames[3] = "Mar";
        monthnames[4] = "Apr";
        monthnames[5] = "May";
        monthnames[6] = "Jun";
        monthnames[7] = "Jul";
        monthnames[8] = "Aug";
        monthnames[9] = "Sep";
        monthnames[10] = "Oct";
        monthnames[11] = "Nov";
        monthnames[12] = "Dec";
        document.write('<li class="recent-posts-list">');
        if (showpoststhumbs == true)
            document.write('<img class="recent-post-thumb" src="' + recenthumb + '"/>');
        document.write('<b><a href="' + posturl + '" target ="_top">' + posttitle + '</a></b><br>');
        if ("content" in entry) {
            var postcontent = entry.content.$t;
        } else
        if ("summary" in entry) {
            var postcontent = entry.summary.$t;
        } else var postcontent = "";
        var re = /<\S[^>]*>/g;
        postcontent = postcontent.replace(re, "");
        if (post_summary == true) {
            if (postcontent.length < summary_chars) {
                document.write(postcontent);
            } else {
                postcontent = postcontent.substring(0, summary_chars);
                var quoteEnd = postcontent.lastIndexOf(" ");
                postcontent = postcontent.substring(0, quoteEnd);
                document.write(postcontent + '...');
            }
        }
        var towrite = '';
        var flag = 0;
        document.write('<br>');
        if (showpostdate == true) {
            towrite = towrite + monthnames[parseInt(showmonth, 10)] + '-' + showday + ' - ' + showyear;
            flag = 1;
        }
        if (showcommentnum == true) {
            if (flag == 1) {
                towrite = towrite + ' | ';
            }
            if (commenttext == '1 Comments') commenttext = '1 Comment';
            if (commenttext == '0 Comments') commenttext = 'No Comments';
            commenttext = '<a href="' + commenturl + '" target ="_top">' + commenttext + '</a>';
            towrite = towrite + commenttext;
            flag = 1;;
        }
        if (displaymore == true) {
            if (flag == 1) towrite = towrite + ' | ';
            towrite = towrite + '<a href="' + posturl + '" class="url" target ="_top">read more</a>';
            flag = 1;;
        }
        document.write(towrite);
        document.write('</li>');
    }
    document.write('</ul>');
}